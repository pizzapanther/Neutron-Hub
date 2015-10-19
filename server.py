#!/usr/bin/env python3

import os
import sys
import subprocess

import tornado.ioloop
import tornado.web
import tornado.autoreload
import tornado.options
from tornado.log import enable_pretty_logging

PATH = os.path.abspath(os.path.dirname(__file__))

DOMAINS = {
  'www.neutronracer.com': 'Neutron-Racer',
  'manx.neutrondrive.com': 'Neutron-Racer',
}

REDIRECTS = {
  'springfieldcollege1968.com': 'http://www.springfieldcollege1968.com/ocapp/cms/',
  
  'neutrondrive.com': 'https://www.neutrondrive.com/{}',
  'neutronide.com': 'https://www.neutrondrive.com/{}',
  'neutrondev.com': 'https://www.neutrondrive.com/{}',
  
  'godlovedtheworld.com': 'http://www.godlovedtheworld.com/{}',
  
  'sailblancaluna.com': 'http://www.sailblancaluna.com/{}',
}

class HubHandler (tornado.web.StaticFileHandler):
  def parse_url_path (self, url_path):
    url_path = os.path.join(DOMAINS[self.domain], url_path)
    if url_path.endswith('/'):
      url_path += 'index.html'
      
    return url_path
    
  def get (self, path, include_body=True):
    for domain, value in DOMAINS.items():
      if domain.lower() in self.request.host:
        self.domain = domain.lower()
        return super(HubHandler, self).get(path, include_body)
        
    for domain, redirect in REDIRECTS.items():
      if domain.lower() in self.request.host:
        if '{}' in redirect:
          url = redirect.format(path)
          
        else:
          url = redirect
          
        self.redirect(url)
        return None
        
    raise tornado.web.HTTPError(404, "Page Not Found")
    
application = tornado.web.Application([
  (r"/(.*)", HubHandler, {'path': PATH}),
])

if __name__ == "__main__":
  if '-dev' in sys.argv:
    enable_pretty_logging()
    tornado.autoreload.start()
    
  else:
    tornado.options.parse_command_line()
    
  port = int(os.environ.get('PORT', '8000'))
  application.listen(port, address="127.0.0.1")
  tornado.ioloop.IOLoop.instance().start()
  