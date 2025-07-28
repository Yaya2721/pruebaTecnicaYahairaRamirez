
<?php
$host = 'localhost';
$user = 'root';
$password = '';
$db = 'gestion_clientes';

$conexion = new mysqli($host, $user, $password, $db);

if ($conexion->connect_error) {
  die(json_encode(['error' => 'Conexión fallida: ' . $conexion->connect_error]));
}


header('Content-Type: application/json');

//Login
if ($_GET['accion'] === 'login'){
    $data = json_decode(file_get_contents('php://input'), true);
    
    $correo = $data['correo'];
    $contrasenia  = $data['contrasenia'];

    if ($correo === 'yrdevg05@gmail.com' && $contrasenia === 'adminPrueba123**'){
        echo json_encode(['success' => true, 'token' => 'pruebatoken']);
    } else {
        echo json_encode(['success' => false]);
    }
    exit;
    }

//Clientes
if ($_GET['accion'] === 'clientes') {
  $sql = "SELECT * FROM clientes ORDER BY id DESC";
  $resultado = $conexion->query($sql);

  $clientes = [];

  while ($fila = $resultado->fetch_assoc()) {
    $clientes[] = $fila;
  }

  echo json_encode($clientes);
  exit;
}

