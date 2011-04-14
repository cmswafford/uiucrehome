<?php
class DB
{
  protected static $aQueries = array();
  protected static $aConnections = null;

  public static function connect ( $sHost, $sUsername, $sPassword, $sDBName = 'uiucsd' )
  {
    self::$aConnections['uiucsd'] = mysql_connect( $sHost, $sUsername, $sPassword );
    mysql_select_db($sDBName);
    return self::$aConnections['uiucsd'];
  }

  public static function query( $sql, $aOptions=array() )
  {
    $rs = mysql_query($sql, self::$aConnections['uiucsd']);
    if( !$rs )
      throw new Exception( "query: $sql.\n mysql said: ".mysql_error() );

    self::$aQueries[] = array('sql' => $sql, 'error' => mysql_error() );

    $r = $rs;
    if( isset($aOptions['return']) ):
      switch( $aOptions['return'] )
      {
        case 'num_rows':
          $r = mysql_num_rows($rs);
        break;

        default:
      }
    endif;

    return $r;
  }

  # getQueries ()
  #
  # This function is used to return all queries that have been run since opening the mysql connection
  #
  public static function getQueries()
  {
    return self::$aQueries;
  }


  # db_safe ()
  #
  # This function is used to make safe inputs destined for MySQL queries
  # i.e. guard against XSL
  #
  # Function returns escaped text if necessary or explicity required.
  #
  public static function db_safe ( $mValue, $bForceQuotes = false )
  {
    # Stripslashes if magic_quotes_gpc is on.
    if( get_magic_quotes_gpc() )
      $mValue = stripslashes( $mValue );
    
    # If numeric, do not quote.
    if( !is_numeric($mValue) || $bForceQuotes !== false )
      $mValue = "'".mysql_real_escape_string($mValue)."'";
    if( is_null($mValue) )
      $mValue = 'NULL';
      
    
    return $mValue;
  } # end db_safe()
}
