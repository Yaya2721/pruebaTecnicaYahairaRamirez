
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

//Listar Clientes
if ($_GET['accion'] === 'clientes') {
  $sql = "SELECT a.*, b.nombre AS pais_nombre
          FROM clientes as a
          JOIN paises as b ON a.pais_id = b.id
          ORDER BY a.id DESC;
         ";
  $resultado = $conexion->query($sql);

  $clientes = [];

  while ($fila = $resultado->fetch_assoc()) {
    $clientes[] = $fila;
  }

  echo json_encode($clientes);
  exit;
}

//Crear Cliente
if ($_GET['accion'] === 'crearCliente') {
  $datos = json_decode(file_get_contents('php://input'), true);

  $nombre = $datos['nombre'];
  $apellido = $datos['apellido'];
  $correo = $datos['correo'];
  $telefono = $datos['telefono'];
  $pais = $datos['pais'];

  $sql = "INSERT INTO clientes (nombre, apellido, email, telefono, pais_id, fecha_registro)
          VALUES (?, ?, ?, ?, ?, NOW())";

  $stmt = $conexion->prepare($sql);
  $stmt->bind_param("sssss", $nombre, $apellido, $correo, $telefono, $pais);

  if ($stmt->execute()) {
    echo json_encode(['success' => true]);
  } else {
    echo json_encode(['success' => false, 'error' => $stmt->error]);
  }
  exit;
}


// obtener los paises 
if ($_GET['accion'] === 'paises') {
  $sql = "SELECT id, nombre FROM paises";
  $resultado = $conexion->query($sql);

  $paises = [];
  while ($fila = $resultado->fetch_assoc()) {
    $paises[] = $fila;
  }

  echo json_encode($paises);
  exit;
}
