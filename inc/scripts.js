/*--------------------------------------------------------

* Filename: scrupts.js
* Description: General scripts file for Opinicus Soaps

* Author: R. Brian Redd

--------------------------------------------------------*/

/*FUNCTIONS*/

$(document).ready(function () {
	
	/* jQuery variables */
	var section$ = $("section");
	var article$ = $("article");
	var firstArt$ = $("article:first-of-type");

	/* Remove no JS elements */
	$(".jsonly").removeClass("jsonly"); //items that are only visible with javascript (otherwise, are hidden)
	$(".nojsonly").remove(); //elements that are only if no javascript is available
	
	/* Additional DOM mods if user goes directly to back page (and not front page); if javascript exists, then back pages don't have individual NAV */
	
	/* Article Accordian */
	
	article$.addClass('collapsed'); //all "articles" are set to collapsed...
	firstArt$.removeClass('collapsed').addClass('expanded'); // ..except first.
	firstArt$.find(".snippet").addClass("hidden"); //first "snippet" is hidden
	
	section$.find("article h3").click(function() { //set H2 click functionality
		if ($(this).parent().hasClass("collapsed")) { //collapsed clicked
			$(this).parent().parent().find(".hidden").removeClass("hidden"); //display snippet
			$(this).parent().find(".snippet").addClass("hidden"); //hide existing snippet
			$(this).parent().parent().find(".expanded p").slideUp({ //all expanded become collapsed
				duration: "fast",
				complete: function() {
					$(this).parent().parent().find(".expanded").removeClass("expanded").addClass("collapsed");
				}
			});
			$(this).parent().find("p").slideDown({
				duration: "fast",
				complete: function() {
					$(this).parent().removeClass("collapsed").addClass("expanded");
				}
			});
		} else if ($(this).parent().hasClass("expanded")){ // expanded clicked
			$(this).parent().parent().find(".hidden").removeClass("hidden"); //display snippet
			$(this).parent().find("p").slideUp({
				duration: "fast",
				complete: function() {
					$(this).parent().removeClass("expanded").addClass("collapsed");
				}
			});
		};
	});
	
});