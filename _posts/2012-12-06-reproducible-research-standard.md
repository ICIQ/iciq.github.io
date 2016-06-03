---
layout: post
title: Adopting the Reproducible Research Standard
name: Adopting the Reproducible Research Standard
subtitle: Retaining copyright on my papers
tags: reproducible-research scientific-publishing open-access publications
categories: blog-post
---
Note: this post was originally written by [David Ketcheson](http://www.davidketcheson.info/2012/12/06/reproducible-research-standard.html).

Back in July, I read Victoria Stodden's work on licensing reproducible
research.  Victoria has proposed the Reproducible Research Standard (RRS),
which is an amalgamation of recommended licenses for what she calls the
*research compendium*.  The research compendium is the full set of outputs of a
research project, including:

 - The research paper
 - Additional media, such as movies
 - Computer code
 - Data
 - A record of the computing environment used to process the code and data

The idea is that all of these components are part of your research and someone
wanting to understand your research may need access to all of them.  The RRS
consists of the following licenses:

 - [Creative Commons Attribution (BY)](http://creativecommons.org/licenses/by/3.0/) for **media** (text, figures, movies)
 - [Modified BSD](http://en.wikipedia.org/wiki/BSD_licenses%233-clause_license_.28.22New_BSD_License.22_or_.22Modified_BSD_License.22.29) for **code**
 - [Science Commons Database Protocol](http://sciencecommons.org/resources/faq/database-protocol) for **data**

 For the most part, this is easy enough to implement: the current academic
 research system frankly doesn't care what you do with your code, data or
 miscellaneous media outputs.  And I think that actually releasing those is
 the most important part of the RRS.
 But the text and figures of the paper itself
 must be published in a journal, and typically the journal will want the
 copyright -- preventing you from releasing those media under CC-BY.

Nevertheless, I've attempted to follow the full RRS with each of the two papers
I've had accepted since then.  [The first](http://arxiv.org/abs/1111.3499)
(still in press) was accepted to the SIAM Journal on Scientific Computing
(SISC).  The code is licensed under modified BSD as part of the
[SharpClaw](https://github.com/clawpack/sharpclaw) package (now rolled into
[PyClaw](https://github.com/clawpack/pyclaw)). After reading [one author's
experience retaining copyright to an article published by
SIAM](http://adamdsmith.wordpress.com/2009/07/07/copyright-copywrong/), I
decided to try the same approach of modifying the copyright transfer agreement
by [striking out the transfer of
copyright](http://adamdsmith.wordpress.com/2009/07/07/copyright-copywrong/#jp-carousel-138).
I suspected that the instance just linked to went "below the radar", and I
wanted to be completely above-board, so I pointed out to SIAM that I had
modified the agreement.  What made this particularly interesting is that one of
my co-authors on the paper is Randy LeVeque, chair of the SIAM journals
committee.

Eventually, SIAM objected  "on the grounds that non-exclusive right to publish
doesn't prohibit
others from publishing for profit, which may be to [the authors'] disadvantage as
well."  They agreed instead to an addendum generated via
http://scholars.sciencecommons.org/ that retains for the authors the right to
post the final article on any public server, as long as publication in SISC is
stated.  Since this gave me what I wanted in practical terms, I agreed and
signed the copyright transfer + addendum.  I've been told that an ad hoc
committee of SIAM leadership is now discussing how SIAM should handle these
copyright questions like this.

I came away from this feeling like we had made progress, but I still wanted to
see if I could implement the full RRS with respect to the next paper.  My [next
accepted paper](http://arxiv.org/pdf/1201.3035v3.pdf) (also still in press)
was a submission to [Communications in Applied Mathematics and
Computational Science](msp.org/camcos/), published by the extremely progressive
not-for-profit [Math­em­at­ic­al Sci­ences
Pub­lish­ers](http://msp.org/about/).  This is a truly remarkable journal that
will be the subject of another blog post in the near future, but what's
important in this context is that the journal doesn't require authors to
transfer copyright!  They only require a [license to
publish](http://msp.berkeley.edu/editorial/uploads/camcos/accepted/120712-Qi/copyright.pdf)
which includes this clause:

>*The copyright holder retains the right to duplicate the Work by any means and to permit others to do the same with the exception of reproduction by services that collect fees for delivery of documents, which may be licensed only by the Publisher. In each case of authorized duplication of the Work in whole or in part, the Author(s) must still ensure that the original publication by the Publisher is properly credited.*

After discussion with my co-author Aron Ahmadia, we're retaining copyright and
licensing the paper under CC-BY-NC.  The NC (non-commercial clause) seems
necessary to comply with the paragraph above, and seems reasonable to me.  The
code for the paper is released as part of the [RK-opt
package](https://github.com/ketch/RK-opt).  So I'm calling this mission
accomplished.

I have mixed feelings about whether it makes sense for journals to let authors
keep copyright -- I can see some sense in SIAM's objection, and I think that
non-profit publishers need to protect enough of a revenue stream to support
their activities.  I think it is better that that revenue come from (low-cost)
subscriptions than from author fees.  It will be interesting to see where
SIAM's policy falls.
