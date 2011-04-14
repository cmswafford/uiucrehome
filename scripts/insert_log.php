#! /usr/bin/php5
<?php

# This script is called with 4 arguments
# The first argument is what type of logging to complete: power, temperature, or water
# The second argument is the device_id
# The third argument is the value

require_once( '../lib/http/bootstrap.php' );

$aData = array();
$aData['device_id'] = $argv[2];
$aData['value'] = $argv[3];

switch( $argv[1] )
{
  case 'power':
    $oPowerLogs->create($aData);
  break;

  case 'temperature':
    $oTemperatureLogs->create($aData);
  break;

  case 'water':
    $oWaterLogs->create($aData);
  break;

  default:
}

echo $oPowerLogs->getLastQuery()."\n\n";
echo $oTemperatureLogs->getLastQuery()."\n\n";
echo $oWaterLogs->getLastQuery()."\n\n";
