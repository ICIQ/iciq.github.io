---
title: OU model in Nimble
layout: post
category: ecology
tags:
  - earlywarning
---


Sanity test with a simple model,  Start with some sample data from an OU process:

library(sde)set.seed(123)d <- expression(0.5 * (10-x))s <- expression(1) data <- as.data.frame(sde.sim(X0=6,drift=d, sigma=s, T=20, N=100))sigma.x not provided, attempting symbolic derivation.


plot(data)assets/figures/posts/2014-12-03-ou-model-in-nimble/unnamed-chunk-2-1.pdf

Specify this model in Nimble BUGS code 

ou <- modelCode({
   theta ~ dunif(1e-10, 100.0)
       r ~ dunif(1e-10, 20.0)
   sigma ~ dunif(1e-10, 100)
    x[1] ~ dunif(0, 100)

  for(t in 1:(N-1)){
    mu[t] <- x[t] + r * (theta - x[t]) 
    x[t+1] ~ dnorm(mu[t], sd = sigma) 
  }
})Error in eval(expr, envir, enclos): could not find function "modelCode"



nimble parameters

const <- list(N = length(data$x))ou_inits <- list(theta = 6, r = 1, sigma = 1)

Create, spec, build, & compile

ou_Rmodel <- nimbleModel(code = ou, constants = const, data = data, inits = ou_inits)Error in eval(expr, envir, enclos): could not find function "nimbleModel"
ou_spec <- MCMCspec(ou_Rmodel, thin=1e2)Error in eval(expr, envir, enclos): could not find function "MCMCspec"
ou_Rmcmc <- buildMCMC(ou_spec)Error in eval(expr, envir, enclos): could not find function "buildMCMC"
ou_Cmodel <- compileNimble(ou_Rmodel)Error in eval(expr, envir, enclos): could not find function "compileNimble"
ou_mcmc <- compileNimble(ou_Rmcmc, project = ou_Cmodel)Error in eval(expr, envir, enclos): could not find function "compileNimble"

Run the MCMC

ou_mcmc(1e4)Error in eval(expr, envir, enclos): could not find function "ou_mcmc"


and examine the results

samples <- as.data.frame(as.matrix(nfVar(ou_mcmc, 'mvSamples')))Error in as.matrix(nfVar(ou_mcmc, "mvSamples")): error in evaluating the argument 'x' in selecting a method for function 'as.matrix': Error: could not find function "nfVar"
mean(samples$theta)Error in mean(samples$theta): error in evaluating the argument 'x' in selecting a method for function 'mean': Error: object 'samples' not found
mean(samples$sigma)Error in mean(samples$sigma): error in evaluating the argument 'x' in selecting a method for function 'mean': Error: object 'samples' not found
means(samples$r)Error in eval(expr, envir, enclos): could not find function "means"




plot(samples[ , 'r'], type = 'l', xlab = 'iteration', ylab = expression(r))Error in plot(samples[, "r"], type = "l", xlab = "iteration", ylab = expression(r)): error in evaluating the argument 'x' in selecting a method for function 'plot': Error: object 'samples' not found
plot(samples[ , 'sigma'], type = 'l', xlab = 'iteration', ylab = expression(sigma))Error in plot(samples[, "sigma"], type = "l", xlab = "iteration", ylab = expression(sigma)): error in evaluating the argument 'x' in selecting a method for function 'plot': Error: object 'samples' not found
plot(samples[ , 'theta'], type = 'l', xlab = 'iteration', ylab = expression(theta))Error in plot(samples[, "theta"], type = "l", xlab = "iteration", ylab = expression(theta)): error in evaluating the argument 'x' in selecting a method for function 'plot': Error: object 'samples' not found
plot(samples[ , 'r'], samples[ , 'sigma'], xlab = expression(r), ylab = expression(simga))Error in plot(samples[, "r"], samples[, "sigma"], xlab = expression(r), : error in evaluating the argument 'x' in selecting a method for function 'plot': Error: object 'samples' not found
hist(samples[, 'theta'])Error in hist(samples[, "theta"]): object 'samples' not found


  

### Block sampler ###

ou_spec$addSampler("RW_block", list(targetNodes=c('r','sigma','theta'), adaptInterval=100))Error in eval(expr, envir, enclos): object 'ou_spec' not found
ou_Rmcmc2 <- buildMCMC(ou_spec)Error in eval(expr, envir, enclos): could not find function "buildMCMC"



ou_mcmc2 <- compileNimble(ou_Rmcmc2, project=ou_Rmodel, resetFunctions=TRUE)Error in eval(expr, envir, enclos): could not find function "compileNimble"


(not clear why we use the old project here; but seems to allow us to inherit from previous settings, e.g. the monitors from `mcmcSpec()` initialization)  


ou_mcmc2(1e4)Error in eval(expr, envir, enclos): could not find function "ou_mcmc2"


samples2 <- as.data.frame(as.matrix(nfVar(ou_mcmc2, 'mvSamples')))Error in as.matrix(nfVar(ou_mcmc2, "mvSamples")): error in evaluating the argument 'x' in selecting a method for function 'as.matrix': Error: could not find function "nfVar"
mean(samples2$theta)Error in mean(samples2$theta): error in evaluating the argument 'x' in selecting a method for function 'mean': Error: object 'samples2' not found



plot(samples2[ , 'r'], type = 'l', xlab = 'iteration', ylab = expression(r))Error in plot(samples2[, "r"], type = "l", xlab = "iteration", ylab = expression(r)): error in evaluating the argument 'x' in selecting a method for function 'plot': Error: object 'samples2' not found
plot(samples2[ , 'sigma'], type = 'l', xlab = 'iteration', ylab = expression(sigma))Error in plot(samples2[, "sigma"], type = "l", xlab = "iteration", ylab = expression(sigma)): error in evaluating the argument 'x' in selecting a method for function 'plot': Error: object 'samples2' not found
plot(samples2[ , 'theta'], type = 'l', xlab = 'iteration', ylab = expression(theta))Error in plot(samples2[, "theta"], type = "l", xlab = "iteration", ylab = expression(theta)): error in evaluating the argument 'x' in selecting a method for function 'plot': Error: object 'samples2' not found
plot(samples2[ , 'r'], samples[ , 'sigma'], xlab = expression(r), ylab = expression(simga))Error in plot(samples2[, "r"], samples[, "sigma"], xlab = expression(r), : error in evaluating the argument 'x' in selecting a method for function 'plot': Error: object 'samples2' not found
hist(samples2[ , 'theta'])Error in hist(samples2[, "theta"]): object 'samples2' not found



--------------


