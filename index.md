---
layout: default
title: David Ketcheson
subtitle: Numerical analysis and nonlinear waves
---

<div class="span12">
<div class="span6">
![floatright](assets/img/davidketcheson.jpg)
I am an assistant professor of [applied mathematics](http://cemse.kaust.edu.sa/academic/programs/applied-mathematics-computational-science/default.aspx) at King Abdullah University
of Science and Technology ([KAUST](http://www.kaust.edu.sa)), where
I lead the [Numerical Mathematics Group](http://numerics.kaust.edu.sa).
Previously I maintained a blog in addition to my professional website.  This
new site is intended to fulfill both roles, with the blog being extended to
a genuine open science notebook.

My [research](http://numerics.kaust.edu.sa/research.html) involves
analysis and development of new numerical methods for integration of ordinary
and partial differential equations, as well as the application of such methods
in high performance software to understand behavior of nonlinear waves in 
heterogeneous materials.

<ul class="unstyled" style="font-size:.8em;line-height=.8em">
<li style="margin:-6px"> Office: 4202 Al-Khawarizmi Building 
<li style="margin:-6px"> Email &amp; online networks: linked from icons below. </li>
</ul>
</div>

<span>
<div class="span5">
  <h2 class="h1-5">Latest Posts</h2>
{% for post in site.posts limit:2 %}
{% include postsummary.html %}
{% endfor %}
<a href="archives.html">Older Posts</a>
</div>
</span>

</div>
