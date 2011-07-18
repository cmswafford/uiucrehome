
<?php
include '../../lib/misc/functions.php';
require_once( '/home/uiucsd/www/uiucrehome/lib/http/bootstrap.php' );

function relayOn( $relay ){
	$handle = fopen("logger.txt", "a+"); 
	$path = "../../can2go/bacwp ";
	$deviceNum = $relay + 120;
	$pressPropertyNum = $relay + 40;
	$statePropertyNum = $relay + 20;
	$args[0] = $deviceNum .  " 4 " . $pressPropertyNum . " 85 0 -1 9 1"; 
	$args[1] = $deviceNum .  " 4 " . $statePropertyNum . " 85 0 -1 9 1"; 
	fwrite($handle, ("Turning on device #".$deviceNum.date(' l jS \of F Y h:i:s A')."\n"));
	$output = array();
	$tries = 0;
	$success = "WriteProperty Acknowledged!";
	$retString = "";
	while($retString != $success && $tries < 3) {   
	    exec("$path$args[0]", $output);
  	    if(count($output) > 1) $retString = $output[1];
	    $tries = $tries + 1;
	}
	if($retString != $success) return -1;
	$retString = "";
	$tries = 0;
	$output = array();
        while($retString != $success && $tries < 3) { 
	    exec("$path$args[1]", $output);
	    if(count($output) > 1) $retString = $output[1];
	    $tries = $tries + 1; 
	}
	if($retString != $success) {
		return -1;
	}
	else {
		//connect to db, update state
		$sql = "UPDATE `Relay_states` SET STATE = 1 WHERE Device_ID = " . strval($relay);
		if ( !$resource = DB::query($sql) ) {
      			echo mysql_error();
      			return -1;
    		}
	}
}

if ( !isset($_POST['device']) || empty($_POST['device']) ) { 
	fwrite($handle, ("Error, No Relay Selected".date(' l jS \of F Y h:i:s A')."\n"));
	return -1;
}
else { 
	$relay = $_POST['device'];
	$relay = intval($relay);
	if ($relay > 0 && $relay < 13) {
		relayOn( $relay );	
	}
	else {
		fwrite($handle, ("Invalid Relay Selected".date(' l jS \of F Y h:i:s A')."\n"));
		return -1;
	}
}
	
