---
layout:    post
time:      2014-03-11
title:     The PETSc DMDA is not lightweight
subtitle:  (unless Yokozuna is lightweight)
tags:      blog-post petsc pyclaw memory profiling
---

In [this PETSc-users thread](http://lists.mcs.anl.gov/pipermail/petsc-users/2014-January/020018.html), my good friend Matt Knepley claims that the
DMDA object is lightweight, and suggests that it is okay to make them willy-
nilly.  Unfortunately, my experience indicates otherwise.  But words are cheap;
let's investigate.


    %load_ext memory_profiler

### Memory profiling with `memory_profiler`

I've written a little script that just creates a DA and 3 vecs.  In order to
make use of `memory_profiler`, I'll call it with system commands.  But I've
pasted the contents here for completeness.  If you're running the notebook, you
don't need to run the next cell.

```python
# contents of da.py
from petsc4py import PETSc
import sys

@profile
def foo(size=128,ndim=3,dof=1):
    da = PETSc.DA().create(sizes=[size]*ndim,dof=dof)
    q1 = da.createGlobalVec()
    q2 = da.createGlobalVec()
    q3 = da.createGlobalVec()

if __name__ == '__main__':
    foo(int(sys.argv[1]),int(sys.argv[2]),int(sys.argv[3]))
```

Notice that the command line arguments are

1. The size of the grid
2. The number of dimensions
3. The number of DOFs

Now let's run some tests.

### The cost of a DA


    !python -m memory_profiler da.py 128 3 1

    Filename: da.py
    
    Line #    Mem usage    Increment   Line Contents
    ================================================
         4   23.473 MiB    0.000 MiB   @profile
         5                             def foo(size=128,ndim=3,dof=1):
         6   72.395 MiB   48.922 MiB       da = PETSc.DA().create([size]*ndim,dof)
         7   72.480 MiB    0.086 MiB       q1 = da.createGlobalVec()
         8   88.484 MiB   16.004 MiB       q2 = da.createGlobalVec()
         9  104.488 MiB   16.004 MiB       q3 = da.createGlobalVec()
    
    


The third column ("increment") is the key here -- it shows the increase in total
memory usage after executing each line.

The first thing you notice is that the DA is NOT lightweight.  It takes as much
memory as 3 Vecs!  But that will look cheap in a moment.

Notice also that the first vec seems to use no memory.  I think this is because
memory_profiler just tracks peak usage, and the DA creation creates and destroys
a vec.

In what follows, I've used sed to extract just the essential lines of the
output.

Let's try that again, with 2 DOFs.


    !python -m memory_profiler da.py 128 3 2 / | sed -n -e 7p -e 10p

         6  296.215 MiB  272.945 MiB       da = PETSc.DA().create([size]*ndim,dof)
         9  328.309 MiB   32.004 MiB       q3 = da.createGlobalVec()


Whoa!  Now the DA is 8.5 times as large as a Vec!

As expected, the Vec is just twice as large.  What if we keep increasing the
number of DOFs?


    !python -m memory_profiler da.py 128 3 3 / | sed -n -e 7p -e 10p
    !python -m memory_profiler da.py 128 3 4 / | sed -n -e 7p -e 10p

         6  408.219 MiB  384.949 MiB       da = PETSc.DA().create([size]*ndim,dof)
         9  504.316 MiB   48.004 MiB       q3 = da.createGlobalVec()
         6  520.219 MiB  496.949 MiB       da = PETSc.DA().create([size]*ndim,dof)
         9  648.316 MiB   64.004 MiB       q3 = da.createGlobalVec()


It's clear that each additional DOF increases the size of the DA by 112 MB.
That's more than double the size of the whole DA we had with dof=1.  And the
size of the Vec only increases (appropriately) by 16 MB.  So for large numbers
of DOFs, the DA will be as large as 7 Vecs.

### 2D and 1D results

The same phenomenon is evident in two dimensions:


    !python -m memory_profiler da.py 1024 2 1 / | sed -n -e 7p -e 10p
    !python -m memory_profiler da.py 1024 2 2 / | sed -n -e 7p -e 10p
    !python -m memory_profiler da.py 1024 2 3 / | sed -n -e 7p -e 10p

         6   48.371 MiB   24.895 MiB       da = PETSc.DA().create([size]*ndim,dof)
         9   64.469 MiB    8.004 MiB       q3 = da.createGlobalVec()
         6  160.398 MiB  136.922 MiB       da = PETSc.DA().create([size]*ndim,dof)
         9  176.492 MiB   16.004 MiB       q3 = da.createGlobalVec()
         6  216.402 MiB  192.926 MiB       da = PETSc.DA().create([size]*ndim,dof)
         9  264.500 MiB   24.004 MiB       q3 = da.createGlobalVec()


Again we see that:

- The 1-DOF DA costs 3 Vecs
- The 2-DOF DA costs about 8.5 Vecs
- Asymptotically, a DA with many DOFs costs 7 Vecs

What about 1D?


    !python -m memory_profiler da.py 1000000 1 1 / | sed -n -e 7p -e 10p
    !python -m memory_profiler da.py 1000000 1 2 / | sed -n -e 7p -e 10p
    !python -m memory_profiler da.py 1000000 1 3 / | sed -n -e 7p -e 10p

         6   47.164 MiB   23.688 MiB       da = PETSc.DA().create([size]*ndim,dof)
         9   70.168 MiB    7.648 MiB       q3 = da.createGlobalVec()
         6   77.684 MiB   54.207 MiB       da = PETSc.DA().create([size]*ndim,dof)
         9  123.582 MiB   15.285 MiB       q3 = da.createGlobalVec()
         6  100.570 MiB   77.094 MiB       da = PETSc.DA().create([size]*ndim,dof)
         9  169.355 MiB   22.914 MiB       q3 = da.createGlobalVec()


These results are relatively sane: regardless of the number of DOFs, the ratio
is 3-3.5.

### Conclusion

So DAs are not lightweight.  They cost as much as 3-8.5 Vecs, and their cost
increases with the number of DOFs.  It is not clear to me *a priori* why their
cost should even depend on the number of DOFs.

In PyClaw, this means that the DAs always occupy much more memory than the Vecs
themselves!  This is becoming a serious bottleneck for our current 3D
simulations on Shaheen.
