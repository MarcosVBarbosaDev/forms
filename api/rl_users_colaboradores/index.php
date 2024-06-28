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

            $query = 'SELECT * FROM `rl_users_colaboradores` join colaboradores on colaboradores.id_colaborador = rl_users_colaboradores.id_colaborador where rl_users_colaboradores.id_user = :id_user';

            $stmt = $conn->prepare($query);

            $stmt->bindParam(':id_user', $id_user);

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
    } else if (isset($_GET['id_colaborador'])) {

        if (empty($_GET['id_colaborador']) && !is_numeric($_GET['id_colaborador'])) {
            throw new ErrorException("sem id_colaborador!", 1);
        }

        try {
            $id_colaborador =  trim($_GET['id_colaborador']);

            $query = 'SELECT * FROM `rl_users_colaboradores`JOIN users ON users.id_user = rl_users_colaboradores.id_user WHERE rl_users_colaboradores.id_colaborador = :id_colaborador';

            $stmt = $conn->prepare($query);

            $stmt->bindParam(':id_colaborador', $id_colaborador);

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
            $query = "SELECT * FROM `rl_users_colaboradores` JOIN users ON users.id_user = rl_users_colaboradores.id_user JOIN colaboradores ON colaboradores.id_colaborador =  rl_users_colaboradores.id_colaborador";
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
}
