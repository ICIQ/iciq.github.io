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

- [ ] June 1st-5th:
    - [X] From Ivan's QO lectures: Coherence, density matrix, Bloch-sphere, Rabi oscillations.  Lecture notes #4-6, P.S. #2-4; Optical Bloch equations, Master equation, Damped two-level atom.  Lecture notes #7-8, P.S. #5-6.
    - [ ] From Yuan-Yu's book: chapters 1-5 (Alkali atoms, wavefunction, Schrodinger space, density matrix, Liouville space, optical pumping of atoms).
    - [ ] Get familiar with JuliaQuantum libraries: [QuBase.jl](https://github.com/JuliaQuantum/QuBase.jl), [QuDirac.jl](https://github.com/JuliaQuantum/QuDirac.jl) and [QuDynamics.jl](https://github.com/JuliaQuantum/QuDynamics.jl).
* [ ] June 6th-12th:
    * [ ] From Ivan's QO lectures: Quantization of the field, atoms+quantized field. Lecture notes #11-13, P.S. #7;
    * [ ] From Ivan's AP lectures: notes 10-13.
    * [ ] From Yuan-Yu's book: chapters 6-9.
