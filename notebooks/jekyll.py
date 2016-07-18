# This is used to generate Jekyll blog posts from Jupyter notebooks for Julia codes. 
# Following the instruction at http://christop.club/2014/02/21/blogging-with-ipython-and-jekyll/
# modification of config created here: https://gist.github.com/tgarc/7d6901858ef708030c19
# Usage example: jupyter nbconvert --to markdown <notebook>.ipynb --config jekyll.py
try:
    from urllib.parse import quote  # Py 3
except ImportError:
    from urllib2 import quote  # Py 2
import os
import sys

f = None
for arg in sys.argv:
    if arg.endswith('.ipynb'):
        f = arg.split('.ipynb')[0]
        break


c = get_config()
c.NbConvertApp.export_format = 'markdown'
c.MarkdownExporter.template_path = ['.'] # point this to your jekyll template file
c.MarkdownExporter.template_file = 'jekyll'
#c.Application.verbose_crash=True

# modify this function to point your images to a custom path
# by default this saves all images to a directory 'images' in the root of the blog directory
def path2support(path):
    """Turn a file path into a URL"""
    parts = path.split(os.path.sep)
    return '{{ site.url}}/notebooks/' + '/'.join(quote(part) for part in parts)    
#return '../assets/img/notebook_images/' + os.path.basename(path)

c.MarkdownExporter.filters = {'path2support': path2support}

if f:
    c.NbConvertApp.output_base = f.lower().replace(' ', '-')
    c.FilesWriter.build_directory = '../_drafts/' # point this to your build directory
