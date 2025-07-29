
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
// if ($_GET['accion'] === 'clientes') {

//   //para el filtro 
//   $campo = $_GET['campo'] ?? null;
//   $valor = $_GET['valor'] ?? null;

//   $sql = "SELECT A.*, b.nombre AS pais_nombre
//           FROM clientes AS A
//           JOIN paises AS B ON A.pais_id = B.id
//           ORDER BY A.id DESC;
//          ";
//   $resultado = $conexion->query($sql);

//   $clientes = [];

//   while ($fila = $resultado->fetch_assoc()) {
//     $clientes[] = $fila;
//   }

//   echo json_encode($clientes);
//   exit;
// }

if ($_GET['accion'] === 'clientes') {
  $valor = $_GET['valor'] ?? '';
  $campo = $_GET['campo'] ?? '';

  $sql = "SELECT a.*, b.nombre AS pais_nombre
          FROM clientes AS a
          JOIN paises AS b ON a.pais_id = b.id";

  if (!empty($valor)) {
    $valor = $conexion->real_escape_string($valor);

    if ($campo === 'todos') {
      $sql .= " WHERE a.nombre LIKE '%$valor%'
                OR a.apellido LIKE '%$valor%'
                OR a.email LIKE '%$valor%'
                OR a.telefono LIKE '%$valor%'
                OR b.nombre LIKE '%$valor%'";
    } else {
      // Seguridad: solo permite campos válidos
      $campos_validos = ['nombre', 'apellido', 'email', 'telefono', 'pais', 'fecha_registro'];
      if (in_array($campo, $campos_validos)) {
        if ($campo === 'pais') {
          $sql .= " WHERE b.nombre LIKE '%$valor%'";
        } else {
          $sql .= " WHERE a.$campo LIKE '%$valor%'";
        }
      }
    }
  }

  $sql .= " ORDER BY a.id DESC";

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


// Obtener cliente por ID
if ($_GET['accion'] === 'obtenerCliente') {
  $id = $_GET['id'] ?? null;
  if ($id) {
    $stmt = $conexion->prepare("SELECT * FROM clientes WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $resultado = $stmt->get_result();
    echo json_encode($resultado->fetch_assoc());
  }
  exit;
}

// Actualizar cliente
if ($_GET['accion'] === 'actualizarCliente') {
  $data = json_decode(file_get_contents("php://input"), true);

  $id = $data['id'];
  $nombre = $data['nombre'];
  $apellido = $data['apellido'];
  $correo = $data['email']; // Usa 'email' porque así lo guardaste
  $telefono = $data['telefono'];
  $pais = $data['pais'];

  $stmt = $conexion->prepare("UPDATE clientes SET nombre=?, apellido=?, email=?, telefono=?, pais_id=? WHERE id=?");
  $stmt->bind_param("sssssi", $nombre, $apellido, $correo, $telefono, $pais, $id);

  if ($stmt->execute()) {
    echo json_encode(['success' => true]);
  } else {
    echo json_encode(['success' => false, 'error' => $stmt->error]);
  }
  exit;
}


// Eliminar cliente
if ($_GET['accion'] === 'eliminarCliente') {
  $data = json_decode(file_get_contents("php://input"), true);
  $id = $data['id'] ?? null;
  if ($id) {
    $stmt = $conexion->prepare("DELETE FROM clientes WHERE id = ?");
    $stmt->bind_param("i", $id);
    $ok = $stmt->execute();
    echo json_encode(['success' => $ok]);
  }
  exit;
}
