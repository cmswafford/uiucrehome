<?php
require_once ( "bootstrap.php" );

# Start session
session_start();
//require_once ( LIB."http/session.class.php" );
//$session    = new session();

if( $aConfig['debug'] === true )
{
  require_once(LIB.'misc/FirePHP.class.php');
  $oFirePHP = FirePHP::getInstance(true);
}

# Turn on header.html, footer.html and $_GET['file'].html
$aConfig['html']             = true;
$aConfig['display_header']   = true;
$aConfig['display_html']     = true;
$aConfig['display_footer']   = true;

$aJS = array();
$aCSS = array();

# Instantiate stdout logger as $debug
$oDebug = new Logger('stdout');
$sFeedback = '';

ob_start();

?>
