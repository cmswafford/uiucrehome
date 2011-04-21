<?php

require_once('../../lib/http/bootstrap.php');

$aReturn = array();
$aOptions = array();

// Past 4 hours

$iIntervalS = 10*60; // 10 minutes, in seconds
$iIntervalMS = 10*60*1000; // 10 minutes, in milliseconds
$iCurrentTimekey = ceil(time()/(10*60));

// Get the datapoints from the DB
$aOptions['fields'] = "CEILING(UNIX_TIMESTAMP(created_at)/(10*60)) as timekey, ROUND(SUM(VALUE)/COUNT(*), 2) as value";
$aOptions['where'] = 'UNIX_TIMESTAMP(created_at) >= '. (($iCurrentTimekey-25)*$iIntervalS).' AND UNIX_TIMESTAMP(created_at) < '.($iCurrentTimekey-1)*$iIntervalS;
$aOptions['group_by'] = 'timekey';
$aOptions['order_by'] = 'created_at DESC';
$aOptions['limit'] = 24;

$aLogs = $oPowerLogs->select($aOptions);
//echo $oPowerLogs->getLastQuery();
// Initialize graph points
for( $i = 0; $i < 24; $i++ )
{
  $iThisTimekey = $iCurrentTimekey-1-$i;
  $aT[$i] = array( $iThisTimekey*$iIntervalMS, 0 );
  $aPast4Hours[$i] = 0;
}

foreach( $aLogs as $k => $aRow )
{
  $aPast4Hours[$iCurrentTimekey-1-$aRow['timekey']] = (float)$aRow['value'];
  $aT[$iCurrentTimekey-1-$aRow['timekey']] = array( $aRow['timekey']*$iIntervalMS, (float)$aRow['value']);
}

/*foreach( $aPast4Hours as $k => $v )
{
  //$aT[$iCurrentTimekey-1-$aRow['timekey']] = array( ($iCurrentTimekey-1-$k)*10*60, $v);
}  */

//$aReturn[0] = array_reverse($aPast4Hours);
$aReturn[0] = array_reverse($aT);


// Past 12 hours

$iIntervalS = 30*60; // 30 minutes
$iIntervalMS = 30*60*1000; // 30 minutes in milliseconds
$iCurrentTimekey = ceil(time()/($iIntervalS));

// Get the datapoints from the DB
$aOptions['fields'] = "CEILING(UNIX_TIMESTAMP(created_at)/(30*60)) as timekey, ROUND(SUM(VALUE)/COUNT(*), 2) as value";
$aOptions['where'] = 'UNIX_TIMESTAMP(created_at) >= '. (($iCurrentTimekey-25)*$iIntervalS).' AND UNIX_TIMESTAMP(created_at) < '.($iCurrentTimekey-1)*$iIntervalS;
$aOptions['group_by'] = 'timekey';
$aOptions['order_by'] = 'created_at DESC';
$aOptions['limit'] = 24;

$aLogs = $oPowerLogs->select($aOptions);
//echo $oPowerLogs->getLastQuery();
// Initialize graph points
for( $i = 0; $i < 24; $i++ )
{
  $iThisTimeKey = $iCurrentTimekey-1-$i;
  $aT[$i] = array( $iThisTimeKey*$iIntervalMS, 0 );
  $aPast12Hours[$i] = 0;
}

// Get log data
foreach( $aLogs as $k => $aRow )
{
  $aPast12Hours[$iCurrentTimekey-1-$aRow['timekey']] = (float)$aRow['value'];
  $aT[$iCurrentTimekey-1-$aRow['timekey']] = array( $aRow['timekey']*$iIntervalS, (float)$aRow['value']);
}

//$aReturn[1] = array_reverse($aPast12Hours);
$aReturn[1] = array_reverse($aT);


// Past 24 hours

$iIntervalS = 60*60; // 60 minutes in seconds
$iIntervalMS = 60*60*1000; // 60 minutes in milliseconds
$iCurrentTimekey = ceil(time()/(60*60));

// Get the datapoints from the DB
$aOptions['fields'] = "CEILING(UNIX_TIMESTAMP(created_at)/(60*60)) as timekey, ROUND(SUM(VALUE)/COUNT(*), 2) as value";
$aOptions['where'] = 'UNIX_TIMESTAMP(created_at) >= '. (($iCurrentTimekey-25)*$iIntervalS).' AND UNIX_TIMESTAMP(created_at) < '.($iCurrentTimekey-1)*$iIntervalS;
$aOptions['group_by'] = 'timekey';
$aOptions['order_by'] = 'created_at DESC';
$aOptions['limit'] = 24;

$aLogs = $oPowerLogs->select($aOptions);
//echo $oPowerLogs->getLastQuery();
// Initialize graph points
for( $i = 0; $i < 24; $i++ )
{
  $iThisTimekey = $iCurrentTimekey-1-$i;
  $aT[$i] = array( $iThisTimekey*$iIntervalMS, 0 );
  $aPast24Hours[$i] = 0;
}
foreach( $aLogs as $k => $aRow )
{
  $aPast24Hours[$iCurrentTimekey-1-$aRow['timekey']] = (float)$aRow['value'];
  $aT[$iCurrentTimekey-1-$aRow['timekey']] = array( $aRow['timekey']*$iIntervalMS, (float)$aRow['value']);
}
//$aReturn[2] = array_reverse($aPast24Hours);
$aReturn[2] = array_reverse($aT);


// Past 3 days
$iCurrentTimekey = ceil(time()/(3*60*60));
$iIntervalS = 3*60*60; // 3 hours in seconds
$iIntervalMS = 3*60*60*1000; // 3 hours in milliseconds

$aOptions['fields'] = "CEILING(UNIX_TIMESTAMP(created_at)/(3*60*60)) as timekey, ROUND(SUM(VALUE), 2) as value";
$aOptions['where'] = 'UNIX_TIMESTAMP(created_at) >= '. (($iCurrentTimekey-25)*$iIntervalS).' AND UNIX_TIMESTAMP(created_at) < '.($iCurrentTimekey-1)*$iIntervalS;
$aOptions['group_by'] = 'timekey';
$aOptions['order_by'] = 'created_at DESC';
$aOptions['limit'] = 24;

// Initialize graph points
for( $i = 0; $i < 24; $i++ )
{
  $iThisTimekey = $iCurrentTimekey-1-$i;
  $aT[$i] = array( $iThisTimekey*$iIntervalMS, 0 );
  $aPast3Days[$i] = 0;
}

// Get log data
$aLogs = $oPowerLogs->select($aOptions);
//echo $oPowerLogs->getLastQuery();

foreach( $aLogs as $k => $aRow )
{
  $aPast3Days[$iCurrentTimekey-1-$aRow['timekey']] = (float)$aRow['value'];
  $aT[$iCurrentTimekey-1-$aRow['timekey']] = array( $aRow['timekey']*$iIntervalMS, (float)$aRow['value']);
}

//$aReturn[3] = array_reverse($aPast3Days);
$aReturn[3] = array_reverse($aT);

/*echo count($aReturn[0])."\n";
echo count($aReturn[1])."\n";
echo count($aReturn[2])."\n";
echo count($aReturn[3])."\n";
*/

echo json_encode($aReturn);
