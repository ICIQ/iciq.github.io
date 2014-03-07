# Dispersion relations

## Scalar equations
Students in any undergraduate PDE course learn that solutions of the heat equation

$$u_t(x,t) = u_{xx}(x,t)$$

diffuse in time whereas solutions of the wave equation

$$u_{tt} = u_{xx}$$

oscillate in time without growing or decaying.  Students may even be introduced to a general approach for the Cauchy problem: given an evolution equation

\begin{align} \label{xyz}
u_t = \sum_{j=0}^n a_j \frac{\partial^j u}{\partial x^j},
\end{align}

one inserts the Fourier mode solution

$$u(x,t) = e^{i(kx - \omega(k) t)}$$

to obtain

$$-i\omega(k) = \sum_{j=0}^n a_j (ik)^j$$

or simply

$$\omega(k) = \sum_{j=0}^n a_j i^{j+1} k^j.$$

The function $\omega(k)$ is often referred to as the *dispersion relation* for the PDE.  Any solution can be expressed as a sum of Fourier modes, and each mode propagates in a manner dictated by the dispersion relation.  It's easy to see that

- If $\omega(k)$ is real, then energy is conserved and each mode simply translates.  This occurs if only odd-numbered spatial derivatives appear in the evolution equation \ref{xyz}.
- If $\omega(k)$ has negative imaginary part, energy decays in time.  This happens if the $a_j$....  The heat equation behaves this way.
- If $\omega(k)$ has positive imaginary part, then the energy will grow exponentially in time.  Obviously, this doesn't generally occur in physical systems.  An example of this behavior is obtained by changing the sign of the right side in the heat equation to get $u_t = - u_{xx}$.  Mathematically, this equation is not well-posed.

What about the wave equation, which has two time derivatives?  Using the same Fourier mode ansatz, one obtains

\begin{align}
\omega^2 & = k^2
\end{align}
or $\omega = \pm k$.  Since $\omega$ is real, energy is conserved.

In the discussion above, we have assumed that $u$ is a scalar and that the coefficients $a_j$ are real.  Many undergraduate courses stop at this point, and students are left with the intuition that **even-numbered derivative terms are diffusive** while **odd-numbered derivative terms are dispersive**.

In practice, we often deal with systems of PDEs and PDEs with complex coefficients, and this intuition is then no longer correct.  There is nothing deep or mysterious about this topic, but it's easy to jump to incorrect conclusions if one is not careful.  To take a common example, consider the time-dependent Schroedinger equation:
$$i \psi_t = \psi_{xx} + V\psi.$$
At first glance, we have on the right side a diffusion term ($\psi_{xx}$) and a reaction term ($V\psi$).  But what about that pesky factor of $i$ (the imaginary unit) on the left hand side?  It's easy to find the answer using the usual ansatz, but let's take a little detour first.

## Systems of equations
Let's turn our attention to the linear system

\begin{align}
u_t = A  \frac{\partial^j u}{\partial x^j},
\end{align}

where $u\in \mathbb{R}^m$ and $A$ is a square real matrix.  
Let $\lambda_m$ and $s_m$ denote the eigenvalues and eigenvectors (respectively) of $A$.
Inserting the Fourier mode solution
$$u(x,t) = s_m e^{i(kx - \omega(k) t)},$$
we obtain
$$\omega(k) = i^{j+1} k^j \lambda_m s_m,$$
and any solution can be written as a superposition of these.  We see now that the behavior of the energy with respect to time depends on both the number $j$ of spatial derivatives and the nature of the eigenvalues of $A$.  For instance, if $j=1$ and $A$ has imaginary eigenvalues, energy is conserved.  We can obtain just such an example by rewriting the wave equation as a first-order system:
\begin{align}
u_t & = v_x \\
v_t & = u_x.
\end{align}
(If you're not familiar with this, just differentiate the first equation w.r.t. $t$ and the second w.r.t. $x$, then equate partial derivatives to get back the second-order wave equation).  We have a linear system with $j=1$ and 
$$ A = \begin{pmatrix}
0 & 1 \\ 1 & 0
\end{pmatrix}.$$
This matrix has eigenvalues $\lambda=\pm 1$, so $\omega(k)$ has zero imaginary part.

This corroborates our intuition from the scalar case: odd-numbered derivatives lead to wave-like behavior.  But notice that if $A$ had imaginary eigenvalues, our intuition would be wrong; for instance, the system
\begin{align}
u_t & = -v_x \\
v_t & = u_x,
\end{align}
corresponding to the second-order equation $u_{tt} = - u_{xx}$ admits unstable solutions.

Returning to the wave equation, let's consider a different way of writing it as a system:
\begin{align}
u_t & = v \\ 
v_t & = u_{xx}.
\end{align}
It's easy to check that this system is equivalent to the wave equation -- but notice that it's composed of parts with only even derivatives! (*reaction* and *diffusion* equations in the terminology of scalar PDEs).  This system is of the more general form
\begin{align}
u_t = \sum_{j=0}^n A_j  \frac{\partial^j u}{\partial x^j},
\end{align}
with
\begin{align}
A_0 & = \begin{pmatrix}
0 & 1 \\ 0 & 0
\end{pmatrix}
&
A_2 & = \begin{pmatrix}
0 & 0 \\ 1 & 0
\end{pmatrix}.
\end{align}
For systems with multiple non-zero coefficient matrices $A_j$, the dispersion relation can be more complicated if the matrices are not simultaneously diagonalizable.

## Scalar problems with complex coefficients
Now that we understand the dispersion relation for systems, it's easy to understand the dispersion relation for the Schrodinger equation.  Multiply by $-i$ to get
$$\psi_t = -i\psi_{xx} + -iV\psi.$$
Now we can think of this in the same way as a system, where the coefficient matrices have purely imaginary eigenvalues.  Then it's clear that the (even-derivative) terms on the right hand side are both related to wave behavior (i.e., energy is conserved).