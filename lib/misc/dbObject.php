<?php
class dbObject
{
  protected $sTable = '';
  protected $aColumns = array();
  protected $sLastQuery;

  public function __construct( $aOptions = array() )
  {
    return true;
  }

  public function select( $aOptions = array() )
  {
    if( is_numeric($aOptions) )
    {
      $iID = $aOptions;
      $aOptions = array();
      //$aOptions['where'] = array( $this->$sID => $iID);
      $aOptions['limit'] = 1;
    }

    # This will return a single associative array instead of a multidimensional array
    if( isset($aOptions['limit']) && $aOptions['limit'] == 1 && !isset($aOptions['single']) )
      $aOptions['single'] = true;

    if( !isset($aOptions['fields']) )
      $sFields = '*';
    else
      $sFields = $aOptions['fields'];

    $sWhere = '';
    if( isset($aOptions['where']) )
    {
      if( is_string($aOptions['where']) )
        $sWhere .= $aOptions['where'];
      elseif( is_array($aOptions['where']) )
      {
        foreach( $aOptions['where'] as $kField => $vValue )
        {
          if( strpos($kField, '.') )
          {
            list($sT, $kField) = explode('.', $kField, 2);
          }
          if( !isset($sT) )
            $sT = $this->sTable;

          if( !$sWhere )
            $sWhere = '1';

          if( is_array($vValue) )
          {
            if( $vValue )
            {
              foreach( $vValue as &$v )
                $v = DB::db_safe($v);
              $sWhere .= ' AND `'.$kField.'` IN ('.implode(',', $vValue).')';
            }
          }
          elseif( substr($vValue, 0, 4) == 'LIKE' )
          {
            $vValue = substr($vValue, 4, strlen($vValue)-4 );
            $sWhere .= ' AND `'.$sT.'`.`'.$kField.'` LIKE '.DB::db_safe($vValue);
          }
          else
            $sWhere .= ' AND `'.$sT.'`.`'.$kField.'` = '.DB::db_safe($vValue);
        } # end foreach
      } # end elseif
    } # end if isset($aOptions['where'])

    $sGroupBy = '';
    if( isset($aOptions['group_by']) )
      $sGroupBy = $aOptions['group_by']; 

    $sOrderBy = '';
    if( isset($aOptions['order_by']) )
      $sOrderBy = $aOptions['order_by']; 

    $sOffset = '';
    if( isset($aOptions['offset']) && is_numeric($aOptions['offset']) ) {
      $sOffset = $aOptions['offset'];
    }

    $sLimit = '';
    if( isset($aOptions['limit']) && is_numeric($aOptions['limit']) ) {
      $sLimit = $aOptions['limit'];
    }

    $sFrom = $this->sTable;
    if( isset($aOptions['from']) && $aOptions['from'] )
      $sFrom = $aOptions['from'];

    $sql = "SELECT $sFields FROM ".$sFrom;
    if( isset($aOptions['left_join']) && is_array($aOptions['left_join']) )
    {
      $sJoinTable = $aOptions['left_join']['table'];
      if( is_array($aOptions['left_join']['fields']) )
      {
        list($sJoinField1, $sJoinField2) = $aOptions['left_join']['fields'];
        $sql .= ' LEFT JOIN '.$sJoinTable.' ON '.$sJoinField1.' = '.$sJoinField2;
      }
      else
        $sql .= ' LEFT JOIN '.$sJoinTable.' USING ('.$aOptions['left_join']['fields'].')';
    }
    if( $sWhere ) {
      $sql .= ' WHERE '.$sWhere;
    }
    if( $sGroupBy ){
      $sql .= ' GROUP BY '.$sGroupBy;
    }
    if( $sOrderBy ){
      $sql .= ' ORDER BY '.$sOrderBy;
    }
    if( $sOffset ) {
      $sql .= ' LIMIT '. $sOffset;
    }
    if( $sLimit )
    {
      if( !$sOffset ) {
        $sql .= ' LIMIT '. $sLimit;
      }
      else {
        $sql .= ','. $sLimit;
      }
    }

    $this->sLastQuery = $sql;

    if( !$r = DB::query($sql) )
    {
      echo mysql_error();
      return false;
    }

    $i = 0;
    $aData = array();
    if($r) while( $aRow = mysql_fetch_assoc($r) )
      $aData[$i++] = $aRow;

    if( isset($aOptions['single']) && $aOptions['single'] === true )
      return $aData[0];
    else
      return $aData;
  }


  public function create( $aData )
  {
    $sColumns = '';
    $sValues = '';
    foreach ( $this->aColumns as $vColumn )
    {
      if( !isset($aData[$vColumn]) )
        continue;

      # Concatenate column
      $sColumns .= $vColumn;
      $sColumns .= ',';

      # Concatenate values
      $sValues .= DB::db_safe($aData[$vColumn]);
      $sValues .= ',';
    }
    # Strip trailing , (comma)
    $sColumns = substr( $sColumns, 0, strlen($sColumns)-1 );
    $sValues = substr( $sValues, 0, strlen($sValues)-1 );

    $sql = "INSERT INTO `$this->sTable` ( $sColumns ) VALUES ( $sValues )"; 
    $this->sLastQuery = $sql;

    if ( !$resource = DB::query($sql) )
    {
      echo mysql_error();
      return false;
    }
    //$aData[$this->sID] = $iInsertID = mysql_insert_id();
    $iInsertID = mysql_insert_id();
    return $iInsertID;
  }

  public function update( $aData )
  {
    $sql = "UPDATE `$this->sTable` SET ";

    foreach( $this->aColumns as $vColumn )
    {
      if( !isset($aData[$vColumn]) )
        continue;

      $sql .= "`$vColumn` = ".DB::db_safe($aData[$vColumn]);

      # Add comma separater
      $sql .= ',';
    }

    # Strip trailing , (comma)
    $sql = substr( $sql, 0, strlen($sql)-1 );

    //$sql .= " WHERE `".$this->sID."` = ".$this->aData[0][$this->sID];
    if( isset($aData[$this->sID]) )
    {
      if( is_array($aData[$this->sID]) )
      {
        $sIDs = implode(',', $aData[$this->$sID]);
        $sql .= " WHERE `".$this->sID."` IN ( $sIDs )";
      }
      else
        $sql .= " WHERE `".$this->sID."` = ".$aData[$this->$sID];
    }
    else
      echo "No ID passed for update query. Query would have been: ".$sql;
    //echo $sql;

    $this->$sLastQuery = $sql;

    if ( !$resource = DB::query($sql) )
    {
      echo mysql_error();
      return false;
    }

    return mysql_affected_rows();
  }

  public function getLastQuery()
  {
    return $this->sLastQuery;
  }
}
?>
