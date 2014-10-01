---
layout: post
title: Tools for IPython notebooks and version control
name: Tools for IPython notebooks and version control
subtitle: A work in progress
tags: IPython notebook version-control tools
categories: blog-post
---

As readers of this blog will know, I use the IPython notebook heavily in my teaching and research.
One great thing about the notebook is that it is stored as text (JSON), which means it
can be kept under version control (using Git, Mercurial, Subversion, etc.) in a meaningful way.
However, there are some significant obstacles:

1.  It is often desirable to have multiple versions of a notebook.  Usually, this is because
    one wants a copy of the notebook that includes output, for instance so it can be
    served up as static HTML via NBViewer.  However, it may not make sense to keep
    the output under version control, particularly if it includes images (see the next
    point below).  It is a pain to repeatedly clear all the output when it is not wanted,
    then rerun the whole notebook when output is wanted.  It's also messy to keep track of
    multiple versions of the same notebook.
2.  In other cases one wants to keep two versions of teaching notebooks
    -- one with the answers and one without.  In this case, the first version should be private,
    while the second can be public.
2.  Output images are embedded in the file as huge lines of text.  This is nice in that the 
    notebook is self-contained and portable, but it means that in any notebook with images,
    most of the file is not human-readable.  In particular, if the image changes in any way,
    a diff will be totally useless.

My solution to problem 1 is to put the notebooks with output up as gists (examples)
and to always clear all output before committing a new version of a notebook.

Tools available: nbdiff, nbstripout.
