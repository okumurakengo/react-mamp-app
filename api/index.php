<?php

require __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::create(dirname(__DIR__));
$dotenv->load();
$dotenv->required('DB_CONNECTION')->notEmpty();
$dotenv->required('DB_HOST')->notEmpty();
$dotenv->required('DB_DATABASE')->notEmpty();
$dotenv->required('DB_USERNAME')->notEmpty();
$dotenv->required('DB_PASSWORD')->notEmpty();

try{
    $pdo = new PDO(
        sprintf('%s:dbname=%s;host=%s;charset=utf8', getenv('DB_CONNECTION'), getenv('DB_DATABASE'), getenv('DB_HOST')),
        getenv('DB_USERNAME'), 
        getenv('DB_PASSWORD'), 
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );
    $pdo->exec(
        'CREATE TABLE IF NOT EXISTS todos (
            id   INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            text VARCHAR(255) NOT NULL
        );'
    );

    header('Content-Type: application/json; charset=utf-8');

    [, , $target] = $uri = explode('/', $_SERVER["REQUEST_URI"]);
    switch($target) {
        case 'list':
            echo json_encode($pdo->query('SELECT * FROM todos')->fetchAll());
            exit;
        case 'add':
            $stmt = $pdo->prepare('INSERT INTO todos(text) VALUES(?)');
            $stmt->execute([$_POST['text']]);
            json_encode(['res' => 'ok']);
            exit;
        case 'delete':
            $stmt = $pdo->prepare('DELETE FROM todos WHERE id = ?');
            $stmt->execute([end($uri)]);
            exit;
        default:
            http_response_code(404);
            echo '404 Not Found';
            exit;
    }
} catch (PDOException $e) {
    http_response_code(500);
}
