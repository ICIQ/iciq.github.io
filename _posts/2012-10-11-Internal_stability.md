---
layout: post
time: 2012-10-11
title:  Internal stability of Runge-Kutta methods
subtitle: Some experiments in NodePy
tags:   numerical-analysis Runge-Kutta-methods stability roundoff SSP
categories: notebook
---
Note: this post was generated from an iPython notebook.  You can [download the
notebook from github](https://github.com/ketch/nodepy/blob/master/examples/Internal_stability.ipynb) and execute all the code yourself.
This post was originally written by [David Ketcheson](http://www.davidketcheson.info/2012/10/11/Internal_stability.html).

Internal stability deals with the growth of errors (such as roundoff) introduced at the Runge-Kutta stages during a single Runge-Kutta step.  It is usually important only for methods with a large number of stages, since that is when the internal amplification factors can be large.  An excellent explanation of internal stability is given in [this paper](http://oai.cwi.nl/oai/asset/1652/1652A.pdf).  Here we demonstrate some tools for studying internal stability in NodePy.

First, let's load a couple of RK methods:

<div class="highlight"><pre><span class="kn">from</span> <span class="nn">nodepy</span> <span class="kn">import</span> <span class="n">rk</span>
<span class="nb">reload</span><span class="p">(</span><span class="n">rk</span><span class="p">)</span>
<span class="n">rk4</span> <span class="o">=</span> <span class="n">rk</span><span class="o">.</span><span class="n">loadRKM</span><span class="p">(</span><span class="s">&#39;RK44&#39;</span><span class="p">)</span>
<span class="n">ssprk4</span> <span class="o">=</span> <span class="n">rk</span><span class="o">.</span><span class="n">loadRKM</span><span class="p">(</span><span class="s">&#39;SSP104&#39;</span><span class="p">)</span>
<span class="k">print</span> <span class="n">rk4</span>
<span class="k">print</span> <span class="n">ssprk4</span>
</pre></div>


    Classical RK4
    The original four-stage, fourth-order method of Kutta
     0   |
     1/2 |  1/2
     1/2 |  0    1/2
     1   |  0    0    1
    _____|____________________
         |  1/6  1/3  1/3  1/6
    SSPRK(10,4)
    The optimal ten-stage, fourth order SSP Runge-Kutta method
     0   |
     1/6 |  1/6
     1/3 |  1/6   1/6
     1/2 |  1/6   1/6   1/6
     2/3 |  1/6   1/6   1/6   1/6
     1/3 |  1/15  1/15  1/15  1/15  1/15
     1/2 |  1/15  1/15  1/15  1/15  1/15  1/6
     2/3 |  1/15  1/15  1/15  1/15  1/15  1/6   1/6
     5/6 |  1/15  1/15  1/15  1/15  1/15  1/6   1/6   1/6
     1   |  1/15  1/15  1/15  1/15  1/15  1/6   1/6   1/6   1/6
    _____|____________________________________________________________
         |  1/10  1/10  1/10  1/10  1/10  1/10  1/10  1/10  1/10  1/10


## Absolute stability regions

First we can use NodePy to plot the region of absolute stability for each method.  The absolute stability region is the set

<center>$\\{ z \in C : |\phi (z)|\le 1 \\}$</center>

where $\phi(z)$ is the *stability function* of the method:

<center>$1 + z b^T (I-zA)^{-1}$</center>

If we solve $u'(t) = \lambda u$ with a given method, then $z=\lambda \Delta t$ must lie inside this region or the computation will be unstable.

<div class="highlight"><pre><span class="n">p</span><span class="p">,</span><span class="n">q</span> <span class="o">=</span> <span class="n">rk4</span><span class="o">.</span><span class="n">stability_function</span><span class="p">()</span>
<span class="k">print</span> <span class="n">p</span>
<span class="n">h1</span><span class="o">=</span><span class="n">rk4</span><span class="o">.</span><span class="n">plot_stability_region</span><span class="p">()</span>
</pre></div>


             4          3       2
    0.04167 x + 0.1667 x + 0.5 x + 1 x + 1


![](https://dl.dropbox.com/u/656693/jekyll_images/Internal_stability_files/Internal_stability_fig_00.png)


<div class="highlight"><pre><span class="n">p</span><span class="p">,</span><span class="n">q</span> <span class="o">=</span> <span class="n">ssprk4</span><span class="o">.</span><span class="n">stability_function</span><span class="p">()</span>
<span class="k">print</span> <span class="n">p</span>
<span class="n">h2</span><span class="o">=</span><span class="n">ssprk4</span><span class="o">.</span><span class="n">plot_stability_region</span><span class="p">()</span>
</pre></div>


               10             9            8             7           6
    3.969e-09 x  + 2.381e-07 x + 6.43e-06 x + 0.0001029 x + 0.00108 x
                5           4          3       2
     + 0.00787 x + 0.04167 x + 0.1667 x + 0.5 x + 1 x + 1


![](https://dl.dropbox.com/u/656693/jekyll_images/Internal_stability_files/Internal_stability_fig_01.png)


# Internal stability

The stability function tells us by how much errors from one step are amplified in the next one.  This is important since we introduce truncation errors at every step.  However, we also introduce roundoff errors at the each stage within a step.  Internal stability tells us about the growth of those.  Internal stability is typically less important than (step-by-step) absolute stability for two reasons:

 - Roundoff errors are typically much smaller than truncation errors, so moderate amplification of them typically is not significant
 - Although the propagation of stage errors within a step is governed by internal stability functions, in later steps these errors are propagated according to the (principal) stability function

Nevertheless, in methods with many stages, internal stability can play a key role.

Questions: *In the solution of PDEs, large spatial truncation errors enter at each stage.  Does this mean internal stability becomes more significant?  How does this relate to stiff accuracy analysis and order reduction?*

## Internal stability functions

We can write the equations of a Runge-Kutta method compactly as

<center>$y = u^n e + h A F(y)$</center>

<center>$u^{n+1} = u^n + h b^T F(y),$</center>

where $y$ is the vector of stage values, $u^n$ is the previous step solution, $e$ is a vector with all entries equal to 1, $h$ is the step size, $A$ and $b$ are the coefficients in the Butcher tableau, and $F(y)$ is the vector of stage derivatives.  In floating point arithmetic, roundoff errors will be made at each stage.  Representing these errors by a vector $r$, we have

<center>$y = u^n e + h A F(y) + r.$</center>

Considering the test problem $F(y)=\lambda y$ and solving for $y$ gives

<center>$y = u^n (I-zA)^{-1}e + (I-zA)^{-1}r,$</center>

where $z=h\lambda$.  Substituting this result in the equation for $u^{n+1}$ gives

<center>$u^{n+1} = u^n (1 + zb^T(I-zA)^{-1}e) + zb^T(I-zA)^{-1}r = \psi(z) u^n + \theta(z)^T r.$</center>

Here $\psi(z)$ is the *stability function* of the method, that we already encountered above.  Meanwhile, the vector $\theta(z)$ contains the *internal stability functions* that govern the amplification of roundoff errors $r$ within a step:

<center>$\theta(z) = z b^T (I-zA)^{-1}.$</center>

Let's compute $\theta$ for the classical RK4 method:

<div class="highlight"><pre><span class="n">theta</span><span class="o">=</span><span class="n">rk4</span><span class="o">.</span><span class="n">internal_stability_polynomials</span><span class="p">()</span>
<span class="n">theta</span>
</pre></div>


<pre>
    [poly1d([1/24, 1/12, 1/6, 1/6, 0], dtype=object),
     poly1d([1/12, 1/6, 1/3, 0], dtype=object),
     poly1d([1/6, 1/3, 0], dtype=object),
     poly1d([1/6, 0], dtype=object)]
</pre>


<div class="highlight"><pre><span class="k">for</span> <span class="n">theta_j</span> <span class="ow">in</span> <span class="n">theta</span><span class="p">:</span>
    <span class="k">print</span> <span class="n">theta_j</span>
</pre></div>


             4           3          2
    0.04167 x + 0.08333 x + 0.1667 x + 0.1667 x
             3          2
    0.08333 x + 0.1667 x + 0.3333 x
            2
    0.1667 x + 0.3333 x

    0.1667 x


Thus the roundoff errors in the first stage are amplified by a factor $z^4/24 + z^3/12 + z^2/6 + z/6$, while the errors in the last stage are amplified by a factor $z/6$.

## Internal instability

Usually internal stability is unimportant since it relates to amplification of roundoff errors, which are very small.  Let's think about when things can go wrong in terms of internal instability.  If $|\theta(z)|$ is of the order $1/\epsilon_{machine}$, then roundoff errors could be amplified so much that they destroy the accuracy of the computation.  More specifically, we should be concerned if $|\theta(z)|$ is of the order $tol/\epsilon_{machine}$ where $tol$ is our desired error tolerance.  Of course, we only care about values of $z$ that lie inside the absolute stability region $S$, since internal stability won't matter if the computation is not absolutely stable.

We can get some idea about the amplification of stage errors by plotting the curves $|\theta(z)|=1$ along with the stability region.  Ideally these curves will all lie outside the stability region, so that all stage errors are damped.

<div class="highlight"><pre><span class="n">rk4</span><span class="o">.</span><span class="n">internal_stability_plot</span><span class="p">()</span>
</pre></div>



![](https://dl.dropbox.com/u/656693/jekyll_images/Internal_stability_files/Internal_stability_fig_02.png)


<div class="highlight"><pre><span class="n">ssprk4</span><span class="o">.</span><span class="n">internal_stability_plot</span><span class="p">()</span>
</pre></div>



![](https://dl.dropbox.com/u/656693/jekyll_images/Internal_stability_files/Internal_stability_fig_03.png)


For both methods, we see that some of the curves intersect the absolute stability region, so some stage errors are amplified.  But by how much?  We'd really like to know the maximum amplification of the stage errors under the condition of absolute stability.  We therefore define the *maximum internal amplification factor* $M$:

<center>$M = \max_j \max_{z \in S} |\theta_j(z)|$</center>

<div class="highlight"><pre><span class="k">print</span> <span class="n">rk4</span><span class="o">.</span><span class="n">maximum_internal_amplification</span><span class="p">()</span>
<span class="k">print</span> <span class="n">ssprk4</span><span class="o">.</span><span class="n">maximum_internal_amplification</span><span class="p">()</span>
</pre></div>


    2.15239281554
    4.04399941143



We see that both methods have small internal amplification factors, so internal stability is not a concern in either case.  This is not surprising for the method with only four stages; it is a surprisingly good property of the method with ten stages.

Questions: *Do SSP RK methods always (necessarily) have small amplification factors?  Can we prove it?*

Now let's look at some methods with many stages.

## Runge-Kutta Chebyshev methods

The paper of Verwer, Hundsdorfer, and Sommeijer deals with RKC methods, which can have very many stages.  The construction of these methods is implemented in NodePy, so let's take a look at them.  The functions `RKC1(s)` and `RKC2(s)` construct RKC methods of order 1 and 2, respectively, with $s$ stages.

<div class="highlight"><pre><span class="n">s</span><span class="o">=</span><span class="mi">4</span>
<span class="n">rkc</span> <span class="o">=</span> <span class="n">rk</span><span class="o">.</span><span class="n">RKC1</span><span class="p">(</span><span class="n">s</span><span class="p">)</span>
<span class="k">print</span> <span class="n">rkc</span>
</pre></div>


    RKC41

     0    |
     1/16 |  1/16
     1/4  |  1/8   1/8
     9/16 |  3/16  1/4   1/8
    ______|________________________
          |   1/4   3/8   1/4   1/8


<div class="highlight"><pre><span class="n">rkc</span><span class="o">.</span><span class="n">internal_stability_plot</span><span class="p">()</span>
</pre></div>



![](https://dl.dropbox.com/u/656693/jekyll_images/Internal_stability_files/Internal_stability_fig_04.png)


It looks like there could be some significant internal amplification here.  Let's see:

<div class="highlight"><pre><span class="n">rkc</span><span class="o">.</span><span class="n">maximum_internal_amplification</span><span class="p">()</span>
</pre></div>


<pre>
    11.760869405962685
</pre>


Nothing catastrophic.  Let's try a larger value of $s$:

<div class="highlight"><pre><span class="n">s</span><span class="o">=</span><span class="mi">20</span>
<span class="n">rkc</span> <span class="o">=</span> <span class="n">rk</span><span class="o">.</span><span class="n">RKC1</span><span class="p">(</span><span class="n">s</span><span class="p">)</span>
<span class="n">rkc</span><span class="o">.</span><span class="n">maximum_internal_amplification</span><span class="p">()</span>
</pre></div>


<pre>
    42.665327220219126
</pre>


As promised, these methods seem to have good internal stability properties.  What about the second-order methods?

<div class="highlight"><pre><span class="n">s</span><span class="o">=</span><span class="mi">20</span>
<span class="n">rkc</span> <span class="o">=</span> <span class="n">rk</span><span class="o">.</span><span class="n">RKC2</span><span class="p">(</span><span class="n">s</span><span class="p">)</span>
<span class="n">rkc</span><span class="o">.</span><span class="n">maximum_internal_amplification</span><span class="p">()</span>
</pre></div>


<pre>
    106.69110992619214
</pre>


Again, nothing catastrophic.  We could take $s$ much larger than 20, but the calculations get to be rather slow (in Python) and since we're using floating point arithmetic, the accuracy deteriorates.

Remark: *we could do the calculations in exact arithmetic using Sympy, but things would get even slower.  Perhaps there are some optimizations that could be done to speed this up.  Or perhaps we should use Mathematica if we need to do this kind of thing.*

Remark 2: *of course, for the RKC methods the internal stability polynomials are shifted Chebyshev polynomials.  So we could evaluate them directly in a stable manner using the three-term recurrence (or perhaps scipy's special functions library).  This would also be a nice check on the calculations above.*

## Other methods with many stages

Three other classes of methods with many stages have been implemented in NodePy:

 - SSP families
 - Integral deferred correction (IDC) methods
 - Extrapolation methods

### SSP Families

<div class="highlight"><pre><span class="n">s</span><span class="o">=</span><span class="mi">20</span>
<span class="n">ssprk</span> <span class="o">=</span> <span class="n">rk</span><span class="o">.</span><span class="n">SSPRK2</span><span class="p">(</span><span class="n">s</span><span class="p">)</span>
<span class="n">ssprk</span><span class="o">.</span><span class="n">internal_stability_plot</span><span class="p">()</span>
<span class="n">ssprk</span><span class="o">.</span><span class="n">maximum_internal_amplification</span><span class="p">()</span>
</pre></div>


<pre>
    2.0212921484995547
</pre>


![](https://dl.dropbox.com/u/656693/jekyll_images/Internal_stability_files/Internal_stability_fig_05.png)


<div class="highlight"><pre><span class="n">s</span><span class="o">=</span><span class="mi">25</span> <span class="c"># # of stages</span>
<span class="n">ssprk</span> <span class="o">=</span> <span class="n">rk</span><span class="o">.</span><span class="n">SSPRK3</span><span class="p">(</span><span class="n">s</span><span class="p">)</span>
<span class="n">ssprk</span><span class="o">.</span><span class="n">internal_stability_plot</span><span class="p">()</span>
<span class="n">ssprk</span><span class="o">.</span><span class="n">maximum_internal_amplification</span><span class="p">()</span>
</pre></div>


<pre>
    3.8049237837215397
</pre>


![](https://dl.dropbox.com/u/656693/jekyll_images/Internal_stability_files/Internal_stability_fig_06.png)


The SSP methods seem to have excellent internal stability properties.

### IDC methods

<div class="highlight"><pre><span class="n">p</span><span class="o">=</span><span class="mi">6</span> <span class="c">#order</span>
<span class="n">idc</span> <span class="o">=</span> <span class="n">rk</span><span class="o">.</span><span class="n">DC</span><span class="p">(</span><span class="n">p</span><span class="o">-</span><span class="mi">1</span><span class="p">)</span>
<span class="k">print</span> <span class="nb">len</span><span class="p">(</span><span class="n">idc</span><span class="p">)</span>
<span class="n">idc</span><span class="o">.</span><span class="n">internal_stability_plot</span><span class="p">()</span>
<span class="n">idc</span><span class="o">.</span><span class="n">maximum_internal_amplification</span><span class="p">()</span>
</pre></div>


    26

<pre>
    6.4140166271998815
</pre>


![](https://dl.dropbox.com/u/656693/jekyll_images/Internal_stability_files/Internal_stability_fig_07.png)


IDC methods also seem to have excellent internal stability.

### Extrapolation methods

<div class="highlight"><pre><span class="n">p</span><span class="o">=</span><span class="mi">6</span> <span class="c">#order</span>
<span class="n">ex</span> <span class="o">=</span> <span class="n">rk</span><span class="o">.</span><span class="n">extrap</span><span class="p">(</span><span class="n">p</span><span class="p">)</span>
<span class="k">print</span> <span class="nb">len</span><span class="p">(</span><span class="n">ex</span><span class="p">)</span>
<span class="n">ex</span><span class="o">.</span><span class="n">internal_stability_plot</span><span class="p">()</span>
<span class="n">ex</span><span class="o">.</span><span class="n">maximum_internal_amplification</span><span class="p">()</span>
</pre></div>


    16
    6



![](https://dl.dropbox.com/u/656693/jekyll_images/Internal_stability_files/Internal_stability_fig_08.png)


Not so good.  Let's try a method with even more stages (this next computation will take a while; go stretch your legs).

<div class="highlight"><pre><span class="n">p</span><span class="o">=</span><span class="mi">10</span> <span class="c">#order</span>
<span class="n">ex</span> <span class="o">=</span> <span class="n">rk</span><span class="o">.</span><span class="n">extrap</span><span class="p">(</span><span class="n">p</span><span class="p">)</span>
<span class="k">print</span> <span class="nb">len</span><span class="p">(</span><span class="n">ex</span><span class="p">)</span>
<span class="n">ex</span><span class="o">.</span><span class="n">maximum_internal_amplification</span><span class="p">()</span>
</pre></div>


    46

<pre>
    28073.244376758907
</pre>


Now we're starting to see something that might cause trouble, especially since such high order extrapolation methods are usually used when extremely tight error tolerances are required.  Internal amplification will cause a loss of about 5 digits of accuracy here, so the best we can hope for is about 10 digits of accuracy in double precision.  Higher order extrapolation methods will make things even worse.  How large are their amplification factors?  (Really long calculation here...)

<div class="highlight"><pre><span class="n">pmax</span> <span class="o">=</span> <span class="mi">12</span>
<span class="n">ampfac</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">zeros</span><span class="p">(</span><span class="n">pmax</span><span class="o">+</span><span class="mi">1</span><span class="p">)</span>
<span class="k">for</span> <span class="n">p</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span><span class="n">pmax</span><span class="o">+</span><span class="mi">1</span><span class="p">):</span>
    <span class="n">ex</span> <span class="o">=</span> <span class="n">rk</span><span class="o">.</span><span class="n">extrap</span><span class="p">(</span><span class="n">p</span><span class="p">)</span>
    <span class="n">ampfac</span><span class="p">[</span><span class="n">p</span><span class="p">]</span> <span class="o">=</span> <span class="n">ex</span><span class="o">.</span><span class="n">maximum_internal_amplification</span><span class="p">()</span>
    <span class="k">print</span> <span class="n">p</span><span class="p">,</span> <span class="n">ampfac</span><span class="p">[</span><span class="n">p</span><span class="p">]</span>
</pre></div>


    1 1.99777378912
    2 2.40329384375
    3
     5.07204078733
    4
     17.747335803
    5
     69.62805786
    6
     97.6097450835
    7
     346.277441462
    8
     1467.40356089
    9
     6344.16303534
    10
     28073.2443768
    11
     126011.586473
    12
     169897.662582

<pre>
    [<matplotlib.lines.Line2D at 0x2611bbe10>]
</pre>


![](https://dl.dropbox.com/u/656693/jekyll_images/Internal_stability_files/Internal_stability_fig_09.png)


<div class="highlight"><pre><span class="n">semilogy</span><span class="p">(</span><span class="n">ampfac</span><span class="p">,</span><span class="n">linewidth</span><span class="o">=</span><span class="mi">3</span><span class="p">)</span>
</pre></div>


<pre>
    [<matplotlib.lines.Line2D at 0x2611a6710>]
</pre>


![](https://dl.dropbox.com/u/656693/jekyll_images/Internal_stability_files/Internal_stability_fig_10.png)


We see roughly geometric growth of the internal amplification factor as a function of the order $p$.  It seems clear that very high order extrapolation methods applied to problems with high accuracy requirements will fall victim to internal stability issues.
