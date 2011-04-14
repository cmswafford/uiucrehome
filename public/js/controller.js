/**
 * @author Daniel Mestas <dan5446@gmail.com>
 * @netid mestas1
 * @date 
 */

/**
 * Prevent default horizontal scrolling behavior of the ipad  
 */
/*document.body.addEventListener('touchmove', function(e) {
	  // This prevents native scrolling from happening.
	  e.preventDefault();
}, false);*/

// Portal Page link handler
var bindNavigationButtons = function() {
	$(".button").bind("click", function(e) {
		var requestedID = this.id;
		requestedID = "#" + requestedID;
		requestedID = requestedID.substr(0, requestedID.length - 4);
		var offset = -788;
		if(requestedID == "#portal") offset = 0;
		$("#landscape").stop().animate({'opacity': 0.0}, 400, function() {
			$('.subpage').addClass("inactive"); 
			$(requestedID).removeClass("inactive");
			$("#landscape").css('margin-top', offset);
			$("#landscape").animate({"opacity": 1.0}, 400);
		});
	});
};

bindNavigationButtons();

var bindGraphButtons = function() {
	$(".arrow").bind("click", handler = function(e) {
		var leftMargin = $("#centerGraphLandscape").css("margin-left");
		leftMargin = leftMargin.substring(0, leftMargin.length-2);
		leftMargin = parseInt(leftMargin);
		leftMargin = leftMargin - leftMargin%800;
		console.log("landscape element has a margin of " + leftMargin);
		var setIndicator = function(leftMargin) {
			var indicator;
			if(leftMargin == 0) indicator = "indicator1";
			if(leftMargin == -800) indicator = "indicator2";
			if(leftMargin == -1600) indicator = "indicator3";
			if(leftMargin == -2400) indicator = "indicator4";
			$('.indicator').removeClass('indicating');
			$('#'+indicator).addClass('indicating');
		}
		if(this.id == "leftArrow") {
			if(leftMargin >= 0) return;
			else {
				leftMargin += 800;
				setIndicator(leftMargin);
				$("#centerGraphLandscape").stop().animate({'margin-left': leftMargin}, 300);
			}
		}
		else {
			if(leftMargin <= -2400) return;
			else {
				leftMargin -= 800;
				setIndicator(leftMargin);
				$("#centerGraphLandscape").stop().animate({'margin-left': leftMargin}, 300);
			}
		}
	});
};

bindGraphButtons();

var bindThermGraphButtons = function() {
	$(".thermArrow").bind("click", handler = function(e) {
		var leftMargin = $("#thermCenterGraphLandscape").css("margin-left");
		leftMargin = leftMargin.substring(0, leftMargin.length-2);
		leftMargin = parseInt(leftMargin);
		leftMargin = leftMargin - leftMargin%800;
		console.log("landscape element has a margin of " + leftMargin);
		var setIndicator = function(leftMargin) {
			var indicator;
			if(leftMargin == 0) indicator = "thermIndicator1";
			if(leftMargin == -800) indicator = "thermIndicator2";
			if(leftMargin == -1600) indicator = "thermIndicator3";
			if(leftMargin == -2400) indicator = "thermIndicator4";
			$('.thermIndicator').removeClass('indicating');
			$('#'+indicator).addClass('indicating');
		}
		if(this.id == "thermLeftArrow") {
			if(leftMargin >= 0) return;
			else {
				leftMargin += 800;
				setIndicator(leftMargin);
				$("#thermCenterGraphLandscape").stop().animate({'margin-left': leftMargin}, 300);
			}
		}
		else {
			if(leftMargin <= -2400) return;
			else {
				leftMargin -= 800;
				setIndicator(leftMargin);
				$("#thermCenterGraphLandscape").stop().animate({'margin-left': leftMargin}, 300);
			}
		}
	});
};

bindThermGraphButtons();

var bindHistoryGraphButtons = function() {
	$(".monitorArrow").bind("click", handler = function(e) {
		// need some more logic here to check which type of graph is showing
		var leftMargin = $("#historyCenterGraphLandscape").css("margin-left");
		leftMargin = leftMargin.substring(0, leftMargin.length-2);
		leftMargin = parseInt(leftMargin);
		leftMargin = leftMargin - leftMargin%480;
		console.log("landscape element has a margin of " + leftMargin);
		var setIndicator = function(leftMargin) {
			var indicator;
			if(leftMargin == 0) indicator = "monitorIndicator1";
			if(leftMargin == -480) indicator = "monitorIndicator2";
			if(leftMargin == -960) indicator = "monitorIndicator3";
			if(leftMargin == -1440) indicator = "monitorIndicator4";
			$('.monitorIndicator').removeClass('indicating');
			$('#'+indicator).addClass('indicating');
		}
		if(this.id == "monitorGraphButtonLeft") {
			if(leftMargin >= 0) return;
			else {
				leftMargin += 480;
				setIndicator(leftMargin);
				$("#historyCenterGraphLandscape").stop().animate({'margin-left': leftMargin}, 300);
			}
		}
		else {
			if(leftMargin <= -1440) return;
			else {
				leftMargin -= 480;
				setIndicator(leftMargin);
				$("#historyCenterGraphLandscape").stop().animate({'margin-left': leftMargin}, 300);
			}
		}
	});
};

bindHistoryGraphButtons();

// This not working, this div is obscured
$("#wholeHouse").click(function (){
	document.getElementById("space").innerHTML = "<h3>Entire House</h3>";
	Cufon.replace('h3', { fontFamily: 'Thin' }); // Font Replacement: update the replacement at every refresh
});


// perhaps a touch gesture listener which allows for pageflipping through the subpages
