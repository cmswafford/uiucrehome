#! /usr/bin/php5
<?php

require_once( '../lib/http/bootstrap.php' );

$oCategory = new Categories();
$oDevice = new Devices();

$aMetaData = array();
$aMetaData['lifetime'] = 1000;
$aMetaData['manufacturer'] = 'GE';

$aData = array();
$aData['category_id'] = 1;
$aData['room_id'] = 2;
$aData['metadata'] = serialize($aMetaData);
$iDeviceID = $oDevice->create($aData);
echo $oDevice->getLastQuery()."\n\n";

echo "Inserted device $iDeviceID";
