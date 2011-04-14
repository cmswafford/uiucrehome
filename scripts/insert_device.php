#! /usr/bin/php5
<?php

# This script may be called with 2 required arguments and 1 optional arguments
# The first argument is the category_id
# The second argument is the room_id
# The optional argument is the metadata

require_once( '../lib/http/bootstrap.php' );
$aData = array();

# Prompt for the category
if( $argc < 2 )
{
  echo "Select a category.\n";
  $aCategories = $oCategories->select();
  foreach( $aCategories as $k => $aCategory )
  {
    echo $aCategory['category_id'].'. '.$aCategory['category_name']."\n";
  }
  $aData['category_id'] = trim(fgets(STDIN));
}
else
  $aData['category_id'] = $argv[1];

echo "\n";

# Prompt for the room
if( $argc < 3 )
{
  echo "Select a room.\n";
  $aRooms = $oRooms->select();
  foreach( $aRooms as $k => $aRoom )
  {
    echo $aRoom['room_id'].'. '.$aRoom['room_name']."\n";
  }
  $aData['room_id'] = trim(fgets(STDIN));
}
else
  $aData['room_id'] = $argv[2];

if( $argc >= 4 )
  $aData['metadata'] = $argv[3];
$iDeviceID = $oDevices->create($aData);
echo "\n".$oDevices->getLastQuery()."\n\n";
echo "Inserted device $iDeviceID";

echo "\n";
