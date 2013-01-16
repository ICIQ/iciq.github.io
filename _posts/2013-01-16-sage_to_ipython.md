---
layout: post
title: Convert SAGE worksheets to IPython notebooks
name: Convert SAGE worksheets to IPython notebooks
subtitle: A quick and simple solution
tags: python ipython
categories: blog-post
---

# Converting a SAGE worksheet to an IPython notebook

Download link: [http://github.com/ketch/sage2ipython/]()

I use Python to teach numerical methods here at KAUST, and I'm in the process of
switching from using [SAGE](http://www.sagemath.org) worksheets to [IPython](http://ipython.org)
notebooks (more on the reasons in a later post).  I've invested a lot of time over the 
past three years in developing a set of SAGE worksheets and it would be a substantial 
amount of tedious work to manually copy-paste their contents into IPython notebooks.
So I decided to write an automated converter.  

Each SAGE worksheet is usually stored in a .sws file that is a bzipped tarball;
underneath, there is a text version (called worksheet.html).  If you run
SAGE on your own machine, the text versions of your worksheets can usually be found
in `~/.sage/sage_notebook.sagenb/home/username/number/`.

It's a simple matter to convert the SAGE format (that uses triple braces to delimit
code cells) into the IPython format (that I believe is JSON).  
Rather than write an actual parser, which seemed like overkill, I just created
a script that steps through the file line-by-line and keeps track of whether it's in 
a cell.  Debugging it was slightly
painful because if you have the tiniest syntax error, then the IPython notebook server just 
tells you something is wrong and displays nothing.

You can download the converter from the [Github repository](http://github.com/ketch/sage2ipython/).
It has been tested with SAGE version 4.2.1 and IPython version 0.13.1.  Note that it
has several limitations (see the list below).  But it has served my needs well.

Usage:

    >>> import sage2ipython
    >>> sage2ipython.sage2ipy('/path/to/sage/worksheet/html/file','output_file_name.ipynb')

To convert all your SAGE worksheets, do:

    >>> import sage2ipython
    >>> sage2ipython.convert_all_sage_worksheets('username')

where *username* is your account name.  You may also need to edit the 
SAGE notebook account name that occurs in the path in `convert_all_sage_worksheets()`.

If you have any problems, it is likely that your worksheet contains some special characters that
need to be escaped in the IPython notebook.  I've included fixes for several of those, but almost
certainly not all of them.  Please let me know.

General notes/limitations:

- All code blocks are assumed to be Python code blocks.
- Output is simply deleted.
- Everything else is put in Markdown cells.
- Double backslashes are handled properly only if you have the development version of IPython.  Otherwise, you should convert them to quadruple backslashes.
