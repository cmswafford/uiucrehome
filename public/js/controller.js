/**
 * This script sets up all the events for all clickable elements
 * in the application except for the floorplan widget which is handled in 
 * floorplan.js 
 * 
 * @author Daniel Mestas <dan5446@gmail.com>
 * @netid mestas1
 * @date Spring 2011
 */

/**
 * Prevent default horizontal scrolling behavior of the iPad 
 * please leave this one alone, it makes the iPad behave correctly 
 * in webapp mode  
 */
document.body.addEventListener('touchmove', function(e) {
	  // This prevents native scrolling from happening.
	  e.preventDefault();
}, false);

/**
 * Portal Page link handler
 * This controller simply routes the user to the correct page 
 * or back to the home page.
 */
var bindNavigationButtons = function() {
	$(".button").bind("click", function(e) {
		var requestedID = this.id;
		requestedID = "#" + requestedID;
		requestedID = requestedID.substr(0, requestedID.length - 4);
		var offset = -788;
		if(requestedID == "#portal") {
			clearInterval(statusCheck);
			offset = 0;
		}
		else if(requestedID == '#monitor') {
			getRelayStates();
			statusCheck = setInterval('getRelayStates()', 3000);
			// Get other pertainant info
		}
		$("#landscape").stop().animate({'opacity': 0.0}, 400, function() {
			$('.subpage').addClass("inactive"); 
			$(requestedID).removeClass("inactive");
			$("#landscape").css('margin-top', offset);
			$("#landscape").animate({"opacity": 1.0}, 400);
		});
	});
};
bindNavigationButtons();

/**
 * This controller sets the view when the temperature widgets on the hvac page are set
 * Add logic to send the message to the server in order to control the device.
 */
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

/**
 * This controller sets the interactions for the category selectors
 * on the energy monitoring page, setting the category name and hilighting the
 * appropriate devices. Add logic here to recalculate the details and 
 * repopulate the graphs accordingly.
 */
var bindCategoryButtons = function() {
	$(".category").bind("click", function(e) {
		var requestedID = this.id;
		$('.device').removeClass('deviceSelected');
		if (requestedID == 'homeCategory') {
			$('#space').html("<h3>Entire House</h3>");
			$('.device').addClass('deviceSelected');
			$('.lightSwitch').addClass('inactive');
			Cufon.replace('h3', {fontFamily: 'Thin'});
			//etc
		}
		else if (requestedID == 'lightingCategory') {
			$('#space').html("<h3>All Lights</h3>");
			$('.light').addClass('deviceSelected');
			$('.lightSwitch').addClass('inactive');
			Cufon.replace('h3', {fontFamily: 'Thin'});
			//etc
		}
		else if (requestedID == 'appliancesCategory') {
			$('#space').html("<h3>All Appliances</h3>");
			$('.appliance').addClass('deviceSelected');
			$('.lightSwitch').addClass('inactive');
			Cufon.replace('h3', {fontFamily: 'Thin'});
			//etc
		}
	});
};
bindCategoryButtons();

/**
 * This is the controller for the device globes on the energy monitoring page
 * it reports the device name to the details box and sets the switch if it is a light
 * Add logic here to control and rebuild the graphs accordingly 
 */
var bindDeviceButtons = function() {
	$(".device").bind("click", function(e) {
		$('#space').html("<h3>"+this.title+"</h3>");
		$('.device').removeClass('deviceSelected');
		Cufon.replace('h3', {fontFamily: 'Thin'});
		$('#'+this.id).addClass('deviceSelected');
		if ($('#'+this.id).hasClass('light')) {
			if($('#'+this.id).hasClass('inUse')){
				$('#lightSwitchHorizontal').removeClass('offSwitch');
				$('#lightSwitchHorizontal').addClass('onSwitch');
				$('.lightSwitchText').html('ON');
				Cufon.replace('h2', {fontFamily: 'Helvetica Neue Time'});
			}
			if($('#'+this.id).hasClass('off')){
				$('#lightSwitchHorizontal').addClass('offSwitch');
				$('#lightSwitchHorizontal').removeClass('onSwitch');
				$('.lightSwitchText').html('OFF');
				Cufon.replace('h2', {fontFamily: 'Helvetica Neue Time'});
			}
			$('.lightSwitch').removeClass('inactive');
		}
		else {
			$('.lightSwitch').addClass('inactive');
		}
		//etc
	});
};
bindDeviceButtons();

/**
 * This function binds the events for the switches both on the water monitoring 
 * and the energy monitoring pages. 
 */
var aRequestQueue = [0,0,0,0,0,0,0,0,0,0,0,0,0];
var bindSwitches = function() {
	$(".hSwitch").bind("click", function(e) {
 		clearInterval(statusCheck);
		setTimeout('setInterval("getRelayStates()", 3000)', 5000);
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
	$(".hLightSwitch").bind("click", function(e) {
		if($('#lightSwitchHorizontal').hasClass('offSwitch')){
			$("#lightSwitchHorizontal").stop().addClass('onSwitch');
			$('#lightSwitchHorizontal').removeClass("offSwitch"); 
			$('.lightSwitchText').html('ON');
			Cufon.replace('h2', {fontFamily: 'Helvetica Neue Time'});
			var dev_id = $(".deviceSelected").attr('id');
			dev_id = dev_id.slice(2);
			dev_id = parseFloat(dev_id);
			// Ajax call to lightsOn.php with dev_id as argument
			// if it returns -1 it was a failure, so reset the switch
			if (aRequestQueue[dev_id] == 1) {
				$("#lightSwitchHorizontal").stop().addClass('offSwitch');
				$('#lightSwitchHorizontal').removeClass("onSwitch"); 
				$('.lightSwitchText').html('OFF');
				Cufon.replace('h2', {fontFamily: 'Helvetica Neue Time'});
			}
			else {
				aRequestQueue[dev_id] = 1;
				$.ajax({
					url: "/ajax/lightsOn.php",
					data: {device: dev_id},
					type: "POST",
					success: function(data) {
						$('.deviceSelected').removeClass('off');
						$('.deviceSelected').addClass('inUse');
						aRequestQueue[dev_id] = 0;
						floorplanStatus[dev_id] = 1;
					}
				});
			}
			
		}
		else {
			$("#lightSwitchHorizontal").stop().addClass('offSwitch');
			$('#lightSwitchHorizontal').removeClass("onSwitch"); 
			$('.lightSwitchText').html('OFF');
			Cufon.replace('h2', {fontFamily: 'Helvetica Neue Time'});
			var dev_id = $(".deviceSelected").attr('id');
			dev_id = dev_id.slice(2);
			dev_id = parseFloat(dev_id);
			// Ajax call to lightsOut.php with dev_id as argument
			// if it returns -1 it was a failure, so reset the switch
			if (aRequestQueue[dev_id] == 1) {
				$("#lightSwitchHorizontal").stop().addClass('onSwitch');
				$('#lightSwitchHorizontal').removeClass("offSwitch"); 
				$('.lightSwitchText').html('ON');
				Cufon.replace('h2', {fontFamily: 'Helvetica Neue Time'});
			}			
			else {
				aRequestQueue[dev_id] = 1;
				$.ajax({
					url: "/ajax/lightsOut.php",
					data: {device: dev_id},
					type: "POST",
					success: function(data) {
						$('.deviceSelected').removeClass('inUse');
						$('.deviceSelected').addClass('off');
						aRequestQueue[dev_id] = 0;
						floorplanStatus[dev_id] = 0;
					}
				});
			}
		}
	});
};
bindSwitches();

/**
 * This is the controller for the graph buttons on the portal page
 */
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
			if(leftMargin >= 0) leftMargin = -3200;
			leftMargin += 800;
			setIndicator(leftMargin);
			$("#centerGraphLandscape").stop().css('margin-left', leftMargin);
		}
		else {
			if(leftMargin <= -2400) leftMargin = 800;
			leftMargin -= 800;
			setIndicator(leftMargin);
			$("#centerGraphLandscape").stop().css('margin-left', leftMargin);
		}
	});
};
bindGraphButtons();

/**
 * This is the controller for the graph buttons on the hvac page
 */
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
			if(leftMargin >= 0) leftMargin = -3200;
			leftMargin += 800;
			setIndicator(leftMargin);
			$("#thermCenterGraphLandscape").stop().css('margin-left', leftMargin);
		}
		else {
			if(leftMargin <= -2400) leftMargin = 800;
			leftMargin -= 800;
			setIndicator(leftMargin);
			$("#thermCenterGraphLandscape").stop().css('margin-left', leftMargin);
		}
	});
};
bindThermGraphButtons();

/**
 * This is the controller for the graph buttons on the solar panels page
 */
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
			if(leftMargin >= 0) leftMargin = -3200;
			leftMargin += 800;
			setIndicator(leftMargin);
			$("#sunCenterGraphLandscape").stop().css('margin-left', leftMargin);
		}
		else {
			if(leftMargin <= -2400) leftMargin = 800;
			leftMargin -= 800;
			setIndicator(leftMargin);
			$("#sunCenterGraphLandscape").stop().css('margin-left', leftMargin);
		}
	});
};
bindSunGraphButtons();

/**
 * This is the controller for the graph buttons on the water monitoring page
 */
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
			if(leftMargin >= 0) leftMargin = -3200;
			leftMargin += 800;
			setIndicator(leftMargin);
			$("#waterCenterGraphLandscape").stop().css('margin-left', leftMargin);
		}
		else {
			if(leftMargin <= -2400) leftMargin = 800;
			leftMargin -= 800;
			setIndicator(leftMargin);
			$("#waterCenterGraphLandscape").stop().css('margin-left', leftMargin);
		}
	});
};
bindWaterGraphButtons();

/**
 * This is the controller for the graph buttons on the energy monitoring page
 */
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
			if(leftMargin >= 0) leftMargin = -1920;
			
			leftMargin += 480;
			setIndicator(leftMargin);
			$("#historyCenterGraphLandscape").stop().css('margin-left', leftMargin);
		}
		else {
			if(leftMargin <= -1440) leftMargin = 480;
			
			leftMargin -= 480;
			setIndicator(leftMargin);
			$("#historyCenterGraphLandscape").stop().css('margin-left', leftMargin);
		}
	});
};
bindHistoryGraphButtons();

/**
 * This controls the chart selectors on the energy monitoring page
 * it grabs the appropriate graphs corresponding to the users selection 
 */
var bindMonitorSelectorButtons = function() {
	$(".glossy").bind("click", handler = function(e) {
		$('.glossy').removeClass('selected');
		$('#'+this.id).addClass('selected');
		//do something else
		switch (this.id) {
			case 'history': 
				if(selectedType != this.id) {
					selectedType = this.id;
					sethistoryCharts();
				}
			break;
			case 'breakdown':
				if(selectedType != this.id) {
					selectedType = this.id;
					setBreakdownCharts();
				}
			break;
			case 'barGraphs':
				if(selectedType != this.id) {
					selectedType = this.id;
					setBarCharts();
				}
			break;
			case 'other': 
				if(selectedType != this.id) {
					selectedType = this.id;
					setOtherCharts();
				}
			break;
			default:
			break;
		}
	});
};
bindMonitorSelectorButtons();

/**
 * Simple controller for the notification system this simply shows
 * and hides the notification pane as necessary
 */
var bindNotifyButton = function() {
	$("#notifyButton").bind("click", handler = function(e) {
		$('#notify').addClass('inactive');
	});
	$("#portalLogo").bind("click", handler = function(e) {
		$('#notify').removeClass('inactive');
	});
};
bindNotifyButton();
