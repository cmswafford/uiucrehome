<?php

class Categories extends dbObject
{
  protected $sTable    = 'categories';
  protected $aColumns  = array( 'category_id'
                               ,'category_name'
                              );
  protected $sID       = 'category_id';

  public function __construct( $aOptions = array() )
  {
    return true;
  }
}
