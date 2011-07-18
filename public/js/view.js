/**
 * The view Script sets up all the necessary view components
 * @author Dan Mestas, Mark Swafford
 * @date Spring 2011
 */

// This calls all the contained functions when the document is ready
// which means that the DOM tree has been loaded
var statusCheck;
$(document).ready(function() { 
	 // Runs the jquery.clock script in order to fetch the date and time widgets for 
	 // all the pages which contain it
	$('.clock').jclock();
	setCharts();
	setThermCharts();
	sethistoryCharts();
	setSunCharts();
	setWaterCharts();
	drawFloorPlan();

  // Show splash screen
  setTimeout(function() { $('body').removeClass('startUp'); $('#landscape').removeClass('inactive'); }, 1000);
  
  var myScroll;
	function loaded() { setTimeout(function () { myScroll = new iScroll('wrapper', {hScrollbar:false}); }, 100); };
	window.addEventListener('load', loaded, false);

  statusCheck = setInterval('getRelayStates()', 3000);
  clearInterval(statusCheck);

  var notify = setInterval('notificationsPoller()', 3000);
});


