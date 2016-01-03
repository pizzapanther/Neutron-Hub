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
  'manx.neutrondrive.com': 'NeutronBlog',
  'neutron-racer.herokuapp.com': 'Neutron-Racer',
  'blog.neutrondrive.com': 'NeutronBlog',
  'www.godlovedtheworld.com': 'glw-site',
}

REDIRECTS = {
  'springfieldcollege1968.com': 'http://www.springfieldcollege1968.com/ocapp/cms/',
  
  'neutrondrive.com': 'https://www.neutrondrive.com/{}',
  'neutronide.com': 'https://www.neutrondrive.com/{}',
  'neutrondev.com': 'https://www.neutrondrive.com/{}',
  
  'neutronracer.com': 'https://neutron-racer.herokuapp.com/{}',
  
  'godlovedtheworld.com': 'http://www.godlovedtheworld.com/{}',
  
  'sailblancaluna.com': 'http://www.sailblancaluna.com/{}',
}

class HubHandler (tornado.web.StaticFileHandler):
  def validate_absolute_path (self, root, absolute_path):
    try:
      return super().validate_absolute_path(root, absolute_path)
      
    except tornado.web.HTTPError as error:
      if error.status_code == 404:
        return os.path.join(PATH, DOMAINS[self.domain], 'index.html')
        
      raise
      
  def parse_url_path (self, url_path):
    url_path = os.path.join(DOMAINS[self.domain], url_path)
    if url_path.endswith('/') or not url_path:
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
  kwargs = {}
  
  if '-dev' in sys.argv:
    enable_pretty_logging()
    tornado.autoreload.start()
    kwargs['address'] = "127.0.0.1"
    DOMAINS['manx.neutrondrive.com'] = sys.argv[-1]
    
  else:
    tornado.options.parse_command_line()
    
  port = int(os.environ.get('PORT', '8000'))
  application.listen(port, **kwargs)
  tornado.ioloop.IOLoop.instance().start()
  