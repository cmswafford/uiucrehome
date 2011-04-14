<?php

class Devices extends dbObject
{
  protected $sTable    = 'devices';
  protected $aColumns  = array( 'device_id'
                               ,'category_id'
                               ,'room_id'
                               ,'off_or_on'
                               ,'metadata'
                              );
  protected $sID       = 'device_id';

  public function __construct( $aOptions = array() )
  {
    return true;
  }
}
