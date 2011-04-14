/**
 * @author Daniel
 */

var WWW = 'http://uiucsd';

$(document).ready(function() { 
	$('.clock').jclock();

  var handleGetPortalGraphs = function( response ) { setCharts(response); };
  $.ajax({ url: WWW+'/ajax/initPortalGraphs.php', data: { foo: 'bar' }, success: handleGetPortalGraphs });

 // setCharts(cd);
	setThermCharts();
	sethistoryCharts();
});
