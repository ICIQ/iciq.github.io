---
layout: post
title: Blogging an iPython notebook with Jekyll
subtitle: easy-peasy
categories: blog-post notebook
---

> **Update as of December 2014: Don't bother using what's below; go to 
[Christop Corley's blog](http://cscorley.github.io/2014/02/21/blogging-with-ipython-and-jekyll/)
for a much better setup!**

I've been playing around with [iPython notebooks](http://ipython.org/ipython-doc/dev/interactive/htmlnotebook.html)
for a while and planning to use them instead of [SAGE](http://www.sagemath.org/) 
worksheets for my numerical analysis course next spring.  As a warmup,
I wrote an iPython notebook explaining a bit about internal stability of Runge-Kutta 
methods and showing some new research results using [NodePy](http://numerics.kaust.edu.sa/nodepy/).

I also wanted to post the notebook on my blog here; the ability to more easily
include math and code in blog posts was one of my main motivations for moving
away from Blogger to my own site.  I first tried following [the instructions given
by Fernando Perez](http://blog.fperez.org/2012/09/blogging-with-ipython-notebook.html).
That was quite painless and worked flawlessly, using `nbconvert.py` to convert the
.ipynb file directly to HTML, with graphics embedded.  The only issue was that I didn't love
the look of the output quite as much as I love how Carl Boettiger's Markdown + Jekyll
posts with code and math look (see an example [here](http://www.carlboettiger.info/2012/09/14/analytic-solution-to-multiple-uncertainty.html)).  Besides, Markdown is so much nicer
than HTML, and `nbconvert.py` has a Markdown output option.

So I tried the markdown option:

    nbconvert.py my_nb.ipynb -f markdown

I copied the result to my `_posts/` directory, added the [YAML front-matter](https://github.com/mojombo/jekyll/wiki/YAML-Front-Matter) that
Jekyll expects, and took a look.  Everything
was great except that all my plots were gone, of course.  After considering a
few options, I decided for now to put plots for such posts in a subfolder 
`jekyll_images/` of my public Dropbox folder.  Then it was a simple matter
of search/replace all the paths to the images.  At that point, it looked
great; you can see the [source](https://github.com/ketch/nodepy/blob/master/examples/Internal_stability.ipynb)
and the [result](http://davidketcheson.info/2012/10/11/Internal_stability.html).

The only issue was that I didn't want to manually do all that work every time.
I considered creating a new Converter class in `nbconvert` to handle it,
but finally decided that it would be more convenient to just write a shell
script that calls `nbconvert` and then operates on the result.  
Here  it is:

    #!/bin/bash

    fname=$1

    nbconvert.py ${fname}.ipynb -f markdown
    sed  -i '' "s#${fname}_files#https:\/\/dl.dropbox.com\/u\/656693\/jekyll_images\/${fname}_files#g"  ${fname}.md

    dt=$(date "+%Y-%m-%d")

    echo "0a
    ---
    layout:    post
    time:      ${dt}
    title:     TITLE-ME
    subtitle:  SUBTITLE-ME
    tags:      TAG-ME
    ---
    .
    w" | ed ${fname}.md

    mv ${fname}.md ~/labnotebook/_posts/${dt}-${fname}.md

It's also on Github [here](https://github.com/ketch/labnotebook/blob/master/nbconv.sh).
This was a nice educational exercise in constructing shell scripts, in which I learned or re-learned:

 - how to use command-line arguments
 - how to use sed and ed
 - how to use data

You can expect a lot more iPython-notebook based posts in the future.
