<?php

/* This script read from the Arudino Fio and stores the data into the database
 * insert the device id into the array to have the script read power data from the device 
 */
include '../lib/misc/functions.php';

$file_location = 'power.py';
$device_id = array(1,3);

foreach ($device_id as $id)
{
	$output = array();
	exec("python $file_location $id",$output);
	$output = preg_replace('/^.* \s/','',$output);
	dump($output);

	if ($output[4] == 'nan')
		$string = "$output[0] $output[1] $output[2] $output[3]";
	else
		$string = "$output[0] $output[1] $output[2] $output[3] $output[4] $output[5]";

	exec("php5 insert_log.php power $id ".$string);
}
