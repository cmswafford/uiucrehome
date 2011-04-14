
<?php

class Rooms extends dbObject
{
  protected $sTable    = 'rooms';
  protected $aColumns  = array( 'room_id'
                               ,'room_name'
                              );
  protected $sID       = 'room_id';

  public function __construct( $aOptions = array() )
  {
    return true;
  }
}
