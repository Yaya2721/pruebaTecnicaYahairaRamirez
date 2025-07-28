document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const correo = document.getElementById('correo').value;
    const contrasenia = document.getElementById('contrasenia').value;

     console.log('Correo:', correo);
     console.log('Contraseña:', contrasenia);

    //INICIO VALIDACIONES
    //variables de regex
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contraseniaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    //Agregamos valivaciones de que esten llenos los campos
    if(!correo || !contrasenia){
        document.getElementById('error').textContent = 'Favor ingresar la información a todos los campos, ya que todos son obligatorios';
        return;
    }
    //Validamos que sea un correo correcto
    if (!correoRegex.test(correo)){
        document.getElementById('error').textContent = 'El correo que ingresó, no es válido';
        return;
    }
    //Validamos que sea una contraseña correcta 
    if (!contraseniaRegex.test(contrasenia)){
        document.getElementById('error').textContent = 'La contraseña ingresada es incorrecta, debe incluir por lo menos 8 caracteres, minusculas, mayusculas y caracteres especiales  ';
        return;
    }
    //FIN VALIDACIONES

try {
     const respuesta = await fetch('backend/api.php?accion=login', {
        method : 'POST',
        headers : {'Content-type': 'application/json'},
        body : JSON.stringify({correo, contrasenia})
    });

    const resultado = await respuesta.json();
    if (resultado.success){
        sessionStorage.setItem('token', resultado.token);
        window.location.href = 'clientes.html';
    } else{
        document.getElementById('error').textContent = 'Credenciales Incorrectas';
    }
} catch (error) {
    document.getElementById('error').textContent = 'Error de conexión, intentelo de nuevo';
}
   
});