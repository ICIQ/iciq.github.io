---
layout: barefooter
title: Xiaodong Qi's NoteBlog Site
subtitle: Exploring the Open Quantum World
description: Xiaodong Qi's website for hosting his personal blogs and CVs. Most of the content relates to his research work done at the Center for Quantum Information and Control (CQuIC), University of New Mexico, about Quantum Optics and Quantum Information Science with Atoms and Nanostructures.
---

<div class="span12">

 <span>
 <div class="span7" align="left">
  {% for post in site.posts limit:4 %}
  {% include postsummary.html %}
  {% endfor %}

  <div class="span6" align="left">
    <div style="font-weight:bold; text-align:center;font-size:1.2em;">
     <i class="icon-chevron-left"></i> <a href="/archives.html">Archives by date, </a>
     <i class="icon-list"></i> <a href="/categories.html">by category, </a>
     <i class="icon-tag"></i> <a href="/tags.html">by tag</a>
    </div>
  </div>
  <br><br><br><br>

  <div class="span3" align="left">
      <ul class="unstyled">
        <li style="margin:-6px"> <img alt="QR Code" src="/assets/img/qrcode.33561508.png" width=200px align="left"></li>
      </ul>
  </div>

  <div class="span3" align="right">
    <div class="span3" style="width:350px; align:right;text-align:left;">
           <h4><a property="account" href="https://twitter.com/{{site.author.twitter}}" onclick="recordOutboundLink(this, 'Outbound Links', 'Twitter'); return false;"><img src="/assets/img/icon-twitter.png" alt="Twitter"> Discussing </a></h4>
              <div class="excerpt" height="300px">
                <div class="scroll">
                  {% twitter_feed i2000s, 5 %}
                </div>
              </div>  
    </div>
    <ul class="unstyled" style="font-size:.8em;line-height:.8em; align:left;">
      <li style="margin:-6px"> Office: 30 Physics and Astronomy Department</li>
      <li style="margin:-6px">         1919 Lomas Blvd NE, Albuquerque, NM 87131, USA</li>
      <li style="margin:-6px"> </li>
    </ul>
    <div class="row" align="right">
       <div class="span3">
           <a href="mailto:i2000s@hotmail.com" onClick="recordOutboundLink(this, 'Outbound Links', 'email'); return false;"><img src="/assets/img/icon-email.png" alt="email"> </a>
           <a href="https://github.com/i2000s" onClick="recordOutboundLink(this, 'Outbound Links', 'Github'); return false;"><img src="/assets/img/icon-github.png" alt="github"> </a>
           <a href="https://plus.google.com/+XiaodongQi"><img src="/assets/img/icon-gplus.png" alt="G+"></a>
           <a href="http://scholar.google.com/citations?user=6FdqHlIAAAAJ&hl=en"><img src="/assets/img/icon-scholar.png" alt="GoogleScholar"></a>
           <a href="https://twitter.com/i2000s"><img src="/assets/img/icon-twitter.png" alt="Twitter"></a>
           <a href="/atom.xml" onClick="recordOutboundLink(this, 'Outbound Links', 'RSS'); return false;"><img src="/assets/img/icon-rss.png" alt="feed"></a>
           <a href="http://physics.stackexchange.com/users/37682/xiaodong-qi"><img src="/assets/img/icon-stackoverflow.png" alt="Physics Stackexchange"></a>  
       </div>
       <p style="text-align:left"><a href="/CV-XiaodongQi.pdf">CV of Xiaodong Qi</a></p>
    </div>
   <br><br><br>
  </div>
 </div>
 </span>


 <div class="span4">

  <b>Xiaodong Qi</b> (<span font="sans-serif">戚晓东</span>)<br>

  <div class="team-member">
  <img class="img-responsive img-circle" alt="" src="assets/img/qi2016.jpg" align="right" width=200px>
  </div>

  I am a PhD candidate of
  <a href="http://cquic.org">the Center for Quantum Information and Control (CQuIC)</a> at University of New Mexico (<a href="http://www.unm.edu">UNM</a>), where
  I am doing theoretical study with <a href="http://info.phys.unm.edu/~ideutsch">Prof. Ivan Deutsch</a>.

  Most of my time, I concentrate on <a href="/research.html">research</a>.
  I decode the mathematical rhythms of the dance of photons with matter (atoms, nano-scale objects and macro-scale photonic structures)--they are sometimes powerful, sometimes silky, in general harmonic, vivid, colorful, romantic and marvelous yet with a bit of mystery.
  My earliest study began with the energetic nature of light, and was discovering novel approaches to generate bright and coherent light in a given pace (frequency) based on the resonant play of light with well structured crystals and semiconductor structures.
  Later, I appreciate the other aspect of the light more than ever before, that is to employ weak light as the carry of information, and again via the dance with atoms on some nano-scale structures.
  I feel this study on few-photon and micro-scale platforms could open a door to a new era of information processing--namely, quantum information processing and communications.
  It will be precise, energe-efficient, intelligent and revolutionary in easing the lives of people and accelerating the evolution of human society.

  After years of serious studies on nature and rigorous trainings on critical thinking, I appreciate and enjoy my life more than ever before.
  Trains of thoughts on general philosophy and methodology are constantly examined in real life and are poured out on the internet and elsewhere with folks around me. Keep in touch!

  <a class="twitter-timeline" href="https://twitter.com/{{site.author.twitter}}" data-widget-id="704862944484421633" data-chrome="transparent noborders noscrollbar" width="360px" height="400px">Tweets by @{{site.author.twitter}}</a>
  <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>

</div>

</div>
<div class="span12" style="margin:-10px 0 10px">
  <div class="span12" align="center" vertical-align="middle">
      <a rel="license" href="https://creativecommons.org/licenses/by/4.0/">
        <span align="center" margin-top="-10px">Copyright &copy; {{ site.time | date: "%Y" }} {{ site.author.name }} under the Creative Commons Attribution License or specified. </span></a>
  </div>
  <br>
</div>
