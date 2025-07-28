<?php
header('Content-Type: application/json');

//Login
if ($_GET['accion'] === 'login'){
    $data = json_decode(file_get_contents('php://input'), true);
    
    $correo = $data['correo'];
    $contrasenia  = $data['contrasenia'];

    if ($correo === 'yrdevg05@gmail.com' && $contrasenia === 'admin123**'){
        echo json_encode(['success' => true, 'token' => 'pruebatoken']);
    } else {
        echo json_encode(['success' = > false]);
    }
    exit;
    }

//
