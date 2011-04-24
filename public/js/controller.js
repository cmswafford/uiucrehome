/**
 * @author Daniel Mestas <dan5446@gmail.com>
 * @netid mestas1
 * @date 
 */

/**
 * Prevent default horizontal scrolling behavior of the ipad  
 */
document.body.addEventListener('touchmove', function(e) {
	  // This prevents native scrolling from happening.
	  e.preventDefault();
}, false);

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

var bindHvacButtons = function() {
	$(".thermoButton").bind("mousedown", function(e) {
		var id = this.id;	
		if (id == 'z1u') {
			setting = parseFloat($('#z1Temp').html());
			if(setting < 90) setting += 1;
			$('#z1Temp').html(setting.toString());
			// send message
		}
		else if (id == 'z2u') {
			setting = parseFloat($('#z2Temp').html());
			if(setting < 90) setting += 1;
			$('#z2Temp').html(setting.toString());
			// send message
		}
		else if (id == 'z1d') {
			setting = parseFloat($('#z1Temp').html());
			if(setting > 40) setting -= 1;
			$('#z1Temp').html(setting.toString());
			// send message
		}
		else {
			setting = parseFloat($('#z2Temp').html());
			if(setting > 40) setting -= 1;
			$('#z2Temp').html(setting.toString());
			// send message
		}
	});
};
bindHvacButtons();

var bindCategoryButtons = function() {
	$(".category").bind("click", function(e) {
		var requestedID = this.id;
		$('.device').removeClass('deviceSelected');
		if (requestedID == 'homeCategory') {
			$('#space').html("<h3>Entire House</h3>");
			$('.device').addClass('deviceSelected');
			Cufon.replace('h3', {fontFamily: 'Thin'});
			//etc
		}
		else if (requestedID == 'lightingCategory') {
			$('#space').html("<h3>All Lights</h3>");
			$('.light').addClass('deviceSelected');
			Cufon.replace('h3', {fontFamily: 'Thin'});
			//etc
		}
		else if (requestedID == 'appliancesCategory') {
			$('#space').html("<h3>All Appliances</h3>");
			$('.appliance').addClass('deviceSelected');
			Cufon.replace('h3', {fontFamily: 'Thin'});
			//etc
		}
	});
};
bindCategoryButtons();

var bindDeviceButtons = function() {
	$(".device").bind("click", function(e) {
		$('#space').html("<h3>"+this.id+"</h3>");
		$('.device').removeClass('deviceSelected');
		Cufon.replace('h3', {fontFamily: 'Thin'});
		$('#'+this.id).addClass('deviceSelected');
		//etc
	});
};
bindDeviceButtons();

var bindHeatSwitch = function() {
	$(".hSwitch").bind("click", function(e) {
		if($('#waterSwitchHorizontal').hasClass('offSwitch')){
			$("#waterSwitchHorizontal").stop().animate({'bottom': '105px', 'background': '-webkit-gradient(linear, left top, left bottom, from(#ff3750), color-stop(0.40,rgba(233,20,20,1)), color-stop(0.45,rgba(200,20,20,1)), to(#5f000c))'}, 80, function() {
				$('#waterSwitchHorizontal').removeClass("offSwitch"); 
			});
		}
		else {
			$("#waterSwitchHorizontal").stop().animate({'bottom': '45px', 'background': '-webkit-gradient(linear, left top, left bottom, from(#999), color-stop(0.40,rgba(153,153,153,1)), color-stop(0.45,rgba(130,130,130,1)), to(#333))'}, 80, function() {
				$('#waterSwitchHorizontal').addClass("offSwitch"); 
			});
		}
	});
};
bindHeatSwitch();

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
				$("#centerGraphLandscape").stop().css('margin-left', leftMargin);
			}
		}
		else {
			if(leftMargin <= -2400) return;
			else {
				leftMargin -= 800;
				setIndicator(leftMargin);
				$("#centerGraphLandscape").stop().css('margin-left', leftMargin);
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
				$("#thermCenterGraphLandscape").stop().css('margin-left', leftMargin);
			}
		}
		else {
			if(leftMargin <= -2400) return;
			else {
				leftMargin -= 800;
				setIndicator(leftMargin);
				$("#thermCenterGraphLandscape").stop().css('margin-left', leftMargin);
			}
		}
	});
};
bindThermGraphButtons();

var bindSunGraphButtons = function() {
	$(".sunArrow").bind("click", handler = function(e) {
		var leftMargin = $("#sunCenterGraphLandscape").css("margin-left");
		leftMargin = leftMargin.substring(0, leftMargin.length-2);
		leftMargin = parseInt(leftMargin);
		leftMargin = leftMargin - leftMargin%800;
		console.log("landscape element has a margin of " + leftMargin);
		var setIndicator = function(leftMargin) {
			var indicator;
			if(leftMargin == 0) indicator = "sunIndicator1";
			if(leftMargin == -800) indicator = "sunIndicator2";
			if(leftMargin == -1600) indicator = "sunIndicator3";
			if(leftMargin == -2400) indicator = "sunIndicator4";
			$('.sunIndicator').removeClass('indicating');
			$('#'+indicator).addClass('indicating');
		}
		if(this.id == "sunLeftArrow") {
			if(leftMargin >= 0) return;
			else {
				leftMargin += 800;
				setIndicator(leftMargin);
				$("#sunCenterGraphLandscape").stop().css('margin-left', leftMargin);
			}
		}
		else {
			if(leftMargin <= -2400) return;
			else {
				leftMargin -= 800;
				setIndicator(leftMargin);
				$("#sunCenterGraphLandscape").stop().css('margin-left', leftMargin);
			}
		}
	});
};
bindSunGraphButtons();

var bindWaterGraphButtons = function() {
	$(".waterArrow").bind("click", handler = function(e) {
		var leftMargin = $("#waterCenterGraphLandscape").css("margin-left");
		leftMargin = leftMargin.substring(0, leftMargin.length-2);
		leftMargin = parseInt(leftMargin);
		leftMargin = leftMargin - leftMargin%800;
		console.log("landscape element has a margin of " + leftMargin);
		var setIndicator = function(leftMargin) {
			var indicator;
			if(leftMargin == 0) indicator = "waterIndicator1";
			if(leftMargin == -800) indicator = "waterIndicator2";
			if(leftMargin == -1600) indicator = "waterIndicator3";
			if(leftMargin == -2400) indicator = "waterIndicator4";
			$('.waterIndicator').removeClass('indicating');
			$('#'+indicator).addClass('indicating');
		}
		if(this.id == "waterLeftArrow") {
			if(leftMargin >= 0) return;
			else {
				leftMargin += 800;
				setIndicator(leftMargin);
				$("#waterCenterGraphLandscape").stop().css('margin-left', leftMargin);
			}
		}
		else {
			if(leftMargin <= -2400) return;
			else {
				leftMargin -= 800;
				setIndicator(leftMargin);
				$("#waterCenterGraphLandscape").stop().css('margin-left', leftMargin);
			}
		}
	});
};
bindWaterGraphButtons();

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
				$("#historyCenterGraphLandscape").stop().css('margin-left', leftMargin);
			}
		}
		else {
			if(leftMargin <= -1440) return;
			else {
				leftMargin -= 480;
				setIndicator(leftMargin);
				$("#historyCenterGraphLandscape").stop().css('margin-left', leftMargin);
			}
		}
	});
};
bindHistoryGraphButtons();

var bindMonitorSelectorButtons = function() {
	$(".glossy").bind("click", handler = function(e) {
		$('.glossy').removeClass('selected');
		$('#'+this.id).addClass('selected');
		//do something else
	});
};
bindMonitorSelectorButtons();

// perhaps a touch gesture listener which allows for pageflipping through the subpages
