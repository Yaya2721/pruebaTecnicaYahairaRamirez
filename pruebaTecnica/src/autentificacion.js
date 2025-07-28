document.getElementById('LoginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const correo = document.getElementById('correo').value;
    const contrasenia = document.getElementById('contrasenia'.value);

    const response = await fetch('backend/api.php?action=login', {
        method : 'POST',
        headers : {'Content-type': 'application/json'},
        body : JSON.stringify({correo, contrasenia})
    });
    const resultado = await response.json();
    if (resultado.success){
        sessionStorage.setItem('token', resultado.token);
        window.location.href = 'dashboard.html';
    } else{
        document.getElementById('error').textContent = 'Credenciales Incorrectas';
    }
});