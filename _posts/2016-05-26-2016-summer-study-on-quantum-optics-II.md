---
layout: post
title: 2016 summer study on selected topics in Quantum Optics
tags:
    - summer study
    - quantum optics
---

As usual, I will organize/participate a summer study this year.
Since there are a lot of things going on this summer and [Prof. Ivan Deutsch](http://cquic.unm.edu/deutsch-group/) here in UNM is actually hosting review sessions on Quantum Optics I this summer,
I was thinking to have the following focus for my self-organized summer study:

- Title: Advanced Topics in Quantum Optics (II)

  (Yeah, we have tagged part I [two years before](http://iciq.github.io/entangle/QuantumOpticsGroup.html) already.)

  <center>{% include image.html img="http://media.wiley.com/product_data/coverImage300/73/35274070/3527407073.jpg" scale="95%" title="optical pumping and laser cooling" %}</center>
  <br>

- Main topics:
    - Optical pumping
    - Laser cooling
    - matrix/tensor product state representation of many-body systems (let's see if time permits)

- Time slot: From June 1st to July 29th. Detailed schedule to be updated.

- Main references:
    - [Quantum Optics I by Prof. Ivan Deutsch](http://info.phys.unm.edu/~ideutsch/Classes/Phys566F15/index.htm) (lecture videos, notes and homeworks are all available in the link).
    - [Atomic Physics course by Prof. Ivan Deutsch](http://info.phys.unm.edu/~ideutsch/Classes/Phys531F11/index.htm) (lecture videos, notes and homeworks are all available in the link).
    - A book, if you wish, as shown in the photo above by our friend [Yuan-Yu Jau](http://cquic.unm.edu/member/yuan.yu.jau/) and others on Optical Pumping featured with simulation demo codes and detailed analysis.
    - A handful of classical papers to be updated here later.

- Discussion forum: [see this channel](https://disqus.com/home/channel/quantumoptics) I created recently.

The plan is to visit or revisit those lectures and do some homeworks and derivations,
and reproduce some known results published in some reference papers.
I may do some programming in Julia using our preliminary [JuliaQuantum libraries](http://juliaquantum.github.io),
which is good to me since I will meet with Nik from Stanford in June to share our experiences on symbolic computing and simulating quantum control related stuffs in Julia,
and then meet with our core JuliaQuantum developer Amir and a tensor network guru Jutho from Ghent to discuss some efficient ways to handle quantum objects in Julia.
I hope some good ideas can be further transferred to the code base of the JuliaQuantum libraries under construction.

If you are interested in taking this challenge and fun study opportunity, feel free to contact me or comment below.
Thanks!

Schedule and progress
=====================

- [X] June 1st-5th:
    - [X] From Ivan's QO lectures: Coherence, density matrix, Bloch-sphere, Rabi oscillations.  Lecture notes #4-6, P.S. #2-4; Optical Bloch equations, Master equation, Damped two-level atom.  Lecture notes #7-8, P.S. #5-6.
    - [X] From Yuan-Yu's book: chapters 1-5 (Alkali atoms, wavefunction, Schrodinger space, density matrix, Liouville space, optical pumping of atoms).
    - [X] Get familiar with JuliaQuantum libraries: [QuBase.jl](https://github.com/JuliaQuantum/QuBase.jl), [QuDirac.jl](https://github.com/JuliaQuantum/QuDirac.jl) and [QuDynamics.jl](https://github.com/JuliaQuantum/QuDynamics.jl).
* [X] June 6th-12th:
    * [X] From Ivan's QO lectures: Quantization of the field, atoms+quantized field. Lecture notes #11-13, P.S. #7;
    * [X] From Ivan's AP lectures: notes 10-13.
    * [X] From Yuan-Yu's book: chapters 6-9.
* [X] Skip June 13th-19th for more research work to be done. Then from June 20th-26th:
    * [X] Wrap up on Yuan-Yu's book.
    * [X] A blog post on some essential points. See [this one](http://i2000s.github.io/2016/07/23/put-everything-on-a-quantum-circuit-part-i.html) and more to come.
    * [X] Discuss with Nikolas as our visitor on symbolic calculus and quantum simulations in Julia.

A side note: I have to skip a month for preparing the workshop/conference and JuliaQuantum activities.
Writing notes took much more time than I had expected as there were some Jekyll and plugin problems I had to solve on the first time.
I will skip the topic on cooling processes for this summer study and will pick up a little bit on matrix product states before July 29th and will write some notes and discuss some important topics with JuliaQuantum members in the coming weeks.
So, no further plan for the rest of summer study. Sorry about that. Please continue on if you are willing to learn more. 
