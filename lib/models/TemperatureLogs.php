<?php

class TemperatureLogs extends dbObject
{
  protected $sTable    = 'temperature_logs';
  protected $aColumns  = array( 'temperature_log_id'
                               ,'device_id'
                               ,'value'
                               ,'created_at'
                              );
  protected $sID       = 'temperature_log_id';

  public function __construct( $aOptions = array() )
  {
    return true;
  }
}
