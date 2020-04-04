<?php

header('Content-Type: text/html; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL,"https://xn--80aesfpebagmfblc0a.xn--p1ai/");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$server_output = curl_exec($ch);
curl_close ($ch);

preg_match("#\<script\>var mapData = (.*?);</script>#smi", $server_output, $result);

$mapData = $result[1];
//$mapData = preg_replace_callback('/\\\\u([0-9a-fA-F]{4})/', function ($match) {
//    return mb_convert_encoding(pack('H*', $match[1]), 'UTF-8', 'UCS-2BE');
//}, $mapData);

echo $mapData;
