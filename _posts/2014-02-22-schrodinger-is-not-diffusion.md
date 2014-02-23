---
layout: post
title: The Schrodinger equation is not a reaction-diffusion equation
name: The Schrodinger equation is not a reaction-diffusion equation
tags: wave-equation
categories: notebook
---

Recently, a stackexchange answer claimed that [the Schrodinger equation is effectively a reaction-diffusion equation](http://scicomp.stackexchange.com/a/10878/123).  I'll set aside semantic arguments about the meaning of "effectively", and give a more obvious example to explain why I think this statement is misleading.

Consider the wave equation

$$u_{tt} = u_{xx}$$

Introducing a new variable $v=u_t$ we can rewrite the wave equation as

$$
\begin{align*}
v_t & = u_{xx} \\
u_t & = v.
\end{align*}
$$

Observe that the first of these equation is the diffusion equation, while the second is a reaction equation.  Thus we have reaction-diffusion!  

Right?

Wrong.  We've disguised the true nature of this equation by applying our intution (which is based on scalar PDEs) to a system of PDEs.  In the same way, the "reaction-diffusion" label for Schrodinger is obtained by applying intuition based on PDEs with real coefficients to a PDE with complex coefficients.
