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
pd.options.display.mpl_style = 'default'
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
    workout_pages = mmf.workout.search(user=48155002,per_page=40,cache_finds=True)  # doesn't work if per_page>40

    paces     = []
    distances = []
    dates     = []
    workouts  = []

    for pagenum in workout_pages.page_range:
        workout_list = workout_pages.page(pagenum)

        for i,workout in enumerate(workout_list):
            if verbose:
                print "processing workout " + str(i+1) + " of " + str(len(workout_list))
            if workout_type in workout.activity_type.root_activity_type.name.lower():
                workouts.append(workout)
                distances.append(workout.distance_total/1609.344) # convert meters to miles
                paces.append(26.8224/workout.speed_avg) # convert m/s to minutes per mile
                dates.append(workout.start_datetime)
    return distances, paces, dates, workouts
{% endhighlight %}

Be warned that this function takes a while.  You can set `verbose=1` to have it
update you regularly.

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



As you can see, the workouts are sorted chronologically.  I started training
(and using MapMyFitness) at the beginning of September, about 4 months ago.  At
the time I could only comfortably run 2-3 miles, and my pace was slower than 9
minutes per mile.

# Basic plotting

Now we can easily plot workout distance and pace versus date:

{% highlight python %}
fs = 15
plotargs = {'figsize' : (12,4), 'fontsize' : fs}
df.Distance.plot(title='Workout distance (miles)',lw=2,**plotargs);
{% endhighlight %}


![]({{ site.baseurl}}notebooks/mmf_pandas_files/mmf_pandas_14_0.png)


{% highlight python %}
df.Pace.plot(title='Average pace (minutes per mile)',lw=2,**plotargs);
{% endhighlight %}


![]({{ site.baseurl}}notebooks/mmf_pandas_files/mmf_pandas_15_0.png)


Clearly, I'm running farther and faster as my training program progresses!  My
pace is down to around 8 minutes per mile, and my typical runs are 5 miles or
more.  Here's a histogram of the distances for all my workouts since I started:

{% highlight python %}
df.Distance.plot(kind='hist',title='Workout distance (miles)');
plt.xlabel('Miles'); plt.ylabel('Number of runs');
{% endhighlight %}


![]({{ site.baseurl}}notebooks/mmf_pandas_files/mmf_pandas_17_0.png)


How far have I run in total?  Here's a cumulative distance plot, showing that
I've run more than 200 miles.

{% highlight python %}
df.Distance.cumsum().plot(title='Total workout distance (miles)',lw=2,**plotargs);
{% endhighlight %}


![]({{ site.baseurl}}notebooks/mmf_pandas_files/mmf_pandas_19_0.png)


# Stacked histogram separated by dates

Let's see how my paces in the last two months compare to those in the first two
months.  I suspect Pandas has a better way to do this than what I've implemented
below, but this works...

{% highlight python %}
pace1 = []
pace2 = []

for date,pace in zip(df.index,df['Pace']):
    if date.month<11:
        pace1.append(pace)
        pace2.append(np.nan)
    else:
        pace1.append(np.nan)
        pace2.append(pace)
        
df2 = pd.DataFrame({'First two months pace' : pd.Series(pace1,index=dates), 
                    'Last two months pace' : pd.Series(pace2,index=dates)})
df2.plot(kind='hist',stacked=True,fontsize=fs); plt.ylabel('# of runs');
{% endhighlight %}


![]({{ site.baseurl}}notebooks/mmf_pandas_files/mmf_pandas_22_0.png)


Again, it's clear that my pace has improved.

# Longest runs

Here are my five longest runs:

{% highlight python %}
df.sort('Distance')[-5:][::-1]
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
      <th>2014-12-27 04:39:34+00:00</th>
      <td> 10.28480</td>
      <td> 8.698211</td>
    </tr>
    <tr>
      <th>2014-12-06 04:36:18+00:00</th>
      <td>  9.00748</td>
      <td> 8.506801</td>
    </tr>
    <tr>
      <th>2014-12-13 04:39:00+00:00</th>
      <td>  8.97491</td>
      <td> 8.635715</td>
    </tr>
    <tr>
      <th>2014-11-22 03:09:55+00:00</th>
      <td>  8.47542</td>
      <td> 8.469062</td>
    </tr>
    <tr>
      <th>2014-11-15 03:09:18+00:00</th>
      <td>  7.65717</td>
      <td> 8.535385</td>
    </tr>
  </tbody>
</table>
</div>



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


![]({{ site.baseurl}}notebooks/mmf_pandas_files/mmf_pandas_31_0.png)


The total milage per week:

{% highlight python %}
fig = weekly.Distance['sum'].plot(kind='bar',title='Total miles per week',**plotargs)
fig.set_ylabel('Miles',fontsize=fs);
{% endhighlight %}


![]({{ site.baseurl}}notebooks/mmf_pandas_files/mmf_pandas_33_0.png)


The plot above shows that I have not been terribly consistent, and have missed a
number of workouts due to travel or sickness.  For instance, the second week of
October I was on vacation in Jordan, and the last week of November I was in
Mexico on business.

Or the average mileage per run, by month:

{% highlight python %}
fig = monthly.Distance['mean'].plot(kind='bar',title='Average miles per run',**plotargs)
fig.set_ylabel('Miles',fontsize=fs);
{% endhighlight %}


![]({{ site.baseurl}}notebooks/mmf_pandas_files/mmf_pandas_36_0.png)


# Plotting the routes
MapMyFitness records the actual routes, so we can also plot them.

{% highlight python %}
import mpld3
mpld3.enable_notebook()

plt.figure(figsize=(8,8))

for w in workout_list:
    if w.route is not None:
        points = [(p['lat'],p['lng']) for p in w.route.points()];
        lat, long = zip(*points);
        if min(long)>39:  # Omit workouts in other countries
            plt.plot(long,lat)
{% endhighlight %}



The resulting map was a bit too much for Jekyll to handle, since it
gets embedded as a huge amount of text.  Go check it out in 
[the actual notebook](http://nbviewer.ipython.org/url/www.davidketcheson.info/notebooks/mmf_pandas.ipynb).
The map is zoomable, thanks to mpld3.  You can see
a lot of the roads at KAUST, as well as the running paths around the Gardens and
through Thuwal park on the Island (see the squiggly line on the top left).  The
path to the beacon is also obvious.  The line at the far right goes to the KAUST
stadium, with a partial lap around the track.  You can even see where the road
to the south Beach has moved due to construction.

If you're not familiar with KAUST, just compare the plot above with a [satellite
map](https://www.google.com.sa/maps/@22.3154039,39.1157315,5583m/data=!3m1!1e3?h
l=en).

