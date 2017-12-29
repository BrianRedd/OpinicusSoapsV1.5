/*--------------------------------------------------------

* Filename: spinner.js
* Description: JS file for spinner
* Version: 2.0

* Author: R. Brian Redd

--------------------------------------------------------*/   

/*FUNCTIONS*/

$(document).ready(function () {

	/*Spinner configuration*/
	var spin_width = 400; //set width of spinner
	var spin_height = 300; //set height of spinner
	var spin_speed = 1000; //set spin speed (millisecs)
	var spin_delay = 5000; //set delay between slides (millisecs)
	var spin_effect = 5; /* 0 = rotating effect
							1 = left slide
							2 = up slide
							3 = right slide
							4 = down slide
							5 = fade
							6 = random effect*/
	var pause_on_hover = true; //sets pause on hover
	var click_to_spin = true; //sets click to spin
	
	/*CUSTOM*/
		
	//set timing interval
	var tev = setInterval(function() {spinIt();}, spin_delay);
	
	/*jQuery variables*/
	var spinPage$ = $("#spin_pages");
	var spinPageDiv$ = $("#spin_pages div");
	var spinContainer$ = $("#spin_container");
	var spinBack$ = $("#spin_back");
	var spinFront$ = $("#spin_front");
	var spinInfo$ = $("#spin_info");
	var spinContent$ = $(".spin_content");
	var hoverspace$ = $(".hoverspace");
	
	/*Spinner contents*/
	spinContainer$.css("overflow","hidden"); //if no JS, then content divs will be displayed "stacked"
	spinContent$.css("display","none"); //hide (for now) spin_content
	
	/*Spinner variables*/
	var s_length = spinContent$.children().length;
	var curspin = s_length; //current spin item, set to last item in anticipation of initial "spin"
	var nextspin = 0; //next spin item, set to first item in anticipation of initial "spin"
	var effectval = spin_effect;
	
	/*Check for window hash and go to appropriate slide*/
	if (window.location.hash) {//if window has a hash display div with back and open (non-hashed version) in new window
		var windloc = new String(window.location);
		var whathash = windloc.slice(windloc.indexOf("#")+1);
		if (whathash == parseInt(whathash) && whathash <= s_length) nextspin = whathash; //if hash is a number less than/equal number of tiles
	};
	
	/*Spinner paginator controls*/
	//builds spinner pagination controls HTML
	temp = "";
	for (i=0; i<s_length; i++) {
		temp = temp + "<div id='spin"+i+"' ";
		if (i==curspin) {
			temp = temp + "class='spin_page_on'";
		};
		temp = temp + "></div>";
	};
	spinPage$.html(temp);
	
	/*Set initial spinner divs*/
	spinContainer$.css({
		height: spin_height + "px",
		width: spin_width + "px"
	})
	
	spinBack$.css({
		height: spin_height + "px",
		width: spin_width + "px"
	})
	spinBack$.html(spinContent$.find("#s"+nextspin).html());
	
	spinFront$.css({
		height: spin_height + "px",
		width: spin_width + "px"
	})
	spinFront$.html(spinContent$.find("#s"+curspin).html());
	spinFront$.children().addClass("clickspace");
	
	/*Spinner functions*/
	function spinIt() { //run the "spinner"
		if (spin_effect == 6) { //if effect set to "random" then randomize next spin effect
			effectval = Math.floor(Math.random()*5+1);
		}
		if (spin_effect == 0) { //if effect set to "sequential", then increment spin effect
			effectval ++;
			if (effectval > 5) effectval = 1;
		}
		switch(effectval) { //apply animation based on spin effect
			case 1: //left slide
				spinFront$.animate({
					left: -spin_width
				},{
					duration: spin_speed,
					complete: function() {
						spinReset();
					}
				});
				break;
			case 2: //up slide
				spinFront$.animate({
					top: -spin_height
				},{
					duration: spin_speed,
					complete: function() {
						spinReset();
					}
				});
				break;
			case 3: //right slide
				spinFront$.animate({
					left: +spin_width
				},{
					duration: spin_speed,
					complete: function() {
						spinReset();
					}
				});
				break;
			case 4: //down slide
				spinFront$.animate({
					top: +spin_height
				},{
					duration: spin_speed,
					complete: function() {
						spinReset();
					}
				});
				break;
			case 5: //fade
				spinFront$.animate({
					opacity: 0
				},{
					duration: spin_speed,
					complete: function() {
						spinReset();
					}
				});
				break;
		}
	}
	
	function spinReset() { //"resets" after spin animation, setting up next pair of slides
		//clear paginator
		spinPage$.find("div").removeClass("spin_page_on");
		//increment both curspin and nextspin
		curspin = nextspin;
		nextspin++; 
		if (nextspin == s_length) nextspin=0;
		//populate front slide with correct content
		spinFront$.html(spinContent$.find("#s"+curspin).html());
		spinFront$.children().addClass("clickspace");
		spinFront$.css({
			"left":"0",
			"top":"0",
			"opacity":"1"
		});
		//highlight correct paginator button
		$("#spin" + curspin).addClass("spin_page_on");
		//populate back slide
		spinBack$.html(spinContent$.find("#s"+nextspin).html());
		//define "click to spin" event (if enabled)
		if (click_to_spin) {
			spinFront$.find(".clickspace").click(function() {
				clickToSpin(nextspin);
			});
		};
	}
	
	spinPage$.find("div").click(function() {
		clickToSpin(($(this).attr("id")).substring(4));
	});

	//"force" a spin if either paginator or click_to_spin is activated
	function clickToSpin(x) {
		if (parseInt(x) == parseInt(curspin)) { //if "x" (spin target) is same as active slide, do nothing
			return;
		} else {
			nextspin = x; //set "nextspin" to "x" (spin target)
			spinBack$.html(spinContent$.find("#s"+nextspin).html()); //populate back slide with "x" content
			clearInterval(tev); //clear timing interval
			tev = setInterval(function() {spinIt();}, spin_delay); //reset timing interval
			spinIt(); //run spinner
		};
	};
	
	if (pause_on_hover) { //if pause_on_hover is enabled...
		hoverspace$.hover(
			function() {
				clearInterval(tev); //clear timing interval on mouse-over
			}
		,
			function() { //resume timing interval on mouse-out
				clearInterval(tev);
				tev = setInterval(function() {spinIt();}, spin_delay);
			}
		);
	};
	
	/*Initial spin*/
	spinIt();
	
});