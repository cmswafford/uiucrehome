<?php

require_once(__DIR__.'/../http/bootstrap.php');

$oLog->log_msg("\n------CLI FILE: ".$argv[1]).'------';

if( $argc > 1 )
{
  # Check in cron directory
  if( file_exists(CRON_PATH.$argv[1].'.php') && is_readable(CRON_PATH.$argv[1].'.php') )
    include(CRON_PATH.$argv[1].'.php');
  # Relative to project directory
  elseif( file_exists(ROOT_PATH.$argv[1]) && is_readable(ROOT_PATH.$argv[1]) ) 
    include(ROOT_PATH.$argv[1]);
  # Check if file exists -- hopefully a full path
  elseif( file_exists($argv[1]) && is_readable($argv[1]) ) 
    include($argv[1]);
  # Check if file exists and the user left off .php
  elseif( file_exists($argv[1].'.php') && is_readable($argv[1].'.php') )
    include($argv[1].'.php');
}

$oLog->log_msg("------END CLI FILE: ".$argv[1]."------\n");
?>
