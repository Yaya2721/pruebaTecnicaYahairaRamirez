//Para mostrar los paises

//Para hacerlo de acuerdo al pais que selecciono
const regexTelefonoPorPais = {
  1: /^[2-7]\d{7}$/,               // Guatemala (8 dígitos)
  2: /^[2-7]\d{7}$/,               // El Salvador
  3: /^[2|3|8|9]\d{7}$/,           // Honduras
  4: /^[2|7|8]\d{7}$/,             // Nicaragua
  5: /^[2|4|5|6|7|8]\d{7}$/,       // Costa Rica
  6: /^[1|6|7|8|9]\d{7}$/,         // Panamá
  7: /^\+501\d{7}$/               // Belice (+501 obligatorio)
};

//  Ejemplos de telefono segunpais seleccionado
const placeholders = {
  1: 'Ej: 56781234',
  2: 'Ej: 76543210',
  3: 'Ej: 33445566',
  4: 'Ej: 82334455',
  5: 'Ej: 86778899',
  6: 'Ej: 61234567',
  7: 'Ej: +5011234567'
};

//Cargamos los paises
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const respuesta = await fetch('backend/api.php?accion=paises');
    const paises = await respuesta.json();
    const seleccionaPais = document.getElementById('pais');

    paises.forEach(p => {
      const opcion = document.createElement('option');
      opcion.value = p.id;
      opcion.textContent = p.nombre;
      seleccionaPais.appendChild(opcion);
    });
  } catch (error) {
    document.getElementById('error').textContent = 'Error al cargar países';
  }
});

//  Activar y mostrar ejemplo de telefono al seleccionar país
document.getElementById('pais').addEventListener('change', function () {
  const telefonoInput = document.getElementById('telefono');
  const paisId = parseInt(this.value);

  if (paisId) {
    telefonoInput.disabled = false;
    telefonoInput.placeholder = placeholders[paisId] || '';
  } else {
    telefonoInput.disabled = true;
    telefonoInput.value = '';
    telefonoInput.placeholder = '';
  }
});
//fin pais

//Programacion del cliente
document.getElementById('formularioCliente').addEventListener('submit', async function(e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const apellido = document.getElementById('apellido').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const pais = document.getElementById('pais').value.trim();

  //Variables para aregex
  const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const paisId = parseInt(pais); // Aseguramos que es número
  const telefonoRegex = regexTelefonoPorPais[paisId];
   
  //INICIO VALIDACIONES
  // Campos Obligatorios
  if (!nombre || !apellido || !correo || !pais || !telefono ) {
    document.getElementById('error').textContent = 'Favor ingresar la información a todos los campos, ya que todos son obligatorios';
    return;

  }
  //Validamos que sea un correo correcto
  if (!correoRegex.test(correo)){
        document.getElementById('error').textContent = 'El correo que ingresó, no es válido';
        return;
  }
 
  //Validaciones para los telefonos segun el pais
  //Por si no ha seleccionadopais le pedimos 
   if (!paisId) {
    document.getElementById('error').textContent = 'Debe seleccionar un país.';
    return;
  }

  if (!telefonoRegex) {
    document.getElementById('error').textContent = 'No se encontró una validación para el país seleccionado.';
    return; 
  }

  if (!telefonoRegex.test(telefono)) {
    document.getElementById('error').textContent = 'El número de teléfono no es válido para el país seleccionado.';
    return;
  }

   
    

//FIN VALIDACIONES

  // Limpiar errores
  document.getElementById('error').textContent = '';

  //eNVIAMOS los datos
  try {
    const respuesta = await fetch('backend/api.php?accion=crearCliente', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre, apellido, correo, telefono, pais })
    });

    const resultado = await respuesta.json();

    if (resultado.success) {
      document.getElementById('mensaje').textContent = 'Cliente guardado correctamente.';
      document.getElementById('formularioCliente').reset();
    } else {
      document.getElementById('error').textContent = 'Hubo un error al guardar el cliente.';
    }
  } catch (error) {
    document.getElementById('error').textContent = 'Error de conexión.';
  }
});
