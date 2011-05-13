#! /usr/bin/php5
<?php

# This script is called with at least 3 arguments
# The first argument is what type of logging to complete: power, temperature, or water
# The second argument is the device_id
# All arguments after are the data values for each type of log

require_once( '../lib/http/bootstrap.php' );

$aData = array();
$aData['device_id'] = $argv[2];

switch( $argv[1] )
{
  case 'power':
	$aData['RMS_voltage'] = $argv[3];
	$aData['RMS_current'] = $argv[4];
	$aData['apparent_power'] = $argv[5];
	$aData['real_power'] = $argv[6];
	$aData['PF'] = $argv[7];
	$aData['PF_angle'] = $argv[8];
    $oPowerLogs->create($aData);
  break;

  case 'temperature':
	$aData['value'] = $argv[3];
    $oTemperatureLogs->create($aData);
  break;

  case 'water':
	$aData['value'] = $argv[3];
    $oWaterLogs->create($aData);
  break;

  default:
}

echo $oPowerLogs->getLastQuery()."\n\n";
echo $oTemperatureLogs->getLastQuery()."\n\n";
echo $oWaterLogs->getLastQuery()."\n\n";
