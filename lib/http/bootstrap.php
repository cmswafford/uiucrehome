<?php

# Set the start microtime ASAP
$fMicroStart = microtime();
list ( $fMicroSecs, $fSecs ) = explode ( " ", $fMicroStart );
define ( "START_TIME", $fMicroStart+$fSecs );

require_once( dirname(__FILE__).'/../../config/config.php' );
require_once( $aConfig['config_path'].'constants.php' );
require_once( LIB.'misc/functions.php' );

# Set error reporting options
if( $aConfig['debug'] === true )
{
  ini_set('display_errors',1);
  error_reporting(E_ALL);
}
elseif( $aConfig['env'] == 'production' )
  ini_set('display_errors',0);

# Start logger
require_once ( LIB."misc/Logger.class.php" );
$oLog   = new Logger( ROOT_PATH.'log/default.log' );

# Start DB
require_once(LIB.'misc/DB.php');
require_once(LIB.'misc/dbObject.php');

$oCategories      = new Categories();
$oRooms           = new Rooms();
$oDevices         = new Devices();
$oPowerLogs       = new PowerLogs();
$oTemperatureLogs = new TemperatureLogs();
$oWaterLogs       = new WaterLogs();

$rDB = DB::connect( $aConfig['mysql']['host'], $aConfig['mysql']['user'], $aConfig['mysql']['password'], $aConfig['mysql']['database'] );
unset($aConfig['mysql']['password']); # Not good to have this info floating around ;)
