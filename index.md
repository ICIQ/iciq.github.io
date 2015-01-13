---
layout: default
title: David Ketcheson
subtitle: Saving the world, one numerical method at a time
---

<div class="span12">

<span>
<div class="span7">
{% for post in site.posts limit:4 %}
{% include postsummary.html %}
{% endfor %}
<h2><a href="archives.html">Older Posts</a><h2>
</div>
</span>


<div class="span4">

![floatright](assets/img/davidketcheson.jpg)
I am an associate professor of [applied mathematics](http://cemse.kaust.edu.sa/academic/programs/applied-mathematics-computational-science/default.aspx) at King Abdullah University
of Science and Technology ([KAUST](http://www.kaust.edu.sa)), where
I lead the [Numerical Mathematics Group](http://numerics.kaust.edu.sa).

My [research](http://numerics.kaust.edu.sa/research.html) involves
analysis and development of numerical methods for integration of ordinary
and partial differential equations, as well as the implementation of such methods
in [open source, accessible, high performance software](code.html)
and its application to understanding behavior of nonlinear waves in heterogeneous materials.

<ul class="unstyled" style="font-size:.8em;line-height=.8em">
<li style="margin:-6px"> Office: 4202 Al-Khawarizmi Building 
<li style="margin:-6px"> Email &amp; online networks: linked from icons below. </li>
</ul>

<span>
  {% include sidebar_footer.html %}
</span>
</div>

</div>
