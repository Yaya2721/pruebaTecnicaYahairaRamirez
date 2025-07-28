document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    alert("ID de cliente no proporcionado.");
    window.location.href = "clientes.html";
    return;
  }

  await cargarPaises();
  await cargarCliente(id);

  document.getElementById('btnActualizar').addEventListener('click', () => actualizarCliente(id));
});

async function cargarPaises() {
  const respuesta = await fetch('backend/api.php?accion=paises');
  const paises = await respuesta.json();
  const select = document.getElementById('pais');
  select.innerHTML = '<option value="">Seleccione país</option>';
  paises.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = p.nombre;
    select.appendChild(opt);
  });
}

async function cargarCliente(id) {
  const respuesta = await fetch(`backend/api.php?accion=obtenerCliente&id=${id}`);
  const cliente = await respuesta.json();

  document.getElementById('nombre').value = cliente.nombre;
  document.getElementById('apellido').value = cliente.apellido;
  document.getElementById('correo').value = cliente.email;
  document.getElementById('telefono').value = cliente.telefono;
  document.getElementById('pais').value = cliente.pais_id;
}

async function actualizarCliente(id) {
 const datos = {
  id,
  nombre: document.getElementById('nombre').value.trim(),
  apellido: document.getElementById('apellido').value.trim(),
  email: document.getElementById('correo').value.trim(), // corregido
  telefono: document.getElementById('telefono').value.trim(),
  pais: document.getElementById('pais').value
};



  const respuesta = await fetch('backend/api.php?accion=actualizarCliente', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  });

  const resultado = await respuesta.json();
  if (resultado.success) {
    alert("Cliente actualizado.");
    window.location.href = 'clientes.html';
  } else {
    alert("Error al actualizar cliente.");
  }
}



document.getElementById('btnActualizar').addEventListener('click', () => {
  console.log("Clic detectado");
  actualizarCliente(id);
});
