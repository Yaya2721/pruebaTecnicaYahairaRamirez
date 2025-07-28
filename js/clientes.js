// cliente.js

document.addEventListener('DOMContentLoaded', () => {
  const token = sessionStorage.getItem('token');
  if (!token) {
    window.location.href = 'index.html';
    return;
  }

  document.getElementById('busqueda').addEventListener('input', cargarClientes);
  document.getElementById('filtroCampo').addEventListener('change', cargarClientes);

  cargarClientes();
});

async function cargarClientes() {
  try {
    const campo = document.getElementById('filtroCampo').value;
    const valor = document.getElementById('busqueda').value.trim();
    const url = valor
      ? `backend/api.php?accion=clientes&campo=${campo}&valor=${encodeURIComponent(valor)}`
      : `backend/api.php?accion=clientes`;

    const respuesta = await fetch(url);
    const clientes = await respuesta.json();
    const cuerpo = document.getElementById('clienteTablaCuerpo');
    cuerpo.innerHTML = '';

    clientes.forEach(cliente => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${cliente.id}</td>
        <td>${cliente.nombre}</td>
        <td>${cliente.apellido}</td>
        <td>${cliente.email}</td>
        <td>${cliente.telefono}</td>
        <td>${cliente.pais_nombre}</td>
        <td>${cliente.fecha_registro}</td>
        <td>
          <button class="btn-editar" onclick="editarCliente(${cliente.id})">
            <i class="fas fa-pen"></i>
          </button>
          <button class="btn-eliminar" onclick="eliminarCliente(${cliente.id})">
            <i class="fas fa-trash"></i>
          </button>
        </td>`;
      cuerpo.appendChild(fila);
    });
  } catch (error) {
    document.getElementById('error').textContent = 'Error al cargar los clientes.';
  }
}

function editarCliente(id) {
  window.location.href = `cliente_editar.html?id=${id}`;
}

async function eliminarCliente(id) {
  const confirmar = confirm("¿Deseas eliminar este cliente?");
  if (!confirmar) return;

  try {
    const respuesta = await fetch(`backend/api.php?accion=eliminarCliente`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });

    const resultado = await respuesta.json();
    if (resultado.success) {
      alert("Cliente eliminado.");
      cargarClientes();
    } else {
      alert("Error al eliminar.");
    }
  } catch (error) {
    alert("Error de red.");
  }
}
