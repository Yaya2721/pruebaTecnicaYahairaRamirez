document.getElementById('LoginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const correo = document.getElementById('email').value;
    const contrasenia = document.getElementById('contrasenia'.value);

    const response = await fetch('backend/api.php?action=login', {
        method : 'POST',
        headers : {'Content-type': 'application/json'},
        body : JSON.stringify({correo, contrasenia})
    }
    );
}
);