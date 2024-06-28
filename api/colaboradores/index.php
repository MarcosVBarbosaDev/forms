<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");;
header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Request-With");

$method = $_SERVER["REQUEST_METHOD"];
include('../connection.php');

if ($method == "GET") {
    if (false) {
    } else if (isset($_GET['cpf'])) {

        if (empty($_GET['cpf'])) {
            throw new ErrorException("sem cpf!", 1);
        }

        try {
            $cpf = trim($_GET['cpf']);

            $query = 'SELECT * FROM colaboradores where cpf = :cpf';

            $stmt = $conn->prepare($query);

            $stmt->bindParam(':cpf', $cpf);

            $stmt->execute();

            $dados = $stmt->fetch(PDO::FETCH_ASSOC);

            $result =  array('status' => 'success', 'rows' => $dados);
        } catch (PDOException $ex) {
            $result = ["status" => "fail", "error" => $ex->getMessage()];
            http_response_code(200);
        } catch (Exception $ex) {
            $result = ["status" => "fail", "error" => $ex->getMessage()];
            http_response_code(200);
        } finally {
            $conn = null;
            echo json_encode($result);
        }
    } else {
        try {
            $query = "SELECT * FROM colaboradores ORDER BY status DESC";
            $stmt = $conn->prepare($query);
            $stmt->execute();
            $dados = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $result = array('status' => 'success', 'rows' => $dados);
        } catch (PDOException $ex) {
            $result = array('status' => 'fail', 'error' => $ex->getMessage());
            http_response_code(500); // Internal Server Error
        } catch (Exception $ex) {
            $result = array('status' => 'fail', 'error' => $ex->getMessage());
            http_response_code(500); // Internal Server Error
        } finally {
            $conn = null;
            echo json_encode($result);
        }
    }
} elseif ($method == "POST") {
    //POST
} elseif ($method == "PUT") {
    $postjson = json_decode(file_get_contents('php://input'), true);

    $dados = $postjson['body']['form'];

    $id_colaborador = trim($dados['id_colaborador']);
    $nome = trim($dados['nome']);
    $cpf = trim($dados['cpf']);
    $contato_1 = trim($dados['contato_1']);
    $contato_2 = trim($dados['contato_2']);
    $email = trim($dados['email']);
    $sexo = trim($dados['sexo']);

    try {

        if (empty($id_colaborador) && !is_numeric($id_colaborador)) {
            throw new ErrorException("sem id_colaborador!", 1);
        }

        $update_users = "UPDATE colaboradores SET nome = :nome, cpf = :cpf, contato_1 = :contato_1, contato_2 = :contato_2,email = :email, sexo = :sexo WHERE id_colaborador = :id_colaborador";

        $stmt = $conn->prepare($update_users);

        $stmt->bindParam(':nome', $nome);
        $stmt->bindParam(':cpf', $cpf);
        $stmt->bindParam(':contato_1', $contato_1);
        $stmt->bindParam(':contato_2', $contato_2);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':sexo', $sexo);
        $stmt->bindParam(':id_colaborador', $id_colaborador);

        $stmt->execute();

        // Executar a declaração SQL
        if ($stmt->execute()) {
            // Atualização bem-sucedida
            $result = array("status" => "success");
            http_response_code(200); // OK
        } else {
            // Se houver um erro ao executar a declaração SQL
            $errorInfo = $stmt->errorInfo();
            $error = $errorInfo[2]; // Mensagem de erro específica
            $result = array("status" => "fail", "error" => $error);
            http_response_code(500); // Internal Server Error
        }
    } catch (PDOException $ex) {
        $result = array("status" => "fail", "error" => $ex->getMessage());
        http_response_code(500); // Internal Server Error
    } catch (Exception $ex) {
        $result = array("status" => "fail", "error" => $ex->getMessage());
        http_response_code(500); // Internal Server Error
    } finally {
        $conn = null;
        echo json_encode($result);
    }
} elseif ($method == 'DELETE') {
    //  DELETE 
}
