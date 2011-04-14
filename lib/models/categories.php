<?php

class Categories extends dbObject
{
  protected static $sTable    = 'categories';
  protected static $aColumns  = array( 'category_id'
                                     ,'category_name'
                                    );
  protected static $sID       = 'category_id';

}
