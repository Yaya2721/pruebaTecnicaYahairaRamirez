document.getElementById('LoginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    //1. Verificamos que el token sea valido y que venga uno 
    const verificacionToken = sessionStorage.getItem('token');
    if (!verificacionToken){
        Window.location.href = 'index.html';
        return;
    }
    //2. Si tengo token entonces continuo
    try {
        const response = await fetch('backend/api.php?action=cliente') ;
        const cliente = await response.json();
        const clienteTablaCuerpo = document.getElementById('clienteTablaCuerpo');
        
        cliente.forEach(cliente => {
            const fila = document.createElement('tf');
            fila.innerHTML = `
            <td>${cliente.nombre}</td>
            <td>${cliente.apellido}</td>
            <td>${cliente.correo}</td>
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