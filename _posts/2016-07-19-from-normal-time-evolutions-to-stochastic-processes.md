---
layout: post
title: From normal quantum time evolutions to Stochastic quantum processes
tags:
    - Julia
categories:
    - notebook
---
In the JuliaQuantum's [Base.jl](https://github.com/JuliaQuantum/QuBase.jl) and
[QuDynamics.jl](https://github.com/JuliaQuantum/QuDynamics.jl) projects,
intensive efforts have been focusing on the time evolution of quantum systems
and the idea of propagator has been framed out.
To reach out the regime of more complicated scenarios to simulate general
quantum systems, however, it may be better to reframe things immediately on top
of operators and superoperators language in my opinion.
Operators may be familiar to most of the readers, and superoperators are just
another layer of operations on operators.
Superoperator notations have been widely used to describe the evolution of open
quantum systems where the concept of propagator can be fully characterized.
In the mean time, quantum measurement and control usually involve stochastic
processes instead of differentiable deterministic time-evolution processes.
There, propagators are not the minimal building blocks any more, but operator
and superoperator language still valid to define the dynamics of the quantum
system.



For a simple example, a quantum measurement on an atomic ensemble through
photons may be described by the following differential map
\begin{equation}\label{eq:drhot}
\hat{\rho}(t+dt) = \hat{M}_0(dt)\hat{\rho}(t)\hat{M}^\dagger_0(dt) +
\sum_{\mu>0} \hat{M}_\mu (dt)\hat{\rho}(t)\hat{M}^\dagger(dt)
\end{equation}
where the self-evolution operator in the time slot $dt$ is given by
$\hat{M}_0(dt)=\hat{\mathbb{1}}-\frac{i}{\hbar}\hat{H}_{eff}dt$ with the
effective Hamiltonian $\hat{H}_{eff}=\hat{H}-\frac{i\hbar}{2}\sum_\mu
\hat{L}_\mu^\dagger \hat{L}_\mu$.

Eq. $\eqref{eq:drhot}$

Ref: {% cite Eberlein2009 Kress2005 --file References %}

Generalize to quantum circuit model
===================================

Representation of superoperators
================================
Reference on CP-map and superoperator representations{% cite Caves2014 --file References %}.

**In [1]:**

{% highlight julia %}
rho = [0. 1.;
       1. 0.]
{% endhighlight %}




    2x2 Array{Float64,2}:
     0.0  1.0
     1.0  0.0



**In [None]:**

{% highlight julia %}

{% endhighlight %}

References
----------
{% bibliography --cited_in_order --file References --generate_details no %}

Footnotes
---------
