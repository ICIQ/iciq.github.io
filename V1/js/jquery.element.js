document.createElement('header');
document.createElement('footer');
document.createElement('section');
document.createElement('nav');



//////////////////////////////////////////////////////////




$(document).ready(function() {
	
	
	$('a.inactive').click(function() {
		return false;	
	});
	
	
	// slide for internal links
	$('header a.logo').anchorAnimate();
	$('header a.internal').anchorAnimate();
	$('footer a.footerlogo').anchorAnimate();

	
});




//////////////////////////////////////////////////////////




jQuery.fn.anchorAnimate = function(settings) {
	settings = jQuery.extend({speed : 800 }, settings);
	return this.each(function(){
		var caller = this
		$(caller).click(function (event) {
			event.preventDefault()
			var locationHref = window.location.href
			var elementClick = $(caller).attr("href")
			var destination = $(elementClick).offset().top;
			$("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination}, settings.speed, function() {
				window.location.hash = elementClick
				$('nav li.active').removeClass('active');
				$(caller).parent().addClass('active');
			});

			return false;
		})
	})
};





//////////////////////////////////////////////////////////


//Scroll highlight

(function($){$.belowthefold=function(element,settings){var fold=$(window).height()+$(window).scrollTop();return fold<=$(element).offset().top-settings.threshold;};$.abovethetop=function(element,settings){var top=$(window).scrollTop();return top>=$(element).offset().top+$(element).height()-settings.threshold;};$.rightofscreen=function(element,settings){var fold=$(window).width()+$(window).scrollLeft();return fold<=$(element).offset().left-settings.threshold;};$.leftofscreen=function(element,settings){var left=$(window).scrollLeft();return left>=$(element).offset().left+$(element).width()-settings.threshold;};$.inviewport=function(element,settings){return!$.rightofscreen(element,settings)&&!$.leftofscreen(element,settings)&&!$.belowthefold(element,settings)&&!$.abovethetop(element,settings);};$.extend($.expr[':'],{"below-the-fold":function(a,i,m){return $.belowthefold(a,{threshold:0});},"above-the-top":function(a,i,m){return $.abovethetop(a,{threshold:0});},"left-of-screen":function(a,i,m){return $.leftofscreen(a,{threshold:0});},"right-of-screen":function(a,i,m){return $.rightofscreen(a,{threshold:0});},"in-viewport":function(a,i,m){return $.inviewport(a,{threshold:0});}});})(jQuery);

$(window).scroll(function() {
    $('nav a').parent().removeClass('active');
    if ($(window).scrollTop() > 300) {
        $('nav a[href=#' + $('div.content section:in-viewport').attr('id') + ']').parent().addClass('active');
    }
});



//////////////////////////////////////////////////////////



//logo highlight


$(window).scroll(function() {
	$('nav li a').parent().removeClass('active');
	$('a.logo').css('background-position', '0px 0px');
	if ($(window).scrollTop() > 365) {
		if (id = $('div.content section:in-viewport').attr('id')) {
			$('nav li a[href=#' + id + ']').parent().addClass('active');
			$('a.logo').css('background-position', '0px -' + (0 * ($('nav li a[href=#' + id + ']').parent().prevUntil('ul').length + 1)) + 'px');
		}
	}
});


//////////////////////////////////////////////////////////


$(function() {
// OPACITY OF BUTTON SET TO 80%
$(".thumb a img").css("opacity","0.80");


// ON MOUSE OVER
$(".thumb a img").hover(function () {

// SET OPACITY TO 100%
$(this).stop().animate({
opacity: 1.0
}, "slow");
},

// ON MOUSE OUT
function () {

// SET OPACITY BACK TO 80%
$(this).stop().animate({
opacity: 0.80
}, "slow");
});
});





$(function() {
// OPACITY OF BUTTON SET TO 80%
$(".thumb3 img").css("opacity","0.80");


// ON MOUSE OVER
$(".thumb3 img").hover(function () {

// SET OPACITY TO 100%
$(this).stop().animate({
opacity: 1.0
}, "slow");
},

// ON MOUSE OUT
function () {

// SET OPACITY BACK TO 80%
$(this).stop().animate({
opacity: 0.80
}, "slow");
});
});






$(function() {
// OPACITY OF BUTTON SET TO 75%
$(".btn").css("opacity","0.75");


// ON MOUSE OVER
$(".btn").hover(function () {

// SET OPACITY TO 100%
$(this).stop().animate({
opacity: 1.0
}, "slow");
},

// ON MOUSE OUT
function () {

// SET OPACITY BACK TO 75%
$(this).stop().animate({
opacity: 0.75
}, "slow");
});
});





$(function() {
// OPACITY OF BUTTON SET TO 75%
$(".email").css("opacity","0.75");


// ON MOUSE OVER
$(".email").hover(function () {

// SET OPACITY TO 100%
$(this).stop().animate({
opacity: 1.0
}, "slow");
},

// ON MOUSE OUT
function () {

// SET OPACITY BACK TO 75%
$(this).stop().animate({
opacity: 0.75
}, "slow");
});
});





$(function() {
// OPACITY OF BUTTON SET TO 75%
$(".resume").css("opacity","0.75");


// ON MOUSE OVER
$(".resume").hover(function () {

// SET OPACITY TO 100%
$(this).stop().animate({
opacity: 1.0
}, "slow");
},

// ON MOUSE OUT
function () {

// SET OPACITY BACK TO 75%
$(this).stop().animate({
opacity: 0.75
}, "slow");
});
});




$(function() {
// OPACITY OF BUTTON SET TO 75%
$(".linkedin").css("opacity","0.75");


// ON MOUSE OVER
$(".linkedin").hover(function () {

// SET OPACITY TO 100%
$(this).stop().animate({
opacity: 1.0
}, "slow");
},

// ON MOUSE OUT
function () {

// SET OPACITY BACK TO 75%
$(this).stop().animate({
opacity: 0.75
}, "slow");
});
});




$(function() {
// OPACITY OF BUTTON SET TO 75%
$(".twitter").css("opacity","0.75");


// ON MOUSE OVER
$(".twitter").hover(function () {

// SET OPACITY TO 100%
$(this).stop().animate({
opacity: 1.0
}, "slow");
},

// ON MOUSE OUT
function () {

// SET OPACITY BACK TO 75%
$(this).stop().animate({
opacity: 0.75
}, "slow");
});
});
