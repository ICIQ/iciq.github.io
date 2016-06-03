---
layout: post
title: Dispersion relations for linear systems of PDEs
name: Dispersion relations
tags: wave-equation PDE mathematical-exposition
categories: notebook
---
Note: this post was originally written by [David Ketcheson](http://www.davidketcheson.info/2014/05/28/dispersion_relations.html).

Fourier analysis is an essential tool for understanding the behavior of
solutions to linear equations.  Often, this analysis is introduced to students in the
context of scalar equations with real coefficients.  If nothing more is said,
students may mistakenly apply assumptions based on the scalar case to systems,
leading to erroneous conclusions.  I'm surprised at how often I've seen
this, and I've even made the mistake myself.

## Scalar equations
Students in any undergraduate PDE course learn that solutions of the heat equation

$$
\label{heat}
u_t(x,t) = u_{xx}(x,t)
$$

diffuse in time whereas solutions of the wave equation

$$
\label{wave}
u_{tt} = u_{xx}
$$

oscillate in time without growing or decaying.  They may even be introduced to
a general approach for the Cauchy problem: given an evolution equation

$$ \label{evol}
u_t = \sum_{j=0}^n a_j \frac{\partial^j u}{\partial x^j},
$$

one inserts the Fourier mode solution

$$ \label{fourier}
u(x,t) = e^{i(kx - \omega(k) t)}
$$

to obtain

$$-i\omega(k) = \sum_{j=0}^n a_j (ik)^j$$

or simply

$$\omega(k) = \sum_{j=0}^n a_j i^{j+1} k^j.$$

The function $\omega(k)$ is often referred to as the *dispersion relation* for the PDE.  Any solution can be expressed as a sum of Fourier modes, and each mode propagates in a manner dictated by the dispersion relation.  It's easy to see that

- If $\omega(k)$ is **real**, then energy is conserved and each mode simply translates.  This occurs if only odd-numbered spatial derivatives appear in the evolution equation  \\eqref{evol}.
- If $\omega(k)$ has **negative imaginary part**, energy decays in time.  The heat equation \\eqref{heat} behaves this way.
- If $\omega(k)$ has **positive imaginary part**, then the energy will grow exponentially in time.  This doesn't usually occur in physical systems.  An example of this behavior is obtained by changing the sign of the right side in the heat equation to get $u_t = - u_{xx}$.

What about the wave equation, which has two time derivatives?  Using the same Fourier mode ansatz
\\eqref{fourier}, one obtains
$$
\begin{align}
\omega^2 & = k^2
\end{align}
$$
or $\omega = \pm k$.  Since $\omega$ is real, energy is conserved.

In the discussion above, we have assumed that $u$ is a scalar and that the coefficients $a_j$ are real.  Many undergraduate courses stop at this point, and students are left with the intuition that **even-numbered derivative terms are diffusive** while **odd-numbered derivative terms are dispersive**.

In practice, we often deal with systems of PDEs or PDEs with complex coefficients, and this intuition is then no longer correct.  There is nothing deep or mysterious about this topic, but it's easy to jump to incorrect conclusions if one is not careful.  To take a common example, consider the time-dependent Schroedinger equation:
$$i \psi_t = \psi_{xx} + V\psi.$$
At first glance, we have on the right side a diffusion term ($\psi_{xx}$) and a reaction term ($V\psi$).  But what about that pesky factor of $i$ (the imaginary unit) on the left hand side?  It's easy to find the answer using the usual ansatz, but let's take a little detour first.

## Systems of equations
Consider the linear system
$$
\begin{align*}
u_t = A  \frac{\partial^j u}{\partial x^j},
\end{align*}
$$
where $u\in \mathbb{R}^m$ and $A$ is a square real matrix.
Let $\lambda_m$ and $s_m$ denote the eigenvalues and eigenvectors (respectively) of $A$.
Inserting the Fourier mode solution
$$u(x,t) = s_m e^{i(kx - \omega(k) t)},$$
we obtain
$$\omega(k) = i^{j+1} k^j \lambda_m s_m,$$
and any solution can be written as a superposition of these.  We see now that the behavior of the energy with respect to time depends on both the number $j$ of spatial derivatives and the nature of the eigenvalues of $A$.  For instance, if $j=1$ and $A$ has imaginary eigenvalues, energy is conserved.  We can obtain just such an example by rewriting the wave equation \\eqref{wave} as a first-order system:
$$
\begin{align}
u_t & = v_x \label{w1} \\
v_t & = u_x. \label{w2}
\end{align}
$$
(If you're not familiar with this, just differentiate \\eqref{w1} w.r.t. $t$ and \\eqref{w2} w.r.t. $x$, then equate partial derivatives to get back the second-order wave equation \\eqref{wave}).  We have a linear system with $j=1$ and
$$ A = \begin{pmatrix}
0 & 1 \\ 1 & 0
\end{pmatrix}.$$
This matrix has eigenvalues $\lambda=\pm 1$, so $\omega(k)$ has zero imaginary part.

In this example, our intuition from the scalar case works: our first-order system, with only odd-numbered derivatives, leads to wave-like behavior.  But notice that if $A$ had imaginary eigenvalues, our intuition would be wrong; for instance, the system
$$
\begin{align*}
u_t & = -v_x \\
v_t & = u_x,
\end{align*}
$$
corresponding to the second-order equation $u_{tt} = - u_{xx},$ admits exponentially growing solutions.

## Scalar problems with complex coefficients
Now that we understand the dispersion relation for systems, it's easy to understand the dispersion relation for the Schrodinger equation.  Multiply by $-i$ to get
$$\psi_t = -i\psi_{xx} + -iV\psi.$$
Now we can think of this in the same way as a system, where the coefficient matrices have purely imaginary eigenvalues.  Then it's clear that the (even-derivative) terms on the right hand side are both related to wave behavior (i.e., energy is conserved).

## Systems with derivatives of different orders

In the most general case, we have systems of linear PDEs with multiple spatial derivatives
of different order:
$$ \label{gensys}
u_t = \sum_{j=0}^n A_j  \frac{\partial^j u}{\partial x^j}.
$$

Here's a real example from my research.  It comes from homogenization of
the wave equation in a spatially varying medium
(see Equation (5.17) of [this paper](http://faculty.washington.edu/rjl/pubs/solitary/40815.pdf) for
more details).  It's the wave equation plus some second-derivative terms:
$$
u_t = v_x + v_{xx} \\
v_t = u_x - u_{xx}.
$$
You might (if you hadn't read the example above) assume that this system
is dissipative due to the second derivatives.
This system is of the form \\eqref{gensys} with
$$
\begin{align}
A_1 & = \begin{pmatrix}
0 & 1 \\ 1 & 0
\end{pmatrix}
&
A_2 & = \begin{pmatrix}
0 & 1 \\ -1 & 0
\end{pmatrix}.
\end{align}
$$
Of course, $A_1$ has real eigenvalues and leads to wave-like behavior.
But $A_2$ has pure imaginary eigenvalues, so it also leads to wave-like
behavior! The second derivative terms are *dispersive*.  In fact, it's
easy to show that the energy $E=u^2+v^2$ is a conserved quantity for this
system (try it!).

Strictly speaking, Fourier analysis like what we've described can't usually be
applied to \\eqref{gensys} because the matrices $A_j$ will not generally be simultaneously
diagonalizable (though this analysis can still give us intuition for what
each set of terms may do).  Worse yet, the individual matrices may not
be diagonalizable.  Let's illustrate with a simple case.

Returning to the wave equation, let's consider a different way of writing it as a system:
$$
\begin{align*}
u_t & = v \\
v_t & = u_{xx}.
\end{align*}
$$
It's easy to check that this system is equivalent to the wave equation -- but notice that it's composed of parts with only even derivatives! (*reaction* and *diffusion* equations in the terminology of scalar PDEs).  This system is of the form \\eqref{gensys} with
$$
\begin{align}
A_0 & = \begin{pmatrix}
0 & 1 \\ 0 & 0
\end{pmatrix}
&
A_2 & = \begin{pmatrix}
0 & 0 \\ 1 & 0
\end{pmatrix}.
\end{align}
$$
Notice that both eigenvalues of both matrices are equal to zero.
