#!/usr/bin/env python3

import os
import subprocess

import tornado.ioloop
import tornado.web
import tornado.autoreload
from tornado.log import enable_pretty_logging

PATH = os.path.abspath(os.path.dirname(__file__))

DOMAINS = {
  'www.neutronracer.com': '',
  'manx.neutrondrive.com': '',
}

class HubHandler (tornado.web.StaticFileHandler):
  def get (self, path, include_body=True):
    for domain, value in DOMAINS.items():
      if domain.lower() in self.request.host:
        return super(HubHandler, self).get(path, include_body)
        
    url = 'https://{}'.format(self.request.host)
    if path:
      url += '/' + path
      
    self.redirect(url)
    
application = tornado.web.Application([
  (r"/(.*)", HubHandler, {'path': PATH}),
])

if __name__ == "__main__":
  enable_pretty_logging()
  tornado.autoreload.start()
  
  application.listen(8000, address="127.0.0.1")
  tornado.ioloop.IOLoop.instance().start()
  