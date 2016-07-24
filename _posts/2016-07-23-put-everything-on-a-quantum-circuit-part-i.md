---
layout: post
title: Put everything on a quantum circuit--part I
subtitle: Quantum dynamics revisited
tags:
    - Julia
    - quantum dynamics
categories:
    - notebook
---
## Preface
This series of notes is initially written for [Amit Jamadagni](https://github.com/amitjamadagni) and [Xiuzhe Luo](https://github.com/Roger-luo) who have been working on the [JuliaQuantum organization](http://juliaquantum.github.io)'s [Base.jl](https://github.com/JuliaQuantum/QuBase.jl),
[QuDynamics.jl](https://github.com/JuliaQuantum/QuDynamics.jl) and [QuCmp.jl](https://github.com/JuliaQuantum/QuCmp.jl) projects individually.
Amit has put intensive efforts on framing out the basic [Julia](http://julialang.org) libraries on basic quantum type system, the time evolution of quantum systems
and the idea of propagators.
Xiuzhe as a junior undergraduate physics student just started the QuCmp.jl project to build some fundamental Julia libraries for quantum computing (adiabatic quantum computing, quantum circuit model and others).
I try to outline in the notes some theoretical foundations on quantum dynamics (especially for open quantum systems) and its link to simulating quantum computing models (especially on the circuit model) with the hope to conclude the following points:

- To reach out the regime of more complicated scenarios to simulate general
quantum systems beyond what Amit have done, it would be great to have the stochastic differential equations and their solvers established.

- To be widely useful and efficient, it may be better to reframe the type system on top
of operator and superoperator language[^1].
It could be easier to start with the complete positive mapping case where the methods and theory have been well established.

- All of the current projects are depending on each other on different levels, and hence developers should know how JuliaQuantum projects are connected in a big picture and work together.
That will make the organization and its projects long-lasting and attractive.

- There are a lot to look forward to in building the JuliaQuantum libraries.
Once the operator/superoperator type system established, the stochastic equation solves will be easier to implement; once that is done, quantum metrology, tomography and control which usually involve stochastic processes instead of deterministic time-evolution processes will be possible to simulate using the basic packages, and packages for these applications can be developed;
the quantum computing package--especially the universal quantum circuit simulation module--is one aspect of those applications as well as the foundation for designing and controlling future quantum computers, the high-performance and generality of which could attract people to join us to develop more useful tools and devices even after the quantum computing times burst.

I wish this series of notes could be helpful in sketching a big and inspiring picture in the readers' mind, instead of trapping their mind into some niches.
It may be helpful for other audience.
Please leave your comments if you find it helpful or have other thoughts.


## A normal time-evolution instance you may have studied

Let us begin with a simple example: an atomic ensemble interacts with a quantum bath which could be a magnetic field or ideal single photon sources.
The time evolution of the density operator may be described by the following differential map
$$\begin{equation}\label{eq:drhot}
\hat{\rho}(t+dt) = \hat{M}_0(dt)\hat{\rho}(t)\hat{M}^\dagger_0(dt) +
\sum_{\mu>0} \hat{M}_\mu (dt)\hat{\rho}(t)\hat{M}^\dagger(dt)
\end{equation}$$
where the self-evolution operator in the time slot $dt$ is given by
$\hat{M}_0(dt)=\hat{\mathbb{1}}-\frac{i}{\hbar}\hat{H}_{eff}dt$ with the
effective Hamiltonian $\hat{H}_{eff}=\hat{H}-\frac{i\hbar}{2}\sum_\mu
\hat{L}_\mu^\dagger \hat{L}_\mu$.
The system Hamiltonian $\hat{H}$ can be arbitrary yet Hermitian. It defines how the system processes without interacting with environment and its energy spectrum (levels).
If we consider a spin-$1/2$ system in the z-basis, a simple free-processing Hamiltonian could be
$$\begin{align}
\hat{H} &= \left( \matrix{E_+ & 0 \\ 0 & E_-}\right),
\end{align}$$
where $E_+$ and $E_-$ are the two energy levels. Obviously, it can be rewritten using the Pauli operators.

The so-called jump operators $\hat{L}_\mu$ define how the system will evolve in each measurement basis $\mu$. A quantum state will be evolved into
$$\begin{align}
\ket{\Psi(t+dt)} &= \hat{L}_\mu(dt) \ket{\Psi(t)}
\end{align}$$
if only considering the single jump operator $\hat{L}_\mu$ applied in a small period of time, $dt$.
We call $\hat{L}_\mu$ a jump operator because it projects the quantum state towards some eigenstate of the operator randomly.
For example, we could let $ \\hat{L}_i = \\sigma_z $ for a spin-$1/2$ system, which means $\hat{L}_i$ will tend to project the system onto one of its eigenstate for spin number $\pm \frac{1}{2}$ in the z-basis.
To give a concrete sense of physics, this type of jump operators could corresponding to a magnetic field interaction--the one as we know in the [Stern-Gerlach experiment](https://en.wikipedia.org/wiki/Stern%E2%80%93Gerlach_experiment).

We can formally define a set of Krause operators
$$\begin{align}
\hat{M}_\mu &= \hat{L}_\mu \sqrt{dt},\quad \mu=1,\cdots,m.
\end{align}$$
Notice that each $\hat{M}_\mu$ is on the order of $\sqrt{dt}$ which makes the Krause operator a second-order effect on the evolution of the system.
We define the Krause operators in this way is based on the fact that the measurement operators $\hat{E}_\mu$ and the probability of finding the output on the $\mu$ channel $p_\mu$ should be
$$\begin{align}
\hat{E}_\mu &= \hat{M}^\dagger_\mu\hat{M}_\mu \\
p_\mu &= \tr\left( \hat{\rho}\hat{E}_\mu\right) \label{eq:jumppmu}
\end{align}$$
which are incremental over $dt$ time slots. The post-measurement state can therefore be written as
$$\begin{align}\label{eq:rhodt}
\hat{\rho}_\mu = \frac{\hat{M}_\mu\hat{\rho}\hat{M}^\dagger_\mu}{p_\mu}.
\end{align}$$
For a pure state $\hat{\rho}=\ketbra{\Psi}{\Psi}$[^a],
$$\begin{align} \label{eq:Psidt}
\ket{\Psi(t+dt)}_\mu = \frac{\hat{M}_\mu\ket{\Psi(t)}}{\sqrt{p_\mu}} = \frac{\hat{L}_\mu\ket{\Psi(t)}}{ \abs{\hat{L}_\mu\ket{\Psi(t)}} }.
\end{align}$$
Eq.$\eqref{eq:Psidt}$ may look more familiar than Eq.$\eqref{eq:rhodt}$ as the former one is commonly used to describe Born's rules on quantum measurements.

If we look at Eqs.$\eqref{eq:Psidt}$ and $\eqref{eq:rhodt}$ more closely, we will find that both has been used in defining the algorithms of ***quantum diffusion Monte Carlo*** (QDMC) or ***quantum wavefunction Monte Carlo*** (QWFMC) method{% cite Dum1992Monte Molmer1993Monte Molmer1996Monte Plenio1998Quantum --file References %}.
The $\hat{L}_\mu$ operator indeed defines the random quantum jumps in the algorithm with a jump probability defined in Eq.$\eqref{eq:jumppmu}$!
Each jump will lead to a new quantum trajectory and *diffuse* the quantum states over time.

Further more, if we rewrite Eq.$\eqref{eq:drhot}$ in the form of an ordinary differential equation, we have obtain
$$\begin{align} \label{eq:lindblad}
\dd{\rho}{t} &= -\frac{i}{\hbar} \left[ \hat{H},\hat{\rho}\right]-\frac{1}{2}\sum_{\mu=1}^m \left( \hat{L}_\mu^\dagger\hat{L}_\mu\hat{\rho}+\hat{\rho}\hat{L}^\dagger_\mu\hat{L}_\mu-2\hat{L}_\mu\hat{\rho}\hat{L}^\dagger_\mu \right).
\end{align}$$
This is the famous *Lindblad* form of the ***quantum master equation*** for an open system!
In many textbooks, the Lindblad equation can also be formally simplified by defining a superoperator $\mathcal{D}[\cdot]$ via
$$\begin{equation}
\mathcal{D}[\hat{\rho}] = -\frac{i}{\hbar} \left[ \hat{H},\hat{\rho}\right]-\frac{1}{2}\sum_{\mu=1}^m \left( \hat{L}_\mu^\dagger\hat{L}_\mu\hat{\rho}+\hat{\rho}\hat{L}^\dagger_\mu\hat{L}_\mu-2\hat{L}_\mu\hat{\rho}\hat{L}^\dagger_\mu \right)
\end{equation}$$
so that $\dd{\hat{\rho}}{t}=\mathcal{D}[\hat{\rho}]$ describes a dissipative process in a neat form.
In the mean time, the jump operators $\hat{L}_\mu$ could also be called in many places the Lindblad operators if they yields the POVMs as defined earlier.

Just a note on side: the measurement operator defined earlier is usually called POVMs (postive-valued measurements) if the eigenvalues are not negative corresponding to physical projection measurement outputs.
In research, finding an optimal set of measurements to retrieve the maximum information of the quantum state of a system with minimal times of measurements has been a hot topic and leads to the field of quantum tomography, compressed sensing and related algorithms.

## A second look on the quantum trajectories using stochastic calculus language
Above, we have described the system-environment interaction as a process of random quantum measurements.
In the cases we have studied, we treat the environmental disturb as statistically identical sources over time--to some extent, the jump probability distribution has to be identical for each jump step to be able to directly apply the pure time-differential equations we have derived earlier.
Let us take a closer look on its statistic nature in the language of stochastic calculus{% cite Gardiner1985Handbook --file References %}[^b].

For simplicity, we will stick to a given state $\ket{\Psi(t)}$. We define a random variable--a stochastic interval $dN_\mu(t)$--Poisson distributed with values
<div>
$$\begin{equation}\label{eq:dNmudistr}
dN_\mu(t) = \left\{
  \begin{array}
  \\1 , & \text{with probability } p_\mu \\
  0, & \text{with probability } 1-p_\mu.
  \end{array}\right.
\end{equation}$$
</div>
It satisfies the properties based on the rule of stochastic calculus that
$$\begin{align}
\sum_{\mu=0}^m dN_\mu(t) &=1,\label{eq:sumdNmu}\\
dN_\mu(t)dN_\nu (t) &= \delta_{\mu\nu} dN_\mu(t),\\
\text{expectation value } \langle dN_\mu (t)\rangle &= p_\mu = \bra{\Psi(t)} \hat{L}^\dagger_\mu \hat{L}_\mu \ket{\Psi(t)}dt.
\end{align}$$
Then based on the physical meaning, we can rewrite an unnormalized form of the evolved state by
$$\begin{align}
\ket{\tilde{\Psi}(t+dt)} &= dN_0(t)\hat{M}_0\ket{\Psi(t)} + \sum_{\mu=1}^m dN_\mu (t)\hat{L}_\mu \ket{\Psi(t)}.
\end{align}$$
We use the property of the stochastic internal $dN_\mu(t)$ to replace
$dN_0(t)=1-\sum_{\mu=1}^m dN_\mu$, and obtain
$$\begin{align}
\ket{\tilde{\Psi}(t+dt)} &= \hat{M}_0\ket{\Psi(t)} + \sum_{\mu=1}^m dN_\mu (t) (\hat{L}_\mu -\hat{M}_0) \ket{\Psi(t)}\\
&= (\mathbb{1} - \frac{i}{\hbar}\hat{H}_{eff}dt)\ket{\Psi(t)} + \sum_{\mu=1}^m dN_\mu (\hat{L}_\mu - \mathbb{1} + \frac{i}{\hbar}\hat{H}_{eff}dt)\ket{\Psi(t)}.
\end{align}$$
We ignore the terms that have an order higher than $dt$ according to the rules of stochastic calculus, that is to let $dN_\mu (t)dt \sim \sqrt{dt}dt=0$, and obtain the unnormalized state update equation
$$\begin{align}
d\ket{\tilde{\Psi}} &\equiv \ket{\tilde{\Psi}(t+dt)} - \ket{\Psi(t)}\\
&= -\frac{i}{\hbar} \hat{H}_{eff}dt\ket{\Psi} + \sum_{\mu=1}^m dN_\mu(t)(\hat{L}_\mu-1)\ket{\Psi}.
\end{align}$$
This is the unnormalized ***stochastic Schrodinger equation*** (SSE) for a jump update.
Alternatively, in the normalized form, the SSE becomes
$$\begin{align}\label{eq:SSE}
d\ket{\Psi} &= \left( -\frac{i}{\hbar}\hat{H}_{eff} + \frac{1}{2}\sum_{\mu=1}^m \langle \hat{L}^\dagger_\mu \hat{L}_\mu \rangle \right) dt\ket{\Psi} + \sum_{\mu=1}^m dN_\mu(t) \left( \frac{\hat{L}_\mu}{\sqrt{\langle \hat{L}^\dagger_\mu \hat{L}_\mu\rangle }}-1\right)\ket{\Psi}.
\end{align}$$

By using the definition that the density operator is the ensemble average, $\hat{\rho}(t+dt)=\bar{\ketbra{\Psi(t+dt)}{\Psi(t+dt)}}$ and only keep terms up to the order of $dt$, it is trivial to show that the Lindblad equation (Eq.$\eqref{eq:lindblad}$) is equivalent to the SSE.

There are two important properties of the SSEs, Lindblad equations and $dN(t)$:

- The SSEs and Lindblad master equations in general are unlike the normal Schrodinger equation, and could be nonlinear due to the fact that $dN_\mu(t)$ could depend on the state of $\Psi(t)$ at each time step[^c].
- In our case, $dN(t)$ obeys the Poisson distribution.
It means that, in every jump of the quantum trajectory, the jump statistics will be the same as the previous step, and the process of determining which trajectory to jump can be mapped to the "toss of a coin" problem--whether the result is a "head" or "tail" for every toss is predefined as independent identical instances with a uniform random distribution.
This is a typical Markov chain process that the "toss of coin" doesn't have a memory with the previous step, or physically you might want to regard this process as being jumping in steps slower than the dissipative or equilibrium process ($\delta t \gg 1/\gamma$).
Lindblad equations with a simple time-homogeneous evolution only works for Markovian processes with simple random sampling properties.

In similar cases, one can use different Lindblad operators to describe the quantum dynamics with the same form of Lindblad equations as shown in Eq.$\eqref{eq:lindblad}$.
Commonly, the *relaxation* process of a quantum system in presence of a reservoir can be described by the Lindblad superoperator
$$\begin{align}
\mathcal{L}[\hat{\rho}] &= -\frac{1}{2}\sum_{\mu=1} \left( \hat{L}_\mu^\dagger\hat{L}_\mu\hat{\rho}+\hat{\rho}\hat{L}^\dagger_\mu\hat{L}_\mu-2\hat{L}_\mu\hat{\rho}\hat{L}^\dagger_\mu \right)\\
&= \frac{1}{2}\sum_{\mu=1}\left[\hat{L}_\mu,\left[\hat{\rho}, \hat{L}_\mu \right] \right].
\end{align}$$

## All can be extended to more complicated cases with a small tweak
We can briefly take a look on how this formalism can be extended to other cases and find the correct Lindblad operators--yes, find a proper Lindblad operator is the only modification without changing the form of equations for some cases.
For example, in a homodyne detection case{% cite Wiseman1993Interpretation --file References %}, a beam splitter is used to branch out two signal paths for the final measurement; a local oscillator, which could be a coherent laser beam locked at the same frequency as the input signal on the other branch of the beam splitter as shown in the figure below.
For a balanced beam splitter, the two output branches yield the combined and subtracted signals in detection, which are the $\hat{X}$ and $\hat{P}$ quadratures in the phase plane.

<center>
 ![Fig 1. Beam splitter for homodyne and heterodyne detections.](/assets/img/homodyneheterodyne_beamsplitter.svg)

<br> <br>
</center>

By treating the local oscillator as a coherent light with a large amplitude $\alpha$ (related to the averge phone flux with a phase factor), the input-output relationship of the beam splitter can be given by
$$\begin{align}
\hat{a}_\pm &= \frac{\alpha\hat{\mathbb{1}} \pm \hat{a}}{\sqrt{2}}.
\end{align}$$
Assuming the other part of the quantum system is the same as before and the signal has $\mu=1,\cdots,m$ modes, the Lindblad operators can be written as $\hat{J}_{\mu,\pm} = \frac{A_\mu \hat{\mathbb{1}}\pm \hat{L}_\mu}{\sqrt{2}}$, where $A_\mu$ is a complex constant.
After some algebra, the Krause operators of the homodyne case can also be defined as a linear transformation of the previous Krause operators:
$$\begin{align}
\left(\begin{array}{c} \hat{K}_0\\ \hat{K}_{\mu,+} \\ \hat{K}_{\mu,-}\end{array}\right)
&= \left[ \begin{array}{ccc}
1-\frac{1}{2}|A_\mu|^2dt & 0 & A_\mu \sqrt{\frac{dt}{2}}\\
A_\mu\sqrt{\frac{dt}{2}} & \frac{1}{\sqrt{2}} & \frac{1-\frac{1}{2}|A_\mu|^2dt}{\sqrt{2}}\\
A_\mu\sqrt{2} & -\frac{1}{\sqrt{2}} & \frac{1-\frac{1}{2}|A_\mu|^2dt}{\sqrt{2}}
\end{array}\right]
\left(\begin{array}{c} \hat{M}_0 \\ \hat{M}_\mu \\ 0 \end{array}\right).
\end{align}$$
The form of Lindblad eqution and the stochastic Schrodinger equation will be the same as before{% cite Wiseman1993Interpretation --file References %}.

You may ask could the sampling process have any statistical distribution types other than the uniform random distribution? Indeed, the stochastic interval $dN_\mu(t)$ can have different statistical distribution modes.
In either homodyne or heterodyne measurements with a local oscillator at a frequency the same as or different from the signal merged at a beam splitter{% cite Wiseman1993Interpretation --file References %}, the local oscillator injects noise to the measurement result and affects the quantum dynamics in the process of continuous measurements.
Roughly speaking, we may be able to formally rewrite the stochastic interval in the following form,
$$\begin{equation}
dN_\mu (t) = <dN_\mu(t)> + \sigma_\mu \delta W_\mu(t),
\end{equation}$$
where the first part $<dN_\mu(t)>$ is the mean value of stochastic interval, $\sigma_\mu$ is the variance, and $\delta W_\mu(t)$ is the Weiner stochastic variable.
In our case, $<dN_\mu(t)>$ is proportional to the intensity of the input modes, and the variance of the signals can be determined by the square root of the photon number in the interaction time interval for a coherent light.
Given a relatively strong local oscillator, the noise generated obeys the central limit law and will be a Gaussian noise.
Therefore, $\delta W_\mu(t)$ will be a Brownian diffusion random variable in a Gaussian distribution which gives a white noise.
Later, we will use $dW(t)$ to characterize the stochastic process for the normalized stochastic variable with various distribution modes.
We will see the stochastic viable will eventually extend the commonly seen time-homogeneous quantum evolution to a broader spectrum of scenarios in the next part of the notes.

If you want to modify a quantum dynamics simulation code--either using Monte Carlo method or other algorithms--which only involves homogeneously distributed random variable to a general stochastic processes, what you need to do is to bring in a stochastic variable $dW(t)$ with other statistical distributions and find a proper integration method to solve the differential equations.
Using the homodyne detection case, for instance, you can define $dt$ and $dW(t)$ in a time list $t$ as below.

**In [1]:**

```julia
tmin = 0.;
tmax = 10.0;
step = 100;
t = linspace(tmin,tmax,step);
dt = t[2]-t[1];
dW = randn(step).*dt;
```

The variable `dW` is now a list of Gaussian/normally distributed numbers with mean $0$ and standard deviation $1$ with the same length as `t`, and `dt` is a constant for all time steps.
Easy peasy, right?

## Wrap up for this part
In this part of notes, we have revisited the quantum dynamics problems that has been widely taught in undergraduate level quantum mechanics classes but in a stochastic process perspective in the end.
In general, the stochastic process reflects one important nature of quantum systems and will lead to a rich church of differential equations that our JuliaQuantum libraries would want to include, and I will illustrate more on their forms in the next part.
The leftover practical task for solving stochastic equations is to implementing various solvers or integrating algorithms.
There are two well-known stochastic integrals--[Itô integral](https://en.wikipedia.org/wiki/It%C3%B4_calculus) and [Stratonovich integral](https://en.wikipedia.org/wiki/Stratonovich_integral).
More details of the general form of stochastic differential equations and integration methods can be found in {% cite Gardiner2004Quantum --file References %} and other modern books.
I will not write too much on those details, but rather give you a big picture on the connected fields.

On the other hand, quantum simulation packages like the *Quantum Optics Toolbox in Matlab*{% cite Tan1999Computational --file References %} and its Python version *QuTiP*{% cite Johansson2013Qutip --file References %} becomes widely used while the input quantities can be classified into a few object classes is mainly due to the mathematical fact that the quantum dynamics equations and quantum systems those toolboxes can simulate all have nice mathematical structures.
For example, a lot of quantum dynamics problems can be described by the Lindblad form of master equations, which in the end is completely positive maps (CP-maps) and can be fully characterized by the hierarchy of complete positive operators and superoperators as mathematical objects[^d].
To my perspective, the existing JuliaQuantum libraries can be improved by extending its representation types to the operator and superoperator system and build more general solvers to cover the stochastic equations, and we can make better program libraries with in-depth mathematical insights and high-performance programming language.
I will also touch the base of some mathematical fundation in the next part.



With the basic stochastic language introduced, we are ready to explore more complicated differential equations and start appreciating the nature of quantum measurements and how all of these can be connected to the quantum circuit model.
I hope the following notes can help you understand those connections intuitively.



References
----------
{% bibliography --cited_in_order --file References %}

Footnotes
---------
[^1]: If you only know quantum operators, superoperators are just
another layer of operations on operators.
Superoperator notations have been widely used to describe the evolution of open
quantum systems where the concept of propagator can be fully characterized.
[^a]: For mixed states, the state of the system cannot be written as a signle pure state, $\ket{\Psi}$ any more, in general. Instead, a density operator $\hat{\rho}=\sum_i p_i\ketbra{\Psi_i}{\Psi_i}$ as an ensemble decomposition of pure states, $\ket{\Psi_i}$, is used to characterize the system, where $p_i$ is the probability of being in the $\ket{\Psi_i}$ state.
[^b]: Also see the [Quantum stochastic calculus](https://en.wikipedia.org/wiki/Quantum_stochastic_calculus) page for a quick review created by [Jonathan Gross](http://www.unm.edu/~jagross/) for a [Quantum Optics wikipedia project](http://iciq.github.io/entangle/WikipediaProject.html).
[^c]: We will use this fact in my future notes on deriving quantum dynamic equations symbolically for general scenarios.
[^d]: A brief summary on the relation between Lindblad equations and CP-map can be found in [Jess Riedel's blog](http://blog.jessriedel.com/2014/07/26/lindblad-equation-is-differential-form-of-cp-map/).
