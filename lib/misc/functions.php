<?php

function parseArray( $aArray )
{
  foreach( $aArray as &$v )
  {
    if( is_array($v) )
      $v = parseArray($v);
    if( is_bool($v) )
    {
      if( $v === true )
        $v = 'true';
      elseif( $v === false )
        $v = 'false';
    }
  }

  return $aArray;
}

function dump( $arg, $bReturn = false, $bNL2BR = false )
{
  ob_start();
  if( is_array($arg) )
  {
    if( $bReturn === true && $bNL2BR !== true )
      print_r(parseArray($arg));
    else
      echo '<pre>'.print_r(parseArray($arg),true).'</pre>';
  }
  elseif( is_string($arg) || is_numeric($arg) )
    echo $arg;
  elseif( is_null($arg) )
    echo 'NULL';
  else
    var_dump($arg);

  if( $bReturn === true )
    return ob_get_clean();
  else
    ob_end_flush();
}

# Autoload classes
function __autoload($sClassName)
{
  if( file_exists( LIB.'/models/'.$sClassName.'.php') )
    require_once( LIB.'/models/'.$sClassName.'.php' );
}
