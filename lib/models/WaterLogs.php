<?php

class WaterLogs extends dbObject
{
  protected $sTable    = 'water_logs';
  protected $aColumns  = array( 'water_log_id'
                               ,'device_id'
                               ,'value'
                               ,'created_at'
                              );
  protected $sID       = 'water_log_id';

  public function __construct( $aOptions = array() )
  {
    return true;
  }
}
