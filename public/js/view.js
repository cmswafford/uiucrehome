/**
 * @author Daniel
 */

$(document).ready(function() { 
	$('.clock').jclock();

  var handleGetPortalGraphs = function( response ) { setCharts(response); };
  $.ajax({ url: 'ajax/initPortalGraphs.php', data: { foo: 'bar' }, success: handleGetPortalGraphs });

 // setCharts(cd);
	setThermCharts();
	sethistoryCharts();
	setSunCharts();
	setWaterCharts();
	setTimeout(function() {
		$('#bod').removeClass('startUp');
		$('#landscape').removeClass('inactive');
	}, 4000);
  
});
