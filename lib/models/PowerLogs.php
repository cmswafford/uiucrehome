<?php

class PowerLogs extends dbObject
{
  protected $sTable    = 'power_logs';
  protected $aColumns  = array( 'power_log_id'
                               ,'device_id'
                               ,'RMS_voltage'
                               ,'RMS_current'
                               ,'apparent_power'
                               ,'real_power'
                               ,'PF'
                               ,'PF_angle'
                               ,'created_at'
                              );
  protected $sID       = 'power_log_id';

  public function __construct( $aOptions = array() )
  {
    return true;
  }
}
