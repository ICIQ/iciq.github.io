---
layout: post
title: How and why I'm teaching my kids to code
subtitle:  A matter of literacy
tags: programming education python
categories: blog-post
---

I think that most of the world today drastically underestimates kids -- and by
so doing, often harms them.  Kids love learning, creating, and achieving.  We
do them no service by providing everything for them, or by "protecting" them
from challenging tasks.  This troubling trend is manifest across the physical,
social, and mental aspects of life.  But today I want to focus on one thing to
which I think we should introduce kids earlier and oftener: programming.

# Why programming?

In my childrens' school (which I consider to be quite good), students are
introduced to computers early on.  But this introduction focuses on things
like preparing a PowerPoint presentation, writing an essay in Word, etc.
Learning to use a computer by focusing on such canned applications is a bit
like learning to cook by mastering the operation of a microwave.  Yes, it will
allow you to produce edible results -- assuming your local supermarket has a
freezer section -- but it hardly acquaints you with the breadth of the culinary
arts.  With a microwave, the only choice you really have in the process is how
long to heat the thing up -- all other details have been determined for you, in
advance, by someone else.  You cannot choose a recipe that fits your tastes or
dietary preferences, and you certainly can't adapt a recipe or invent something
new.

***To really learn to cook, you have to start working with the raw ingredients.  To really learn to compute, you have to learn to program.***

I think it is a shame to go through life without ever learning to cook, since
food is such a central part of human existence.  But that concern is mainly
philosophical.  Those of the coming generation who go through life without ever
learning to program will be, in a sense, relegated to second-class status,
unable to understand, control, or create that which governs so much of life.
Think of it: how much of your time is spent interacting directly or
indirectly with some electronic device?  For the computationally-illiterate,
the landscape of daily life is thus one of immovable, incomprehensible objects
which they must adapt to or work around.  But for those who can program, these
objects become tools that are understood and can be modified to fit any desired
purpose.

# Piquing their interest

Small children are fascinated by whatever they see adults doing.  All
three of my daughters (ages 9, 6, and 2) are interested in programming, though
I have never told them they should be.  They became interested in programming
by seeing me at it.  Of course, simply typing in a terminal doesn't really grab their
attention.  But they get curious when I'm running wave simulations, and ask
questions about the visualizations.  It was surprising to me to find that even
quite abstract things can grab their interest, if there is an interesting plot
to go along with it.  But when I recently showed them simulations of water
waves, their excitement became palpable.

I was running some simple simulations of waves breaking on a beach, for a talk I was to give in front of a general scientific audience.  The girls began asking what-if questions, and the experimental fun began.  We put a big wall on the beach and then tested how big the waves needed to be before they would go over the wall.  Then we added a big dip in front of the wall.  We tried starting the simulation with all the water flowing in toward the shore.  And so forth.  They came up with the ideas, and I would implement them.  Importantly, the code that sets up the problem was easy to change and run in just a matter of seconds.  I think if they had had to wait even a full minute to find out "what if", I would have lost them.

![Solving PDEs: fun for all ages](/assets/img/shallow_water_fun.jpg)

Did they learn how to program from this?  No, none of them typed any code, and I made only a minimal attempt to explain to them the code I was changing.  But they understood that by typing instructions, one can make a computer do whatever one wants.  They learned that computers can be used to answer fun and interesting questions.  And they got a little exposure to some programming tools and concepts.  Most importantly, they **want** to understand how to make the computer do whatever they can imagine.


# Simple programming for kids

There are a number of tools designed to give kids a "softer" introduction to programming.  Perhaps the best-known is MIT's [Scratch]().  I guess the idea is that the connection between typed instructions and computer output is too abstract.  Also, young children may still be developing reading, writing, and typing skills.  So the text editor is replaced by a GUI with cute animals and buttons that add actions.  This may be great for some kids, but again there is the sense that one is only learning to microwave pre-cooked meals.  My experience in introducing my oldest daughter to programming (at 6) is that she was much more excited by the blank slate of a Python interpreter.

Of course, we didn't jump into decorators and class inheritance.  There should be fast, fun feedback, especially at the start when the learning curve is steepest.  My daughter got a huge kick out of learning she could make the computer talk (using the system command "say" on a Mac).  This was easily incorporated as part of programming some simple games (like guessing a number or hangman).  Those games naturally introduce simple ideas like loops and if-statements.   The goal is always to create something fun or useful; the programming ideas are only incidental.  In my opinion, programming should work that way at all ages and all levels.

Some of the things she has programmed so far include:

- A "guess the number" game (that tells you to guess higher/lower at each iteration)
- A game that asks simple math questions
- Hangman (this one was surprisingly easy compared to what I expected, though she didn't implement any graphics)
- A very simple adventure game (that lets you move around an imaginary world)
- A "countdown to Christmas" that announces the number of hours and days left before Christmas.  I helped her use chrontab to make it run every hour.

# Maintaining interest

My oldest daughter is 9 now, and while I haven't taught her as much programming as I'd like, she continues to be interested in and excited about it.  Let me mention a couple of things that I think have helped maintain that excitement:

- **Ownership**: when she is programming, the program is hers.  I don't write code for her, although in some cases I have nearly dictated bits and pieces before explaining them.  I also don't impose the design or details of the end goals.  I provide ideas and suggestions when she is stuck, and I ask lots of probing questions.
- **Freedom**: I let her dictate the pace.  We don't have a regularly-scheduled time for her to learn -- we do it when the fancy strikes.  If she becomes frustrated or bored, we stop.
- **Fun**: Every project is something that she has decided would be fun.  Sometimes the ideas come from her, and sometimes from me, but the decision to pursue one is hers.

# Difficulties

Along the way, I've run into some challenges that I haven't solved.  My
daughter often comes up with projects that would be much too complicated,
especially where graphics are concerned.  I try to find something similar that
would be simple enough.  When working on a project, she usually wants to do it
in a way that is far from my preconceived "optimal" implementation.  I try to
be patient and hands-off, and to let her learn for herself from her attempts.
She also tends to get interested in some non-essential aspect of a project,
which may not involve much programming skill -- like making the computer say a
lot of silly things when you guess wrong in the number-guessing game.  Again, I
try to be enthusiastic and not to interfere.  Most importantly, our programming
sessions are never too serious and are not a source of tension.

The biggest challenge for me is that teaching programming can be frustrating.
It's easy to forget how difficult the programming mindset is.  Teaching requires
a lot of patience as the student grapples with ideas that seem obvious to the teacher.
It's important that the teacher not jump in and "fix" the student's work -- the
grappling (however slow and painful it may seem) is essential to learning.
I try to stick to the Socratic method -- that is, I can only guide by asking questions.
I also find that my daughter benefits a lot (though she never wants to do it)
from "rubber ducking", which means reading the code out loud.

# Hour of Code

This morning I participated in part of an amazing world-wide effort to help kids
learn to code.  Last year it exposed 15 million kids to programming.  The idea
is that each kid spend at least one hour learning about programming.  A number of
teachers at the KAUST schools have chosen to participate.  If you want to start
teaching your own kids to program -- or if you want to learn! -- the [Hour of
Code website](http://hourofcode.com/us)
has modules for all levels.  For instance, in my daughter's 3rd-grade class
the kids worked through a set of lessons using a graphical interface (moving
code around with a mouse, rather than typing) in order to make Elsa and Anna (from 
Frozen) ice skate in snowflake-shaped patterns.  The lessons are an amazingly
well-designed sequence that also teaches some geometry and is very appealing
to kids.  My hat is off to the people behind Hour of Code and all the teachers
who use it to make programming part of their curriculum.

# Conclusion

Programming literacy presupposes literacy in reading and writing.  For future
generations, these two types of literacy will be of similarly profound
importance.  Computer programs run our world.  If approached in the right way,
programming can be a fun and playful pasttime that builds creativity and
reasoning skills while teaching kids to see the devices that surround them as
malleable tools rather than some kind of opaque oracle.

One last note: you may be thinking, "but I only have boys.  Can boys learn to
program too?" Sure they can, and you'd better teach them now or they won't have
a chance against all the great women coders of the future.  ;-)
