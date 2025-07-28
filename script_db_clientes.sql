CREATE DATABASE IF NOT EXISTS Prueba;
USE Prueba;


CREATE TABLE IF NOT EXISTS usuarios (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(60) NOT NULL,
  PRIMARY KEY `pk_id`(`id`)
) ENGINE = InnoDB;

-- Tabla de países
CREATE TABLE paises (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

-- Tabla de clientes
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    fecha_registro DATE NOT NULL DEFAULT CURRENT_DATE,
    pais_id INT,
    FOREIGN KEY (pais_id) REFERENCES paises(id)
);


CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `usuario` VARCHAR(15) NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `correo` VARCHAR(100) NOT NULL,
  `contrasenia` VARCHAR(60) NOT NULL,
  PRIMARY KEY `pk_id`(`id`)
) ENGINE = InnoDB;


-- Insertar países de Centroamérica
INSERT INTO paises (nombre) VALUES 
('Guatemala'),
('El Salvador'),
('Honduras'),
('Nicaragua'),
('Costa Rica'),
('Panamá'),
('Belice');

-- Insertar clientes de ejemplo
INSERT INTO clientes (nombre, apellido, email, telefono, fecha_registro, pais_id) VALUES
('Juan', 'Pérez', 'juan.perez@example.com', '+50212345678', '2025-04-20', 1),
('Ana', 'Ramírez', 'ana.ramirez@example.com', '+50398765432', '2025-04-21', 2),
('Carlos', 'Gómez', 'carlos.gomez@example.com', '+50445678901', '2025-04-19', 3),
('Lucía', 'Martínez', 'lucia.martinez@example.com', '+50522334455', '2025-04-18', 4),
('Roberto', 'Díaz', 'roberto.diaz@example.com', '+50666778899', '2025-04-17', 5);