/**
 * The view Script sets up all the necessary view components
 * @author Dan Mestas, Mark Swafford
 * @date Spring 2011
 */

/*
 * This calls all the contained functions when the document is ready
 * which means that the DOM tree has been loaded
 */
$(document).ready(function() { 
	/*
	 * Runs the jquery.clock script in order to fetch the date and time widgets for 
	 * all the pages which contain it
	 */
	$('.clock').jclock();

  var handleGetPortalGraphs = function( response ) { setCharts(response); };
  $.ajax({ url: 'ajax/initPortalGraphs.php', data: { foo: 'bar' }, success: handleGetPortalGraphs });

 	/*
 	 * These functions set up all of the charts necessary to be displayed
 	 * they are placeholders for now, eventually they will receive data 
 	 * from the above ajax call and be populated with relevant data
 	 */
	setThermCharts();
	sethistoryCharts();
	setSunCharts();
	setWaterCharts();
	drawFloorPlan();
	/*
	 * This function will display a splashscreen for 4 seconds which should be
	 * enough time for the charts to receive their data and be rendered
	 */
	setTimeout(function() {
		$('#bod').removeClass('startUp');
		$('#landscape').removeClass('inactive');
	}, 4000);
  
});
