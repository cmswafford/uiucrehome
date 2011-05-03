<?php

require_once( __DIR__.'/../../lib/http/bootstrap.php' );

$aReturn = array();

switch( $_GET['page'] )
{
  case 'gallery':
  break;
  
  case 'hvac':
  break;

  case 'portal':
    switch( $_GET['duration'] )
    {
      case '4h':
        $iCurrentTimekey = ceil(time()/(10*60));

        // Past 4 hours
        $aOptions['fields'] = "CEILING(UNIX_TIMESTAMP(created_at)/(10*60)) as timekey, ROUND(SUM(VALUE)/COUNT(*), 2) as value";
        $aOptions['where'] = 'UNIX_TIMESTAMP(created_at) >= '. (($iCurrentTimekey-2)*10*60).' AND UNIX_TIMESTAMP(created_at) < '.($iCurrentTimekey-1)*10*60;
        $aOptions['group_by'] = 'timekey';
        $aOptions['order_by'] = 'created_at DESC';
        $aOptions['limit'] = 1;

        $aLog = $oPowerLogs->select($aOptions);
        FB::log($oPowerLogs->getLastQuery());
        if( !$aLog ) return;
        $aLog['timekey'] = (int)$aLog['timekey'];
        $aLog['value'] = (float)$aLog['value'];
        $aLog['timestamp'] = $aLog['timekey']*10*60;

        $aReturn = $aLog;
      break;

      case '12h':
      break;
      case '24h':
      break;
      case '3d':
      break;
      default:
        return false;
    }
  break;

  case 'pv':
  break;

  case 'water':
  break;

  default:
    return false;
}

echo json_encode($aReturn);
