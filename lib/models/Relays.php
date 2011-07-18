
<?php

class Relays extends dbObject
{
  protected $sTable    = 'Relay_states';
  protected $aColumns  = array( 'Device_ID','STATE' );
  protected $sID       = 'Device_ID';

  public function __construct( $aOptions = array() )
  {
    return true;
  }
}
