<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");;
header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Request-With");

$method = $_SERVER["REQUEST_METHOD"];
include('../connection.php');

if ($method == "GET") {
    if (isset($_GET['id_user'])) {

        if (empty($_GET['id_user']) && !is_numeric($_GET['id_user'])) {
            throw new ErrorException("sem id_user!", 1);
        }

        try {
            $id_user =  trim($_GET['id_user']);

            $query = 'SELECT * FROM users where id_user = :id_user';

            $stmt = $conn->prepare($query);

            $stmt->bindParam(':id_user', $id_user);

            $stmt->execute();

            $dados = $stmt->fetch(PDO::FETCH_ASSOC);

            // Decodifica a senha e atribui de volta à matriz original $dados
            $dados['password'] = base64_decode($dados['password']);

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
    } else if (isset($_GET['name'])) {

        if (empty($_GET['name'])) {
            throw new ErrorException("sem usuário!", 1);
        }

        try {
            $name =  trim($_GET['name']);

            $query = 'SELECT name FROM users where name = :name';

            $stmt = $conn->prepare($query);

            $stmt->bindParam(':name', $name);

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
            $query = "SELECT * FROM users ORDER BY status DESC";
            $stmt = $conn->prepare($query);
            $stmt->execute();
            $dados = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Decode passwords (assuming they were encoded using base64)
            foreach ($dados as $key => $value) {
                if (isset($value['password'])) {
                    // Decodifica a senha e atribui de volta à matriz original $dados
                    $dados[$key]['password'] = base64_decode($value['password']);
                }
            }

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

    $postjson = json_decode(file_get_contents('php://input'), true);

    $dados = $postjson['body']['form'];

    $name = trim($dados['name']);
    $nivel = trim($dados['nivel']);
    $status = trim($dados['status']);
    $password = base64_encode(trim($dados['password']));

    try {
        if (empty($name) || empty($nivel) || empty($status) || empty($password)) {
            throw new ErrorException("Campos não preenchido!", 1);
        }

        // Inserir na tabela users
        $insert_users = "INSERT INTO users (name, nivel, status, password) VALUES (:name, :nivel, :status, :password)";

        $stmt = $conn->prepare($insert_users);

        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':nivel', $nivel);
        $stmt->bindParam(':status', $status);
        $stmt->bindParam(':password', $password);
        $stmt->execute();

        // Obter o ID do último registro users
        $id_users = $conn->lastInsertId();

        // Inserir na tabela colaboradores
        $insert_colaboradores = "INSERT INTO colaboradores (id_colaborador, nome, cpf, contato_1, contato_2, email) VALUES (NULL, '', NULL, NULL, NULL, '')";

        $stmt = $conn->prepare($insert_colaboradores);
        $stmt->execute();

        // Obter o ID do último registro colaboradores
        $id_colaborador = $conn->lastInsertId();

        // Inserir na tabela rl_users_colaboradores
        $insert_rl_users_colaboradores = "INSERT INTO rl_users_colaboradores (id_user, id_colaborador) VALUES (:id_user, :id_colaborador)";

        $stmt = $conn->prepare($insert_rl_users_colaboradores);
        $stmt->bindParam(':id_user', $id_users);
        $stmt->bindParam(':id_colaborador', $id_colaborador);
        $stmt->execute();

        $result = array("status" => "success");
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
} elseif ($method == "PUT") {
    $postjson = json_decode(file_get_contents('php://input'), true);

    $dados = $postjson['body']['form'];

    $id_user = trim($dados['id_user']);
    $name = isset($dados['name']) || !empty($dados['name']) ? trim($dados['name']) : null;
    $nivel = isset($dados['nivel']) || !empty($dados['nivel']) ? trim($dados['nivel']) : null;
    $status = isset($dados['status']) || !empty($dados['status']) ? trim($dados['status']) : null;
    $password = isset($dados['password']) || !empty($dados['password']) ? trim($dados['password']) : null;

    try {
        if (($status !== null && $id_user !== null) && ($name == null && $nivel == null && $password == null)) {
            $update_users = "UPDATE users SET status = :status WHERE id_user = :id_user";

            $stmt = $conn->prepare($update_users);

            $stmt->bindParam(':status', $status);
            $stmt->bindParam(':id_user', $id_user);

            $stmt->execute();
        } else {

            $password = base64_encode($password);

            $update_users = "UPDATE users SET status = :status, name = :name, nivel = :nivel, password = :password WHERE id_user = :id_user";

            $stmt = $conn->prepare($update_users);

            $stmt->bindParam(':status', $status);
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':nivel', $nivel);
            $stmt->bindParam(':password', $password);
            $stmt->bindParam(':id_user', $id_user);

            $stmt->execute();
        }

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
