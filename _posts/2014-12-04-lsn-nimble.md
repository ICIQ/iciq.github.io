---
layout: post
category: ecology
tags:
  - earlywarning
---





some sample data


```r
library(sde)
library(nimble)
set.seed(123)
d <- expression(0.5 * (10-x))
s <- expression(1) 
data <- as.data.frame(sde.sim(X0=6,drift=d, sigma=s, T=20, N=100))
```

```
sigma.x not provided, attempting symbolic derivation.
```

```r
plot(data)
```

![plot of chunk unnamed-chunk-1](/assets/figures/posts/2014-12-04-lsn-nimble/unnamed-chunk-1-1.svg) 



## LSN version ##

Test case: Set prior for `m` $\approx 0$:


```r
lsn <- modelCode({
   theta ~ dunif(1e-10, 100.0)
   sigma_x ~ dunif(1e-10, 100.0)
   sigma_y ~ dunif(1e-10, 100.0)
       m ~ dunif(-1e2, 1e2)
    x[1] ~ dunif(0, 100)
    y[1] ~ dunif(0, 100) 

  for(i in 1:(N-1)){
    mu_x[i] <- x[i] + y[i] * (theta - x[i]) 
    x[i+1] ~ dnorm(mu_x[i], sd = sigma_x) 
    mu_y[i] <- y[i] + m * t[i]
    y[i+1] ~ dnorm(mu_y[i], sd = sigma_y) 
  }
})
```

Constants in the model definition are the length of the dataset, $N$ and the time points of the sample. Note we've made time explicit, we'll assume uniform spacing here. 


```r
constants <- list(N = length(data$x), t = 1:length(data$x))
```

Initial values for the parameters


```r
inits <- list(theta = 6, m = 0, sigma_x = 1, sigma_y = 1, y = rep(1,constants$N))
```


and here we go as before:


```r
Rmodel <- nimbleModel(code = lsn, 
                      constants = constants, 
                      data = data, 
                      inits = inits)
Cmodel <- compileNimble(Rmodel)
```




```r
mcmcspec <- MCMCspec(Rmodel, print=TRUE,thin=1e2)
```

```
[1] RW sampler;   targetNode: theta,  adaptive: TRUE,  adaptInterval: 200,  scale: 1
[2] RW sampler;   targetNode: sigma_x,  adaptive: TRUE,  adaptInterval: 200,  scale: 1
[3] RW sampler;   targetNode: sigma_y,  adaptive: TRUE,  adaptInterval: 200,  scale: 1
[4] RW sampler;   targetNode: m,  adaptive: TRUE,  adaptInterval: 200,  scale: 1
[5] RW sampler;   targetNode: y[1],  adaptive: TRUE,  adaptInterval: 200,  scale: 1
[6] conjugate_dnorm sampler;   targetNode: y[2],  dependents_dnorm: x[3], y[3]
[7] conjugate_dnorm sampler;   targetNode: y[3],  dependents_dnorm: x[4], y[4]
[8] conjugate_dnorm sampler;   targetNode: y[4],  dependents_dnorm: x[5], y[5]
[9] conjugate_dnorm sampler;   targetNode: y[5],  dependents_dnorm: x[6], y[6]
[10] conjugate_dnorm sampler;   targetNode: y[6],  dependents_dnorm: x[7], y[7]
[11] conjugate_dnorm sampler;   targetNode: y[7],  dependents_dnorm: x[8], y[8]
[12] conjugate_dnorm sampler;   targetNode: y[8],  dependents_dnorm: x[9], y[9]
[13] conjugate_dnorm sampler;   targetNode: y[9],  dependents_dnorm: x[10], y[10]
[14] conjugate_dnorm sampler;   targetNode: y[10],  dependents_dnorm: x[11], y[11]
[15] conjugate_dnorm sampler;   targetNode: y[11],  dependents_dnorm: x[12], y[12]
[16] conjugate_dnorm sampler;   targetNode: y[12],  dependents_dnorm: x[13], y[13]
[17] conjugate_dnorm sampler;   targetNode: y[13],  dependents_dnorm: x[14], y[14]
[18] conjugate_dnorm sampler;   targetNode: y[14],  dependents_dnorm: x[15], y[15]
[19] conjugate_dnorm sampler;   targetNode: y[15],  dependents_dnorm: x[16], y[16]
[20] conjugate_dnorm sampler;   targetNode: y[16],  dependents_dnorm: x[17], y[17]
[21] conjugate_dnorm sampler;   targetNode: y[17],  dependents_dnorm: x[18], y[18]
[22] conjugate_dnorm sampler;   targetNode: y[18],  dependents_dnorm: x[19], y[19]
[23] conjugate_dnorm sampler;   targetNode: y[19],  dependents_dnorm: x[20], y[20]
[24] conjugate_dnorm sampler;   targetNode: y[20],  dependents_dnorm: x[21], y[21]
[25] conjugate_dnorm sampler;   targetNode: y[21],  dependents_dnorm: x[22], y[22]
[26] conjugate_dnorm sampler;   targetNode: y[22],  dependents_dnorm: x[23], y[23]
[27] conjugate_dnorm sampler;   targetNode: y[23],  dependents_dnorm: x[24], y[24]
[28] conjugate_dnorm sampler;   targetNode: y[24],  dependents_dnorm: x[25], y[25]
[29] conjugate_dnorm sampler;   targetNode: y[25],  dependents_dnorm: x[26], y[26]
[30] conjugate_dnorm sampler;   targetNode: y[26],  dependents_dnorm: x[27], y[27]
[31] conjugate_dnorm sampler;   targetNode: y[27],  dependents_dnorm: x[28], y[28]
[32] conjugate_dnorm sampler;   targetNode: y[28],  dependents_dnorm: x[29], y[29]
[33] conjugate_dnorm sampler;   targetNode: y[29],  dependents_dnorm: x[30], y[30]
[34] conjugate_dnorm sampler;   targetNode: y[30],  dependents_dnorm: x[31], y[31]
[35] conjugate_dnorm sampler;   targetNode: y[31],  dependents_dnorm: x[32], y[32]
[36] conjugate_dnorm sampler;   targetNode: y[32],  dependents_dnorm: x[33], y[33]
[37] conjugate_dnorm sampler;   targetNode: y[33],  dependents_dnorm: x[34], y[34]
[38] conjugate_dnorm sampler;   targetNode: y[34],  dependents_dnorm: x[35], y[35]
[39] conjugate_dnorm sampler;   targetNode: y[35],  dependents_dnorm: x[36], y[36]
[40] conjugate_dnorm sampler;   targetNode: y[36],  dependents_dnorm: x[37], y[37]
[41] conjugate_dnorm sampler;   targetNode: y[37],  dependents_dnorm: x[38], y[38]
[42] conjugate_dnorm sampler;   targetNode: y[38],  dependents_dnorm: x[39], y[39]
[43] conjugate_dnorm sampler;   targetNode: y[39],  dependents_dnorm: x[40], y[40]
[44] conjugate_dnorm sampler;   targetNode: y[40],  dependents_dnorm: x[41], y[41]
[45] conjugate_dnorm sampler;   targetNode: y[41],  dependents_dnorm: x[42], y[42]
[46] conjugate_dnorm sampler;   targetNode: y[42],  dependents_dnorm: x[43], y[43]
[47] conjugate_dnorm sampler;   targetNode: y[43],  dependents_dnorm: x[44], y[44]
[48] conjugate_dnorm sampler;   targetNode: y[44],  dependents_dnorm: x[45], y[45]
[49] conjugate_dnorm sampler;   targetNode: y[45],  dependents_dnorm: x[46], y[46]
[50] conjugate_dnorm sampler;   targetNode: y[46],  dependents_dnorm: x[47], y[47]
[51] conjugate_dnorm sampler;   targetNode: y[47],  dependents_dnorm: x[48], y[48]
[52] conjugate_dnorm sampler;   targetNode: y[48],  dependents_dnorm: x[49], y[49]
[53] conjugate_dnorm sampler;   targetNode: y[49],  dependents_dnorm: x[50], y[50]
[54] conjugate_dnorm sampler;   targetNode: y[50],  dependents_dnorm: x[51], y[51]
[55] conjugate_dnorm sampler;   targetNode: y[51],  dependents_dnorm: x[52], y[52]
[56] conjugate_dnorm sampler;   targetNode: y[52],  dependents_dnorm: x[53], y[53]
[57] conjugate_dnorm sampler;   targetNode: y[53],  dependents_dnorm: x[54], y[54]
[58] conjugate_dnorm sampler;   targetNode: y[54],  dependents_dnorm: x[55], y[55]
[59] conjugate_dnorm sampler;   targetNode: y[55],  dependents_dnorm: x[56], y[56]
[60] conjugate_dnorm sampler;   targetNode: y[56],  dependents_dnorm: x[57], y[57]
[61] conjugate_dnorm sampler;   targetNode: y[57],  dependents_dnorm: x[58], y[58]
[62] conjugate_dnorm sampler;   targetNode: y[58],  dependents_dnorm: x[59], y[59]
[63] conjugate_dnorm sampler;   targetNode: y[59],  dependents_dnorm: x[60], y[60]
[64] conjugate_dnorm sampler;   targetNode: y[60],  dependents_dnorm: x[61], y[61]
[65] conjugate_dnorm sampler;   targetNode: y[61],  dependents_dnorm: x[62], y[62]
[66] conjugate_dnorm sampler;   targetNode: y[62],  dependents_dnorm: x[63], y[63]
[67] conjugate_dnorm sampler;   targetNode: y[63],  dependents_dnorm: x[64], y[64]
[68] conjugate_dnorm sampler;   targetNode: y[64],  dependents_dnorm: x[65], y[65]
[69] conjugate_dnorm sampler;   targetNode: y[65],  dependents_dnorm: x[66], y[66]
[70] conjugate_dnorm sampler;   targetNode: y[66],  dependents_dnorm: x[67], y[67]
[71] conjugate_dnorm sampler;   targetNode: y[67],  dependents_dnorm: x[68], y[68]
[72] conjugate_dnorm sampler;   targetNode: y[68],  dependents_dnorm: x[69], y[69]
[73] conjugate_dnorm sampler;   targetNode: y[69],  dependents_dnorm: x[70], y[70]
[74] conjugate_dnorm sampler;   targetNode: y[70],  dependents_dnorm: x[71], y[71]
[75] conjugate_dnorm sampler;   targetNode: y[71],  dependents_dnorm: x[72], y[72]
[76] conjugate_dnorm sampler;   targetNode: y[72],  dependents_dnorm: x[73], y[73]
[77] conjugate_dnorm sampler;   targetNode: y[73],  dependents_dnorm: x[74], y[74]
[78] conjugate_dnorm sampler;   targetNode: y[74],  dependents_dnorm: x[75], y[75]
[79] conjugate_dnorm sampler;   targetNode: y[75],  dependents_dnorm: x[76], y[76]
[80] conjugate_dnorm sampler;   targetNode: y[76],  dependents_dnorm: x[77], y[77]
[81] conjugate_dnorm sampler;   targetNode: y[77],  dependents_dnorm: x[78], y[78]
[82] conjugate_dnorm sampler;   targetNode: y[78],  dependents_dnorm: x[79], y[79]
[83] conjugate_dnorm sampler;   targetNode: y[79],  dependents_dnorm: x[80], y[80]
[84] conjugate_dnorm sampler;   targetNode: y[80],  dependents_dnorm: x[81], y[81]
[85] conjugate_dnorm sampler;   targetNode: y[81],  dependents_dnorm: x[82], y[82]
[86] conjugate_dnorm sampler;   targetNode: y[82],  dependents_dnorm: x[83], y[83]
[87] conjugate_dnorm sampler;   targetNode: y[83],  dependents_dnorm: x[84], y[84]
[88] conjugate_dnorm sampler;   targetNode: y[84],  dependents_dnorm: x[85], y[85]
[89] conjugate_dnorm sampler;   targetNode: y[85],  dependents_dnorm: x[86], y[86]
[90] conjugate_dnorm sampler;   targetNode: y[86],  dependents_dnorm: x[87], y[87]
[91] conjugate_dnorm sampler;   targetNode: y[87],  dependents_dnorm: x[88], y[88]
[92] conjugate_dnorm sampler;   targetNode: y[88],  dependents_dnorm: x[89], y[89]
[93] conjugate_dnorm sampler;   targetNode: y[89],  dependents_dnorm: x[90], y[90]
[94] conjugate_dnorm sampler;   targetNode: y[90],  dependents_dnorm: x[91], y[91]
[95] conjugate_dnorm sampler;   targetNode: y[91],  dependents_dnorm: x[92], y[92]
[96] conjugate_dnorm sampler;   targetNode: y[92],  dependents_dnorm: x[93], y[93]
[97] conjugate_dnorm sampler;   targetNode: y[93],  dependents_dnorm: x[94], y[94]
[98] conjugate_dnorm sampler;   targetNode: y[94],  dependents_dnorm: x[95], y[95]
[99] conjugate_dnorm sampler;   targetNode: y[95],  dependents_dnorm: x[96], y[96]
[100] conjugate_dnorm sampler;   targetNode: y[96],  dependents_dnorm: x[97], y[97]
[101] conjugate_dnorm sampler;   targetNode: y[97],  dependents_dnorm: x[98], y[98]
[102] conjugate_dnorm sampler;   targetNode: y[98],  dependents_dnorm: x[99], y[99]
[103] conjugate_dnorm sampler;   targetNode: y[99],  dependents_dnorm: x[100], y[100]
[104] conjugate_dnorm sampler;   targetNode: y[100],  dependents_dnorm: x[101], y[101]
[105] end sampler;   targetNode: y[101]
```

```r
Rmcmc <- buildMCMC(mcmcspec)
Cmcmc <- compileNimble(Rmcmc, project = Cmodel)
```



```r
Cmcmc(1e4)
```

```
NULL
```


and examine results


```r
samples <- as.data.frame(as.matrix(nfVar(Cmcmc, 'mvSamples')))
dim(samples)
```

```
[1] 100 206
```

```r
samples <- samples[,1:4]
```



```r
mean(samples$theta)
```

```
[1] 10.11174
```

```r
mean(samples$m)
```

```
[1] -1.88765e-05
```

```r
mean(samples$sigma_x)
```

```
[1] 0.385018
```





```r
plot(samples[ , 'm'], type = 'l', xlab = 'iteration', ylab = 'm')
plot(samples[ , 'sigma_x'], type = 'l', xlab = 'iteration', ylab = expression(sigma[x]))
plot(samples[ , 'sigma_y'], type = 'l', xlab = 'iteration', ylab = expression(sigma[y]))
plot(samples[ , 'theta'], type = 'l', xlab = 'iteration', ylab = expression(theta))
```

![plot of chunk unnamed-chunk-10](/assets/figures/posts/2014-12-04-lsn-nimble/unnamed-chunk-10-1.svg) ![plot of chunk unnamed-chunk-10](/assets/figures/posts/2014-12-04-lsn-nimble/unnamed-chunk-10-2.svg) ![plot of chunk unnamed-chunk-10](/assets/figures/posts/2014-12-04-lsn-nimble/unnamed-chunk-10-3.svg) ![plot of chunk unnamed-chunk-10](/assets/figures/posts/2014-12-04-lsn-nimble/unnamed-chunk-10-4.svg) 


```r
hist(samples[, 'm'], xlab = 'm')
hist(samples[, 'sigma_x'], xlab = expression(sigma[x]))
hist(samples[, 'sigma_y'], xlab = expression(sigma[y]))
hist(samples[, 'theta'], xlab = expression(theta))
```

![plot of chunk unnamed-chunk-11](/assets/figures/posts/2014-12-04-lsn-nimble/unnamed-chunk-11-1.svg) ![plot of chunk unnamed-chunk-11](/assets/figures/posts/2014-12-04-lsn-nimble/unnamed-chunk-11-2.svg) ![plot of chunk unnamed-chunk-11](/assets/figures/posts/2014-12-04-lsn-nimble/unnamed-chunk-11-3.svg) ![plot of chunk unnamed-chunk-11](/assets/figures/posts/2014-12-04-lsn-nimble/unnamed-chunk-11-4.svg) 

