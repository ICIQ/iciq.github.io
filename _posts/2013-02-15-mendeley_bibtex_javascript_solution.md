---
layout: post
title: How to avoid javascript errors when copy-pasting Bibtex citations in Mendeley on Mac OS X
name: How to avoid javascript errors when copy-pasting Bibtex citations in Mendeley on Mac OS X
subtitle: A simple fix
tags: mendeley bibtex
categories: blog-post
---


I use Mendeley to manage references.  Mendeley has a nice auto-import feature
that will pull down bibliographic data from the web to my database.  When
writing, my workflow typically involves grabbing references from Mendeley in
bibtex format.  The simplest way to do this involves right-clicking on a
publication and selecting "copy citation".  Provided that one has already
selected "bibtex generic citation style" in the *View->Citation Style* menu,
this action results in the full bibtex entry being copied to the clipboard.

At least, that's how it's supposed to work.

For a couple of years now, I've had the problem that I get this on the clipboard instead:

>Error: JavaScript error found: CSL error: Exception: TypeError: 'undefined' is not a function, 515, file:///Applications/Mendeley%20Desktop.app/Contents/Resources/citeproc-js/citeproc.js

Despite this problem being [reported by numerous users](https://www.google.com/search?q=mendeley+javascript+error), Mendeley has never provided a fix that worked for me.  But today, after discussion with Mendeley support, I found my own fix.

**What to do:** Just replace the file 

~/Library/Application Support/Mendeley Desktop/citationStyles-1.0/bibtex.csl

with the one found at

[http://www.zotero.org/styles/bibtex](http://www.zotero.org/styles/bibtex)

Then re-open Mendeley.  That's it.  Of course, I reccomend just moving your bibtex.csl rather than deleting it, in case anything goes wrong.

