<?php

require_once('../../lib/http/bootstrap.php');

$aReturn = array();
$aOptions = array();

$iCurrentTimekey = floor(time()/(10*60))-1;

// Past 4 hours
$aOptions['fields'] = "FLOOR(UNIX_TIMESTAMP(created_at)/(10*60)) as timekey, ROUND(SUM(VALUE)/COUNT(*), 2) as value";
$aOptions['where'] = 'TIMESTAMPDIFF( HOUR, `created_at`, CURRENT_TIMESTAMP ) <= 4 AND UNIX_TIMESTAMP(created_at) < '.($iCurrentTimekey+1)*10*60;
$aOptions['group_by'] = 'timekey';
$aOptions['order_by'] = 'created_at DESC';
$aOptions['limit'] = 24;

$aLogs = $oPowerLogs->select($aOptions);
//echo $oPowerLogs->getLastQuery();
$iResults = count($aLogs);
// Initialize graph points
for( $i = 0; $i < 24; $i++ )
  $aPast4Hours[$i] = 0;

foreach( $aLogs as $k => $aRow )
{
  $aPast4Hours[$iCurrentTimekey-$aRow['timekey']] = (float)$aRow['value'];
}

$aReturn[0] = array_reverse($aPast4Hours);

// Past 12 hours
$iCurrentTimekey = floor(time()/(30*60))-1;
$aOptions['fields'] = "FLOOR(UNIX_TIMESTAMP(created_at)/(30*60)) as timekey, ROUND(SUM(VALUE)/COUNT(*), 2) as value";
$aOptions['where'] = 'TIMESTAMPDIFF( HOUR, `created_at`, CURRENT_TIMESTAMP ) <= 12 AND UNIX_TIMESTAMP(created_at) < '.($iCurrentTimekey+1)*30*60;
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
  $aPast12Hours[$iCurrentTimekey-$aRow['timekey']] = (float)$aRow['value'];
}

$aReturn[1] = array_reverse($aPast12Hours);


// Past 24 hours
$iCurrentTimekey = floor(time()/(60*60))-1;
$aOptions['fields'] = "FLOOR(UNIX_TIMESTAMP(created_at)/(60*60)) as timekey, ROUND(SUM(VALUE)/COUNT(*), 2) as value";
$aOptions['where'] = 'TIMESTAMPDIFF( HOUR, `created_at`, CURRENT_TIMESTAMP ) <= 24  AND UNIX_TIMESTAMP(created_at) < '.($iCurrentTimekey+1)*60*60;
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
  $aPast24Hours[$iCurrentTimekey-$aRow['timekey']] = (float)$aRow['value'];
}
$aReturn[2] = array_reverse($aPast24Hours);


// Past 3 days
$iCurrentTimekey = floor(time()/(3*60*60));
$aOptions['fields'] = "FLOOR(UNIX_TIMESTAMP(created_at)/(3*60*60)) as timekey, ROUND(SUM(VALUE)/COUNT(*), 2) as value";
$aOptions['where'] = 'TIMESTAMPDIFF( HOUR, `created_at`, CURRENT_TIMESTAMP ) <= 72 AND UNIX_TIMESTAMP(created_at) < '.($iCurrentTimekey+1)*3*60*60;
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
  $aPast3Days[$iCurrentTimekey-$aRow['timekey']] = (float)$aRow['value'];
}

$aReturn[3] = array_reverse($aPast3Days);

echo json_encode($aReturn);
