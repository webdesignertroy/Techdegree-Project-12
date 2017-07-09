$(document).ready(function(){
	/* Note projects object is defined in data.js file */
	
	/************************
		VARIABLES
	*************************/

	var $wrapper = $("#wrapper");
	var $smLogo = $("#sm-logo");
	var $navDiv = $("#nav");
	var $navBar = $("#main");
	var $menuLi = $("#main li a");
	var $backTop = $("#back-top a");
	var $menuReveal = $("#menu-reveal");
	var mq = window.matchMedia('all and (max-width: 769px)');
	var menuLength = 0;

	var $overlay = $("#overlay");
	var $projectImage = $('<div id="project-image"></div>');
	var $projectDetails = $('<div id="project-details"></div>');
	var $projectTech = $('<div id="project-tech"></div>'); 
	var $cursorBorderLeft = $('<div id="cursor-border-left"></div>');
	var $cursorBorderRight = $('<div id="cursor-border-right"></div>');
	var $arrowLeft = $('<div id="arrow-left"></div>');
	var $arrowRight = $('<div id="arrow-right"></div>');
	var $mobileEscape = $('<div id="esc-container"><div id="mobile-escape">Close<span class="close-icon">&#xf00d;</span></div></div>');
	
	var inView = false;
	
	var preLoadTime = 0;

	/************************
		FUNCTION EXPRESSIONS
	*************************/

	//Function generates a current year and adds language for copyright notice.
	var currentYear =  function() {
		var d = new Date();
		var n = d.getFullYear();
		document.getElementById("copyright").innerHTML = '&copy;' + n + ' Troy Rowtham Portfolio';
	}// ~end copyright
	currentYear(); 

	// Function: hide menu items
	var hideMenu = function() {
		$navBar.slideUp(700, "swing");
	};

	// Function: show menu items
	var showMenu = function() {
		$navBar.slideDown(700, "swing");
	};

	// Function: scrolls to 'targeted id' on page
	var $scroll = function($hash, menuCount) {
		if( $(this).scrollTop() < 424  && menuCount !== 0) {  // Clicking link before window is 424px is treated differently
			$('html, body').animate({ 
				scrollTop: $( $hash ).offset().top -  menuCount - 295 /* was -295 */
			}, 500, "swing");		} else {
			$('html, body').animate({
				scrollTop: $( $hash ).offset().top -  menuCount - 48
			}, 500, "swing");
		} 
	}; // end scroll function
	
	// Function: Hide #project-image
		var newView = function(direct, animateDir) {
			$projectTech.addClass("transparent");
			$(".layout-details").addClass("transparent");
			if ( animateDir === "back") {
				$projectImage.removeClass("transparent-image-forward-after").removeClass("transparent-image-backwards-after").addClass("transparent-image-backwards").delay(700).queue(function(next){
					findData(direct);
					$projectImage.removeClass("transparent-image-backwards");
					$projectImage.addClass("transparent-image-backwards-after");
					$projectTech.removeClass("transparent");
					$(".layout-details").removeClass("transparent");
					next();
				});
			} else {
				$projectImage.removeClass("transparent-image-backwards-after").removeClass("transparent-image-forward-after").addClass("transparent-image-forward").delay(700).queue(function(next){
					findData(direct);
					$projectImage.removeClass("transparent-image-forward");
					$projectImage.addClass("transparent-image-forward-after");
					$projectTech.removeClass("transparent");
					$(".layout-details").removeClass("transparent");
					next();
				});
			}

			
		}; // end hide #project-image
		
	// Function: Listen for when an element (elem) scrolls into view on the screen
	//      Note: Perfect this.
		var isScrolledIntoView = function(elem) { 
			var docViewTop = $(window).scrollTop();
			var docViewBottom = docViewTop + $(window).height();
			
			var elemTop = $(elem).offset().top;
			var elemBottom = elemTop + $(elem).height();
			return ((elemTop <= docViewBottom) && (elemBottom >= docViewTop));
		}; 	// end Listen for when element scrolls into view
		
	// Function: Find correct data in project details array
		var findData = function(index) {
			var imageHTML = "";
			var detailHTML = "";
			var skillsHTML = "";
			$.each(projects, function(i, data){
				if (index  === i) {
					// build image div
					imageHTML += '<div class="image-details" data-image-index="'+ i +'">';
					imageHTML += '<img src="img/projects/' + data.preview + '.jpg"/>';
					imageHTML += '</div>';

					// build description div
					detailHTML += '<div class="layout-details">';
					detailHTML += '<h3>' + data.name +'</h3>';
					detailHTML +=  '<p class="btn-container">';
					detailHTML += '<a href="' + data.url + '" class="btn" target="_blank">Visit Site</a>';
					if ( data.github !== "" ) {
						detailHTML += '<a href="' + data.github + '" class="btn" target="_blank"> Visit GitHub</a>';
					}
					if ( data.mockup !== "" ) {
						detailHTML += '<a id ="show-mock" href="' + data.mockup + '" class="btn" target="_blank"> See Mockup</a>';
					}
					detailHTML += '</p>';
					detailHTML += '<p>' + data.description + '</p>';
					detailHTML +='</div>';

					// build skills badges div
					skillsHTML += '<div class="layout-skills">';
					for ( i = 0; i < data.tech.length; i++ ) {
						skillsHTML += '<div class="badge-container"><div id="' + data.tech[i] + '" class="badge">';
						skillsHTML += data.tech[i];
						skillsHTML += '</div><span>' + data.tech[i] + '</span></div>';
					}
					skillsHTML += '</div>';
				}
				document.getElementById("project-tech").innerHTML = skillsHTML;
				document.getElementById("project-image").innerHTML = imageHTML;
				document.getElementById("project-details").innerHTML = detailHTML;

			}); // end HTML builds
		};  // end find data function 
		
	/************************
		FUNCTION DECLARATIONS
	*************************/	
	// Function: Don't start interactive backgrounds automatically
	var preLoadTimer = setInterval(startEvent, 3000);
	
	function startEvent() {
		preLoadTime = 1;
		clearInterval(preLoadTimer);
	}
	
 	/************************
	   NAVIGATION
	*************************/	

 	// On menu li click, scroll to 'targeted id'
 	$menuLi.on("click", function(e){

 		// prevent normal action
 		e.preventDefault();

 		// defines the href of the'targeted id' 
 		var $link = $(this).attr("href");
 		$scroll($link, 0);

		// invokes hideMenu()
		if (mq.matches) {
			hideMenu();
		}

		// invokes scroll function --> $scroll()
 	 	$scroll($link, menuLength);

 	}); // end menu item click

 	// On #back-top click, scroll to 'targeted id'
 	 $backTop.on("click", function(e){

 	 	// prevent normal action
 	 	e.preventDefault();

 	 	// defines the href of the 'targeted id' 
 	 	var $link = $(this).attr("href");

		// invokes hideMenu()
		if (mq.matches) {
			hideMenu();
		}

		// invokes scroll function --> $scroll()
 	 	$scroll($link, menuLength);

 	 }); // end #back-top click

	// if javascript works, hide/show appropriate menus
	if (mq.matches) {
		$menuReveal.show();
		$navBar.hide();
		menuLength = $menuLi.length;
	} else {
		$menuReveal.hide();
		menuLength = 0;
	} // end hide/show menus when appropriate

 	/************************
	   EVENT LISTENERS
	*************************/	

	// On menu click, reveal or hide mobile navigation
	$menuReveal.on("click", function(){
		// If menu button is above 100px on screen
		//   scroll down
		if ( $menuReveal[0].offsetTop > 424 ) { 
			$('html, body').animate({
				scrollTop: $("#nav").offset().top + 100
			}, 500, "swing");

		}
		// toggles MenuReveal button
		if( $navBar.css("display") === "none" ) {
			showMenu();
		} else {
			hideMenu();
		}
	}); // end #menu-reveal click

	// If javascript is on and the media window changes, 
	//    hide/show appropriate menus
	mq.addListener(function(changed) {
		if(changed.matches) {
			$menuReveal.show();
			$navBar.hide();
			menuLength = $menuLi.length;
		} else {
			$menuReveal.hide();
			$navBar.show();
			menuLength = 0;
		}
	}); // end mq.addListner 

	// Listen for scroll pass 440px then fix main navigation
	if( $(window).height() !== $(document).height() ) {
		$(window).on("scroll", function(){
		 	var scrollWin = $(this).scrollTop();
		 	if ( scrollWin > 440 ) {
		 		$navDiv.addClass("fix-menu");
		 		$wrapper.addClass("add-lost-height");
		 		$("#back-top").removeClass("hide-div");
		 		$smLogo.addClass("show-logo");

		 	} else {
		 		$navDiv.removeClass("fix-menu");
		 		$wrapper.removeClass("add-lost-height");
		 		$("#back-top").addClass("hide-div");
		 		$smLogo.removeClass("show-logo");
		 	}
		});
	} // end scroll pass 440px

	// Listen for scroll pass 100px then fix #back-top
	if( $(window).height() !== $(document).height() ) {
		$(window).on("scroll", function(){
		 	var scrollWin = $(this).scrollTop();
		 	if ( scrollWin > 200 ) {
		 		$("#back-top").addClass("fade-in");
		 	} else {
		 		$("#back-top").removeClass("fade-in");
		 	}
		});
	} // end scroll pass 100px

 	/************************
	   HEADER INTERACTIVE 
	*************************/		
	// Detect Browser if I.E. is being used
	  if ( !!navigator.userAgent.match(/Trident\/7\./) || /Edge/.test(navigator.userAgent) || !!navigator.userAgent.match(/iPhone/i) || !!navigator.userAgent.match(/iPod/i) || !!navigator.userAgent.match(/iPad/i)) {
		  $("#svg-alternative").removeClass("hide-img");
		  $("#logo").addClass("hide-svg");
    } else {
		  $("#logo").removeClass("hide-svg");
		  $("#svg-alternative").addClass("hide-img");
    }  
	// Load after logo animation has run more than 75%
	
	// On left-hemisphere hover in header / Develop-side
	$("#left-trigger").mouseenter(function(){
		if(preLoadTime !== 1) { return;}
		$("#develop-bg").removeClass("reveal-left");
		$("#header").addClass("red");
		$("#create-mobile-svg").addClass("fade-out");
	});
	$("#left-trigger").mouseleave(function(){
		if(preLoadTime !== 1) { return;}
		$("#develop-bg").addClass("reveal-left");
		$("#header").removeClass("red");
		$("#create-mobile-svg").removeClass("fade-out");
	});

	// On right-hemisphere hover in header / Create-side
	$("#right-trigger").mouseenter(function(){
		if(preLoadTime !== 1) { return;}
		$("#create-bg").removeClass("reveal-right");
		$("#header").addClass("blue");
		$("#create-mobile-svg").addClass("fade-out");
	});
	$("#right-trigger").mouseleave(function(){
		if(preLoadTime !== 1) { return;}
		$("#create-bg").addClass("reveal-right");
		$("#header").removeClass("blue");
		$("#create-mobile-svg").removeClass("fade-out");
	});
		
 	/*******************************
	   FOR PORTFOLIO INTERACTIVE
	*******************************/

	// Create "for loop" with HTML code mixed with variables 
	function renderProjectDetails() {
		for ( var t="",  i=0; i < projects.length; i++ ) {
			t+='<div class="port-col" data-index="' + i + '">';
			t+="<h3>"+projects[i].name+"</h3>";
			t+='<div class="project-preview"><img src="img/projects/thumbs/'+projects[i].preview+'.png" alt=""><span></span></div>';
			t+="</div>";
		}
		$(".project-details-dom").html(t);
	}

	// Invoke function
	renderProjectDetails();

	// Open overlay on click
	$(".project-details-dom").on("click", ".port-col", function(){

		// Variables
		var $projectIndex = parseInt($(this).attr("data-index")); 

		// Append overlay/wrapper and show
		$projectImage.appendTo($overlay);
		$overlay.addClass("show");
		$projectDetails.appendTo($wrapper);
		$projectTech.appendTo($wrapper);
		$cursorBorderLeft.appendTo($wrapper);
		$cursorBorderRight.appendTo($wrapper);
		$arrowRight.appendTo($wrapper);
		$arrowLeft.appendTo($wrapper);
		$mobileEscape.appendTo($wrapper);

		// Invoke findData() to Find Correct Data
		findData($projectIndex);

		// Fade-in overlay
		$overlay.animate({
			opacity: 1
		}, 500);

		// Fade-in project-details
		$projectDetails.animate({
			opacity: 1
		},500);

		// Fade-in project-skills
		$projectTech.animate({
			opacity: 1
		},500);

	});  // end Open overlay on click

	// Close overlay and project details on click
	$overlay.on("click", function(){

		// Fade-out project details
		$projectDetails.animate({
			opacity: 0
		}, 500)

		// Fade-out project details
		$projectTech.animate({
			opacity: 0
		}, 500)

		// Slide Image
		$projectImage.addClass("slide ")

		// Fade-out overlay
		$overlay.animate({
			opacity: 0

		}, 500, function(){
			$overlay.removeClass("show");
			$projectDetails.remove();
			$projectTech.remove();
			$cursorBorderRight.remove();
			$cursorBorderLeft.remove();
			$arrowRight.remove();
			$arrowLeft.remove();
			$mobileEscape.remove();
			$projectImage.removeClass("transparent-image-backwards-after");
			$projectImage.removeClass("transparent-image-forward-after");
		});

	});  //end Close overlay on click
	
	/*  Arrow Navigation and #mobile-escape  */
	
	// On mobile-escape click (bubbling event issues)
	$wrapper.on("click","#mobile-escape", function(){
		$overlay.trigger("click");
	});
	
	// On right-arrow click event (bubbling event issues)
	$wrapper.on("click", "#arrow-right", function(){
		var detailsIndex = parseInt($(".image-details").attr("data-image-index"));
		var animateLeft = "fwd";
		if ( detailsIndex < projects.length - 1 ) {
			var directions = detailsIndex + 1;
			newView(directions, animateLeft);
			
		} else {
			var directions = 0;
			newView(directions, animateLeft);
		}
	}); // end right-arrow click event

	// On left arrow click event (bubbling event issues)
	$wrapper.on("click", "#arrow-left", function(){
		var detailsIndex = parseInt($(".image-details").attr("data-image-index"));
		var animateRight = "back";
		if ( detailsIndex > 0 ) {
			var directions = detailsIndex - 1;
			newView(directions, animateRight);
		} else {
			var directions = projects.length - 1;
			newView(directions, animateRight);
		}
	}); // end left-arrow click event

	/*  Accessibility: Keyboard  */
	$(this).keyup(function(e){
		"use strict";
		switch(e.keyCode) {
			case 27:
				//Fade out overlay when[ESC=27] is keyed.
				$overlay.trigger("click"); 
			break;
			case 37:
				//Advances slideshow left on left-arrow [37] key.
				$("#arrow-left").trigger("click");			
			break;
			case 39:
				//Advances slideshow right on right-arrow [39] key.
				$("#arrow-right").trigger("click");
			break;
		}
	}); // end Accessibility: Keyboard

 	/*******************************
	   SKILL DOUGHNUT GRAPHS
	*******************************/
	/* Note: skillLevel object is defined in data.js file  */

	// When the 1st skills doughnut chart scrolls into view,
	//    start the animation
	$(window).scroll(function() {
		if( isScrolledIntoView("#html") && inView === false ) {
			 inView = true;
			// Invoke HTML
				skillLevel.html();
		
			// Invoke CSS
				skillLevel.css();
		
			// Invoke JavaScript
				skillLevel.js();
		
			// Invoke jQuery
				skillLevel.jquery();
		
			// Invoke WordPress
				skillLevel.wordpress();
		
			// Invoke Sass
				skillLevel.sass();
		
			// Invoke Gulp
				skillLevel.gulp();
		
			// Invoke GitHub
				skillLevel.github();
		}
	}); // end Animate charts when they scroll into view
	
}); // end main.js