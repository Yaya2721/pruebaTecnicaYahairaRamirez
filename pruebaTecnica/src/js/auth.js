document.getElementById('LoginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const correo = document.getElementById('correo').value;
    const contrasenia = document.getElementById('contrasenia'.value);

    //INICIO VALIDACIONES
    //variables de regex
    const correoRegex = /^[\s@]+@[^\s@]+>.[^\s@]+$/;
    const contraseniaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ 

    //Agregamos valivaciones de que esten llenos los campos
    if(!correo || !contrasenia){
        document.getElementById('error').textContent = 'Favor ingresar la información a todos los campos, ya que todos son obligatorios';
    }
    //Validamos que sea un correo correcto
    if (!correoRegex.test(correo)){
        document.getElementById('error').textContent = 'El correo que ingresó, no es válido';
    }
    //Validamos que sea una contraseña correcta 
    if (!contraseniaRegex.test(contrasenia)){
        document.getElementById('error').textContent = 'La contraseña ingresada es incorrecta, debe incluir por lo menos 8 caracteres, minusculas, mayusculas y caracteres especiales  ';
    }
    //FIN VALIDACIONES
try {
     const response = await fetch('backend/api.php?action=login', {
        method : 'POST',
        headers : {'Content-type': 'application/json'},
        body : JSON.stringify({correo, contrasenia})
    });
    const resultado = await response.json();
    if (resultado.success){
        sessionStorage.setItem('token', resultado.token);
        window.location.href = '.html';
    } else{
        document.getElementById('error').textContent = 'Credenciales Incorrectas';
    }
} catch (error) {
    document.getElementById('error').textContent = 'Error de conexión, intentelo de nuevo';
}
   
});