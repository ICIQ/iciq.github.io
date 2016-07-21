---
layout: post
title: Blogging with notebooks and Jekyll
subtitle: easy-peasy
categories: notebook
tags:
  - Jupyter
  - knitr
  - Jekyll
---
First off, if you know [KnitR](https://github.com/yihui/knitr-jekyll), you can write code in R markdown directly and then compile in R/RStudio to generate the blog post easily.
My blog repo has the knitr plugin installed and you can use `Python`, `Mathlab` and even `Julia` engines to compile code lines.
More information can be found in [Yihui Xie's site](http://yihui.name/knitr/).

Below, I will mention some methods that I use to blog with Jupyter notebooks with `Julia`, `Python` and `R` based on the built in functionality of this [Jekyll repo](https://github.com/i2000s/i2000s.github.io) firstly introduced by Yihui Xie and [Carl Boettiger](http://www.carlboettiger.info/).

In short, you can write ideas in Jupyter (iPython) notebooks and then output in Jykell markdown blog posts in various ways while keep tracking the edit history using version control.

The most easiest way is to post your Jupyter notebook on GitGist, which has a preview function to Jupyter notebooks and can record your version history easily.
I have a `notebooks.html` template in my [repo](https://github.com/i2000s/i2000s.github.io) which automatically retrieves links to all your notebook gist repos and shows them on one page. This has been developed and used by [David Ketcheson](http://www.davidketcheson.info/) and others.

The second method is to put your Jupyter notebooks in the blog repo and then export the markdown version for posting online.
A lot of scripts have been written to make this converting process easy to commit.
Here are two examples.

One is introduced in [Christop Corley's blog](http://cscorley.github.io/2014/02/21/blogging-with-ipython-and-jekyll/)
to export markdown to your draft folder. I have the customized code in my [repo](https://github.com/i2000s/i2000s.github.io) in the `notebooks` directory.

The other one was introduced by [David Ketcheson](http://www.davidketcheson.info/2012/10/11/blogging_ipython_notebooks_with_jekyll.html).
I will just repost his original blog below for a quick preview. Please comment on his blog if you have question regarding this code.
In the mean time, I have customized the `nbconv.sh` code in my [repo](https://github.com/i2000s/i2000s.github.io) to work better with importing images within the notebook folder.

***David***: I've been playing around with [iPython notebooks](http://ipython.org/ipython-doc/dev/interactive/htmlnotebook.html)
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
