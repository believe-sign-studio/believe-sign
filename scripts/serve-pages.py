from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import sys
class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(Path('out').resolve()), **kwargs)
    def translate_path(self, path):
        if path == '/believe-sign': path = '/'
        elif path.startswith('/believe-sign/'): path = path[len('/believe-sign'):]
        else: path = '/__outside_base_path__'
        return super().translate_path(path)
ThreadingHTTPServer(('127.0.0.1', int(sys.argv[1]) if len(sys.argv)>1 else 4173), Handler).serve_forever()
