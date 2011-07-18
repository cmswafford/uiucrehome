
<?php

require_once( '/home/uiucsd/www/uiucrehome/lib/http/bootstrap.php' );

$query = "SELECT timestamp, alias FROM door_states WHERE state = 0 and device_id = 201";
$result = mysql_query($query) or die(mysql_error());

while($row = mysql_fetch_array($result)) {

	//SHOW NOTIFICATION IF DOOR OR WINDOW IS OPEN MORE THAN 30 SECONDS
	if( (time() - strtotime($row['timestamp'])) > 30 ) {
		if($aNotifications[ $row['alias'] ] === 0) {
			$aNotifications[ $row['alias'] ] = 1;
			$aNotifyReturn[] = $row['alias'] . " is open";
		}
	}
}

$query = "SELECT alias FROM door_states WHERE state = 1";
$result = mysql_query($query) or die(mysql_error());

while($row = mysql_fetch_array($result)) {
	$aNotifications[ $row['alias'] ] = 0;
}

echo json_encode($aNotifyReturn);

?>
