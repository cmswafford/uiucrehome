<?php

require_once('../../lib/http/bootstrap.php');

$aReturn = array();
$aOptions = array();

$iCurrentTimekey = ceil(time()/(10*60));

// Past 4 hours
$aOptions['fields'] = "CEILING(UNIX_TIMESTAMP(created_at)/(10*60)) as timekey, ROUND(SUM(VALUE)/COUNT(*), 2) as value";
$aOptions['where'] = 'UNIX_TIMESTAMP(created_at) >= '. (($iCurrentTimekey-25)*10*60).' AND UNIX_TIMESTAMP(created_at) < '.($iCurrentTimekey-1)*10*60;
$aOptions['group_by'] = 'timekey';
$aOptions['order_by'] = 'created_at DESC';
$aOptions['limit'] = 24;

$aLogs = $oPowerLogs->select($aOptions);
//echo $oPowerLogs->getLastQuery();
// Initialize graph points
for( $i = 0; $i < 24; $i++ )
  $aPast4Hours[$i] = 0;
foreach( $aLogs as $k => $aRow )
{
  $aPast4Hours[$iCurrentTimekey-1-$aRow['timekey']] = (float)$aRow['value'];
}

$aReturn[0] = array_reverse($aPast4Hours);

// Past 12 hours
$iCurrentTimekey = ceil(time()/(30*60));
$aOptions['fields'] = "CEILING(UNIX_TIMESTAMP(created_at)/(30*60)) as timekey, ROUND(SUM(VALUE)/COUNT(*), 2) as value";
$aOptions['where'] = 'UNIX_TIMESTAMP(created_at) >= '. (($iCurrentTimekey-25)*30*60).' AND UNIX_TIMESTAMP(created_at) < '.($iCurrentTimekey-1)*30*60;
$aOptions['group_by'] = 'timekey';
$aOptions['order_by'] = 'created_at DESC';
$aOptions['limit'] = 24;

$aLogs = $oPowerLogs->select($aOptions);
//echo $oPowerLogs->getLastQuery();
// Initialize graph points
for( $i = 0; $i < 24; $i++ )
  $aPast12Hours[$i] = 0;

// Get log data
foreach( $aLogs as $k => $aRow )
{
  $aPast12Hours[$iCurrentTimekey-1-$aRow['timekey']] = (float)$aRow['value'];
}

$aReturn[1] = array_reverse($aPast12Hours);


// Past 24 hours
$iCurrentTimekey = ceil(time()/(60*60));
$aOptions['fields'] = "CEILING(UNIX_TIMESTAMP(created_at)/(60*60)) as timekey, ROUND(SUM(VALUE)/COUNT(*), 2) as value";
$aOptions['where'] = 'UNIX_TIMESTAMP(created_at) >= '. (($iCurrentTimekey-25)*60*60).' AND UNIX_TIMESTAMP(created_at) < '.($iCurrentTimekey-1)*60*60;
$aOptions['group_by'] = 'timekey';
$aOptions['order_by'] = 'created_at DESC';
$aOptions['limit'] = 24;

$aLogs = $oPowerLogs->select($aOptions);
//echo $oPowerLogs->getLastQuery();
// Initialize graph points
for( $i = 0; $i < 24; $i++ )
  $aPast24Hours[$i] = 0;

foreach( $aLogs as $k => $aRow )
{
  $aPast24Hours[$iCurrentTimekey-1-$aRow['timekey']] = (float)$aRow['value'];
}
$aReturn[2] = array_reverse($aPast24Hours);


// Past 3 days
$iCurrentTimekey = ceil(time()/(3*60*60));
$aOptions['fields'] = "CEILING(UNIX_TIMESTAMP(created_at)/(3*60*60)) as timekey, ROUND(SUM(VALUE), 2) as value";
$aOptions['where'] = 'UNIX_TIMESTAMP(created_at) >= '. (($iCurrentTimekey-25)*3*60*60).' AND UNIX_TIMESTAMP(created_at) < '.($iCurrentTimekey-1)*3*60*60;
$aOptions['group_by'] = 'timekey';
$aOptions['order_by'] = 'created_at DESC';
$aOptions['limit'] = 24;

// Initialize graph points
for( $i = 0; $i < 24; $i++ )
  $aPast3Days[$i] = 0;

// Get log data
$aLogs = $oPowerLogs->select($aOptions);
//echo $oPowerLogs->getLastQuery();

foreach( $aLogs as $k => $aRow )
{
  $aPast3Days[$iCurrentTimekey-1-$aRow['timekey']] = (float)$aRow['value'];
}

$aReturn[3] = array_reverse($aPast3Days);

/*echo count($aReturn[0])."\n";
echo count($aReturn[1])."\n";
echo count($aReturn[2])."\n";
echo count($aReturn[3])."\n";
*/

echo json_encode($aReturn);
