<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; chaset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Request-With");

$result = json_encode(array(
    'success' => true,
    'data' => array(
        'token' => ''
    )
));

http_response_code(200);

echo $result;
exit;
