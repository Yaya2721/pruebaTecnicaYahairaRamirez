document.addEventListener('DOMContentLoaded', async () => {

    // Verificamos que el token sea valido y que venga uno 
    const verificacionToken = sessionStorage.getItem('token');
    if (!verificacionToken){
        window.location.href = 'index.html';
        return;
    }
    // Si tengo token entonces continuo
    try {
        const respuesta = await fetch('backend/api.php?accion=clientes') ;
        const clientes = await respuesta.json();
       //Creamos la tabla
        const clienteTablaCuerpo = document.getElementById('clienteTablaCuerpo');
        //Limpiamos la tabla
        clienteTablaCuerpo.innerHTML = '';

        //ingresamos los datos
        clientes.forEach(cliente => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
            <td>${cliente.id}</td>
            <td>${cliente.nombre}</td>
            <td>${cliente.apellido}</td>
            <td>${cliente.email}</td>
            <td>${cliente.telefono}</td>
            <td>${cliente.pais_id}</td>
            <td>${cliente.fecha_registro}</td>            
            `;
            clienteTablaCuerpo.appendChild(fila);
        });
    } catch (error) {
        alert('Error al listar los clientes');
    }
});