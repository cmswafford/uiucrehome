<?php

require_once( '/home/uiucsd/www/uiucrehome/lib/http/bootstrap.php' );

if ( !isset($_POST['status']) || empty($_POST['status']) ) { 
	echo "No Status Sent\n";
}
else { 
	$aGUIStatus = json_decode(stripslashes($_POST['status']), true);

	$aOptions['order_by'] = 'Device_ID';
	$aStates = $oRelays->select($aOptions);
        

	// Get log data
	$index = 1;
	foreach( $aStates as $k => $aRow )
	{
	  $aGUIStatus[$index] = intVal($aStates[$k]['STATE']);
	  $index = $index + 1;
	}

	echo json_encode($aGUIStatus);

}
