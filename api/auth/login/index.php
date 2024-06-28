<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; chaset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Request-With");

include("../../connection.php");
include("../jwt.php");
// include("../valida_token.php");

$method = $_SERVER['REQUEST_METHOD'];


if ($method == "POST") {

    $postjson = json_decode(file_get_contents('php://input'), true);

    if (isset($postjson["username"]) && isset($postjson["password"]) && !empty($postjson["username"]) && !empty($postjson["password"])) {

        $name = $postjson["username"];
        // Use a hashed password in a real-world scenario
        $password =  base64_encode($postjson["password"]);
        // $password = hash('sha256', $postjson["password"]);
        $remember = 0;

        try {
            $sql = "SELECT id_user, name, nivel FROM users WHERE name = :name AND password = :password AND status = 1";
            $stmt = $conn->prepare($sql);

            $stmt->bindParam(":name", $name);
            $stmt->bindParam(":password", $password);
            $stmt->execute();

            $dados = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($dados) {
                // $name_fullname = explode(" ", $dados['name']);
                // $name_fullname = $name_fullname[0] . " " . end($name_fullname);

                $token = encodeJWT($remember, $dados['id_user'], $dados['name'], $dados['nivel']);

                $result = ["token" => $token];
            } else {
                $result = ["status" => "fail", "Error" => "E-mail e/ou senha inválidos"];
            }

            http_response_code(200);
            echo json_encode($result);
        } catch (PDOException $ex) {
            http_response_code(500);
            echo json_encode(["status" => "fail", "Error" => $ex->getMessage()]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["status" => "fail", "Error" => "Falta de Senha ou Usuário"]);
    }
}
//FIM do GET