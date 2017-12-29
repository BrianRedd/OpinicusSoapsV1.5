/*--------------------------------------------------------

* Filename: shop.js
* Description: Shop scripts file for Opinicus Soaps

* Author: R. Brian Redd

--------------------------------------------------------*/

/*FUNCTIONS*/

$(document).ready(function () {

	var fullurl = String(window.location);
//	alert(fullurl);
	if (fullurl.indexOf('?') != -1) {
		var shopTarget = fullurl.substring(fullurl.indexOf('?')+3, fullurl.length);
	} else {
		var shopTarget = "http://stores.opinicussoaps.com/StoreFront.bok";
	};
	
	$("#storeframe").attr("src", shopTarget);
	
});