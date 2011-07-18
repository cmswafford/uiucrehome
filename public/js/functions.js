var floorplanStatus = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var deviceList = ['#d0000', '#d0001', '#d0002', '#d0003', '#d0004', '#d0005', '#d0006', '#d0007', '#d0008', '#d0009', '#d0010', '#d0011', '#d0012', '#d0013', '#d0014', '#d0015', '#d0016', '#d0017', '#d0018', '#d0019', '#d0020'];

var getRelayStates = function() {
	//make ajax call recieve an array of states for all of the devices to show on the monitor page
	var status = JSON.stringify(floorplanStatus);
	$.ajax({
		url: "/ajax/floorplanStatus.php",
		data: {'status': status},
		type: "POST",
		success: function(data) {
			if ( data != JSON.stringify(floorplanStatus) ) {
				//alert(data);
				floorplanStatus = eval(''+ data +'');
				for (i = 0; i < 21; i++) {
					if( floorplanStatus[i] == 0 ) {
						$(deviceList[i]).removeClass('inUse');
						$(deviceList[i]).addClass('off');
					}
					else {
						$(deviceList[i]).addClass('inUse');
						$(deviceList[i]).removeClass('off');
					}
				}
				//alert('new Status: ' + floorplanStatus);
			}

		}
	});
};

var notifications = new Array();
var notifyList;
var notificationsPoller = function() {
	//make ajax call recieve an array of notification messages to display to the user for at least 20 seconds
	$.ajax({
		url: "/ajax/notify.php",
		type: "POST",
		success: function(data) {
			notifyList = eval(''+ data +'');
			var init = 0;
			for(var i=0; i < notifyList.length; i++) {
				for(var j = 0; j < notifications.length; j++) {
					if(notifyList[i] == notifications[j]) {
						init = 1;
					} 
				}
				if(init == 0) {
					$('#notify').removeClass('inactive');
					break;
				}
			}
			notifications = notifyList;
			//update notifications pane			
			var open = '<ul><li><div class="alert floatLeft"></div><h2>';
			var close = '</h2></li></ul>';
			$("#wrapper").html("");

			var line = "";
			for(var i=0; i < notifications.length; i++) {
				console.log(notifications[i]);
				line = line + open + notifications[i] + close + "\n";
			}
			$("#wrapper").html(line);
			Cufon.replace('h2', {fontFamily: 'Helvetica Neue Time'});
		}
	});

};
