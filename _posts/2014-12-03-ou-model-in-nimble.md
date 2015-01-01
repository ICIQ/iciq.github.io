---
title: OU model in Nimble
layout: post
category: ecology
tags:
  - earlywarning
---


Sanity test with a simple model,  Start with some sample data from an OU process:


```r
library("sde")
library("nimble")
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

![plot of chunk unnamed-chunk-2](/assets/figures/posts/2014-12-03-ou-model-in-nimble/unnamed-chunk-2-1.png) 

Specify this model in Nimble BUGS code 


```r
ou <- modelCode({
   theta ~ dunif(1e-10, 100.0)
       r ~ dunif(1e-10, 20.0)
   sigma ~ dunif(1e-10, 100)
    x[1] ~ dunif(0, 100)

  for(t in 1:(N-1)){
    mu[t] <- x[t] + r * (theta - x[t]) 
    x[t+1] ~ dnorm(mu[t], sd = sigma) 
  }
})
```


nimble parameters


```r
const <- list(N = length(data$x))
ou_inits <- list(theta = 6, r = 1, sigma = 1)
```

Create, spec, build, & compile


```r
ou_Rmodel <- nimbleModel(code = ou, constants = const, data = data, inits = ou_inits)
ou_spec <- MCMCspec(ou_Rmodel, thin=1e2)
ou_Rmcmc <- buildMCMC(ou_spec)
ou_Cmodel <- compileNimble(ou_Rmodel)
ou_mcmc <- compileNimble(ou_Rmcmc, project = ou_Cmodel)
```
Run the MCMC


```r
ou_mcmc(1e4)
```

```
NULL
```

and examine the results


```r
samples <- as.data.frame(as.matrix(nfVar(ou_mcmc, 'mvSamples')))
mean(samples$theta)
```

```
[1] 10.47953
```

```r
mean(samples$sigma)
```

```
[1] 0.392594
```

```r
means(samples$r)
```

```
Error in eval(expr, envir, enclos): could not find function "means"
```




```r
plot(samples[ , 'r'], type = 'l', xlab = 'iteration', ylab = expression(r))
plot(samples[ , 'sigma'], type = 'l', xlab = 'iteration', ylab = expression(sigma))
plot(samples[ , 'theta'], type = 'l', xlab = 'iteration', ylab = expression(theta))
plot(samples[ , 'r'], samples[ , 'sigma'], xlab = expression(r), ylab = expression(simga))
hist(samples[, 'theta'])
```

![plot of chunk unnamed-chunk-8](/assets/figures/posts/2014-12-03-ou-model-in-nimble/unnamed-chunk-8-1.png) ![plot of chunk unnamed-chunk-8](/assets/figures/posts/2014-12-03-ou-model-in-nimble/unnamed-chunk-8-2.png) ![plot of chunk unnamed-chunk-8](/assets/figures/posts/2014-12-03-ou-model-in-nimble/unnamed-chunk-8-3.png) ![plot of chunk unnamed-chunk-8](/assets/figures/posts/2014-12-03-ou-model-in-nimble/unnamed-chunk-8-4.png) ![plot of chunk unnamed-chunk-8](/assets/figures/posts/2014-12-03-ou-model-in-nimble/unnamed-chunk-8-5.png) 

  

### Block sampler ###


```r
ou_spec$addSampler("RW_block", list(targetNodes=c('r','sigma','theta'), adaptInterval=100))
```

```
[4] RW_block sampler;   targetNodes: r, sigma, theta,  adaptive: TRUE,  adaptInterval: 100,  scale: 1,  propCov: identity
```

```r
ou_Rmcmc2 <- buildMCMC(ou_spec)
```



```r
ou_mcmc2 <- compileNimble(ou_Rmcmc2, project=ou_Rmodel, resetFunctions=TRUE)
```

(not clear why we use the old project here; but seems to allow us to inherit from previous settings, e.g. the monitors from `mcmcSpec()` initialization)  



```r
ou_mcmc2(1e4)
```

```
NULL
```


```r
samples2 <- as.data.frame(as.matrix(nfVar(ou_mcmc2, 'mvSamples')))
mean(samples2$theta)
```

```
[1] 10.46894
```



```r
plot(samples2[ , 'r'], type = 'l', xlab = 'iteration', ylab = expression(r))
plot(samples2[ , 'sigma'], type = 'l', xlab = 'iteration', ylab = expression(sigma))
plot(samples2[ , 'theta'], type = 'l', xlab = 'iteration', ylab = expression(theta))
plot(samples2[ , 'r'], samples[ , 'sigma'], xlab = expression(r), ylab = expression(simga))
hist(samples2[ , 'theta'])
```

![plot of chunk unnamed-chunk-13](/assets/figures/posts/2014-12-03-ou-model-in-nimble/unnamed-chunk-13-1.png) ![plot of chunk unnamed-chunk-13](/assets/figures/posts/2014-12-03-ou-model-in-nimble/unnamed-chunk-13-2.png) ![plot of chunk unnamed-chunk-13](/assets/figures/posts/2014-12-03-ou-model-in-nimble/unnamed-chunk-13-3.png) ![plot of chunk unnamed-chunk-13](/assets/figures/posts/2014-12-03-ou-model-in-nimble/unnamed-chunk-13-4.png) ![plot of chunk unnamed-chunk-13](/assets/figures/posts/2014-12-03-ou-model-in-nimble/unnamed-chunk-13-5.png) 


--------------


