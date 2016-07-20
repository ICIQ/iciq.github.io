---
title: Configuring the blog system and the open notebooks
layout: post
category: website
tags:
  - jekyll
  - docker
---

Here are some notes on building a website system in parallel with a reproducible computing system with GitHub.

Some ideas have been explored by Carl Boettiger and others. I will just collect some references here.

One main page site plus a lot of supporting repositories for labnotebooks:
- [main idea](http://www.carlboettiger.info/2015/01/01/notebook-maintenance-and-scaling.html).
- [Drone CI and Docker](http://www.carlboettiger.info/2014/09/05/drone-ci-and-docker.html).

Documents with Knitr and Jekyll:
- [main idea](http://www.carlboettiger.info/2015/01/07/automated-knitr-in-jekyll.html).
- [deep challenges of dynamic documentations](http://www.carlboettiger.info/2014/05/05/knitr-workflow-challenges.html).
- [related: Using knitr and pandoc to create reproducible scientific reports](http://galahad.well.ox.ac.uk/repro/).

More on Docker:
- [an introduction to Docker for reproducible research](http://www.carlboettiger.info/assets/files/pubs/10.1145/2723872.2723882.pdf).
- [Reproducible research environments with Docker](http://www.carlboettiger.info/2014/08/25/reproducible-research-environments-with-Docker.html).
- [A typical workflow with Docker on a cloud machine](http://www.carlboettiger.info/2015/12/17/docker-workflows.html).

Hosting Jekyll website with Docker:
- [simple website with Jekyll and Docker](http://habd.as/simple-websites-jekyll-docker/).
- [knitr & jekyll: Enabling the Stats Blog Pipeline](https://blog.inferentialist.com/2015/10/01/knitr-and-jekyll-enabling-stats-blog-pipeline.html).
- [Jekyll up and running with Docker](https://workshop.avatarnewyork.com/post/jekyll-up-and-running-with-docker/).


# Utilities:

## Equations.
`MathJax` plugin was used under the `Jekyll-pandoc` plugin for writing equations in markdown.
You can directly use the LaTeX syntax to write equations -- either numbered as display equations or inline equations.
One difference from normal LaTeX is that it requires to use `$\ref{label}$` or `$\eqref{label}$` to quote equation numbers in text.

## Citations.
There are two ways to cite a source. One is to use the `Jekyll-scholar` plugin. A typical usage syntax is
```
your text {% cite key --file file_directory_wrt_bibdir %}

# bibliography
{% bibliography --cited_in_order --file file_directory_wrt_bibdir %}
```
The citation number will be shown as a number inside of a pair of square brackets.
The other way is to use the `jekyll-pandoc` plugin. A typical usage syntax is
```
your text[^1]

[^1]: your ref [@key]
```
The reference list will show up at the end of the post with hyperlinks to the first citation place. The citation number will be shown as a superscript number in text.

You can choose one of them to cite references.
If you want to use both tools, I would recommend to use the second approach for footnotes where the same source is not cited in multiple places and/or you want to have your own comments.
In fact, in the second approach, you can even use `[_1]` or `[label]` formats for various labeling strategies. However, the style file for the second approach may not work as the same as the first one, or even doesn't work at all to pull and style bibtex information from the source file.

The detailed configurations are in the `_config.yml` file, where style template and bibtex files are defined for both cases.
More thoughts and tools on citations in markdown can be found at [this post](http://www.carlboettiger.info/2012/05/30/knitcitations.html). 
