---
layout: post
title: Reviewing my marathon training using MapMyFitness and Pandas
tags:
    - python
    - notebook
    - exercise
---


I'm training for a marathon and I use
[MapMyFitness](http://www.mapmyfitness.com/) (MMF) on my iPhone to track my
mileage and pace for each workout.  MMF has a [public
API](https://developer.underarmour.com/) and Jason Sanford has written a [Python
front end for it](https://github.com/JasonSanford/mapmyfitness-python).  Which
means that I can easily get hold of all my data in Python and explore it with
Pandas!  To run this notebook, you'll need:

- A scientific Python stack (I recommend Anaconda)
- A MapMyFitness account and some recorded workout data
- A MapMyFitness API key and access token (go to https://www.mapmyapi.com/io-
docs)

You should also

    pip install mapmyfitness

Here we go...

{% highlight python %}
%matplotlib inline
import pandas as pd
from mapmyfitness import MapMyFitness
import matplotlib.pyplot as plt
import matplotlib
import numpy as np
{% endhighlight %}

The next cell logs into MMF, grabs all my workout data, filters for a specified
activity type (running, in my case), and extracts the date, distance and pace
for each workout.  You'll need to enter your API key and access token to use it.

{% highlight python %}
def get_workouts(verbose=True, workout_type='run'):
    # Log in
    mmf = MapMyFitness(api_key='your-key', \
            access_token='your-token')

    # get all workouts
    workouts = mmf.workout.search(user=48155002,per_page=40)  # doesn't work if per_page>40

    paces = []
    distances = []
    dates = []

    for pagenum in workouts.page_range:
        workout_list = workouts.page(pagenum)

        for i,workout in enumerate(workout_list):
            if verbose:
                print "processing workout " + str(i+1) + " of " + str(len(workout_list))
            if workout_type in workout.activity_type.name.lower():
                distances.append(workout.distance_total/1609.344) # convert meters to miles
                paces.append(26.8224/workout.speed_avg) # convert m/s to minutes per mile
                dates.append(workout.start_datetime)
    return distances, paces, dates, workout_list
{% endhighlight %}

Be warned that this function takes a while; you can set `verbose=1` to have it
update you regularly.  I'm not sure why it's slow -- the downloading is fast,
but the filtering and extracting is slow.

{% highlight python %}
distances, paces, dates, workout_list = get_workouts(verbose=0)
{% endhighlight %}


# Creating a Pandas Dataframe
The basic Pandas object we'll use is a dataframe.  We can create it as follows:

{% highlight python %}
dist_ts = pd.Series(distances,index=dates)
pace_ts = pd.Series(paces,index=dates)
df = pd.DataFrame({'Distance': dist_ts, 'Pace': pace_ts})
{% endhighlight %}

Let's see what's in it.  Rather than printing the whole (long) table, I'll use
`head` to print the first few rows.

{% highlight python %}
df.head()
{% endhighlight %}




<div style="max-height:1000px;max-width:1500px;overflow:auto;">
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Distance</th>
      <th>Pace</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2014-09-02 03:24:23+00:00</th>
      <td> 1.69787</td>
      <td> 9.307203</td>
    </tr>
    <tr>
      <th>2014-09-04 16:49:09+00:00</th>
      <td> 2.05400</td>
      <td> 9.356798</td>
    </tr>
    <tr>
      <th>2014-09-06 18:10:46+00:00</th>
      <td> 2.90366</td>
      <td> 9.370637</td>
    </tr>
    <tr>
      <th>2014-09-08 03:00:49+00:00</th>
      <td> 3.36122</td>
      <td> 9.943686</td>
    </tr>
    <tr>
      <th>2014-09-10 03:02:17+00:00</th>
      <td> 3.09783</td>
      <td> 9.788455</td>
    </tr>
  </tbody>
</table>
</div>



# Basic plotting

Now we can easily plot workout distance and pace versus date:

{% highlight python %}
fs = 15
plotargs = {'figsize' : (12,4), 'fontsize' : fs}
df.Distance.plot(**plotargs);
{% endhighlight %}


![]({{ site.baseurl}}notebooks/mmf_pandas_files/mmf_pandas_13_0.png)


{% highlight python %}
df.Pace.plot(**plotargs);
{% endhighlight %}


![]({{ site.baseurl}}notebooks/mmf_pandas_files/mmf_pandas_14_0.png)


Clearly, I'm running farther and faster as my training program progresses!

How far have I run in total?  Here's a cumulative distance plot, showing that
I've run more than 200 miles.

{% highlight python %}
df.Distance.cumsum().plot(**plotargs);
{% endhighlight %}


![]({{ site.baseurl}}notebooks/mmf_pandas_files/mmf_pandas_17_0.png)


# Longest runs

{% highlight python %}
df.Distance.nlargest(5)
{% endhighlight %}




    2014-12-27 04:39:34+00:00    10.28480
    2014-12-06 04:36:18+00:00     9.00748
    2014-12-13 04:39:00+00:00     8.97491
    2014-11-22 03:09:55+00:00     8.47542
    2014-11-15 03:09:18+00:00     7.65717
    Name: Distance, dtype: float64



# Weekly and monthly data

Next we aggregate data for each week and each month:

{% highlight python %}
weekly  = df.resample('W',how=['mean','sum'],kind='period')
monthly = df.resample('M',how=['mean','sum'],kind='period')
{% endhighlight %}

Now we can plot the average pace for each week:

{% highlight python %}
fig = weekly.Pace['mean'].plot(title='Average pace',**plotargs)
fig.set_ylabel('minutes per mile',fontsize=fs);
{% endhighlight %}


![]({{ site.baseurl}}notebooks/mmf_pandas_files/mmf_pandas_24_0.png)


The total milage per week:

{% highlight python %}
fig = weekly.Distance['sum'].plot(kind='bar',title='Total miles per week',**plotargs)
fig.set_ylabel('Miles',fontsize=fs);
{% endhighlight %}


![]({{ site.baseurl}}notebooks/mmf_pandas_files/mmf_pandas_26_0.png)


The plot above shows that I have not been terribly consistent, and have missed a
number of workouts due to travel or sickness.  For instance, the second week of
October I was on vacation in Jordan, and the last week of November I was in
Mexico on business.

Or the average mileage per run, by month:

{% highlight python %}
fig = monthly.Distance['mean'].plot(kind='bar',title='Average miles per run',**plotargs)
fig.set_ylabel('Miles',fontsize=fs);
{% endhighlight %}


![]({{ site.baseurl}}notebooks/mmf_pandas_files/mmf_pandas_29_0.png)

