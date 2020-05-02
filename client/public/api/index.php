<?php

header('Content-Type: text/html; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$file = 'data.json';
const TWO_HOURS_IN_SECONDS = 60 * 60 * 2;

// first check if data is fresh
if (file_exists($file)) {
    if(time() - filemtime($file) <= TWO_HOURS_IN_SECONDS) {
        $result = file_get_contents($file);
        if(!empty($result)) {
            echo $result;
            die();
        }
    }
}

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL,"https://xn--80aesfpebagmfblc0a.xn--p1ai/information/");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$server_output = curl_exec($ch);
curl_close ($ch);
preg_match("#\:spread-data=\'(.*?)'#smi", $server_output, $result);
$mapData = $result[1];
if(!empty($mapData)) {
    file_put_contents($file, $mapData);
}

echo $mapData;
