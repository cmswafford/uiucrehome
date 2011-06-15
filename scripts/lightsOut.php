#! /usr/bin/php5
<?php
include '../lib/misc/functions.php';
function relayOff( $relay ){
	$path = "../can2go/bacwp ";
	$deviceNum = $relay + 120;
	$pressPropertyNum = $relay + 40;
	$statePropertyNum = $relay + 20;
	$args[0] = $deviceNum .  " 4 " . $pressPropertyNum . " 85 0 -1 9 1"; 
	$args[1] = $deviceNum .  " 4 " . $statePropertyNum . " 85 0 -1 9 0"; 
	//echo "\n" . $path . $args[0] . "\n" . $path . $args[1] . "\n";
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
	if($retString != $success) return -1;
	else return 0;
}

if ( $argc < 2 ) { 
	//echo "No Relay Selected\n";
	return -1;
}
else { 
	$relay = $argv[1];
	$relay = intval($relay);
	if ($relay > 0 && $relay < 13) {
	//	echo "\nRelay " .  $relay . " Selected For Turning Off\n\n";
		relayOff( $relay );	
	}
	else {
	//	echo "\nInvalid Relay Selected\n\n";
		return -1;
	}
}
	
