
const formularioRegistro = document.getElementById('formulario-registro');
const inputNombre = document.getElementById('nombre-completo');
const inputCorreo = document.getElementById('correo');
const inputTelefono = document.getElementById('telefono');
const inputContrasena = document.getElementById('contrasena');
const mostrarContrasena = document.getElementById('mostrar-contrasena');


const intentosFallidos = {};
const cuentasBloqueadas = new Set();


function validarCorreo(correo) {
    const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return patron.test(correo);
}


function validarContrasena(contrasena) {
    const patron = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return patron.test(contrasena);
}


function validarTelefono(telefono) {
    const patron = /^\d{8}$/;
    return patron.test(telefono);
}


function mostrarMensaje(mensaje, tipo) {
    const mensajeElemento = document.createElement('div');
    mensajeElemento.className = `mensaje ${tipo}`;
    mensajeElemento.textContent = mensaje;
    document.querySelector('.contenedor').appendChild(mensajeElemento);
    
  
    setTimeout(() => mensajeElemento.remove(), 3000);
}


formularioRegistro.addEventListener('submit', function(evento) {
    evento.preventDefault();
    
    
    const nombre = inputNombre.value.trim();
    const correo = inputCorreo.value.trim();
    const telefono = inputTelefono.value;
    const contrasena = inputContrasena.value;

  
    let esValido = true;

    if (!nombre || nombre.length < 2) {
        mostrarMensaje('El nombre debe tener al menos 2 caracteres', 'error');
        esValido = false;
    }

    if (!validarCorreo(correo)) {
        mostrarMensaje('Por favor ingrese un correo electrónico válido', 'error');
        esValido = false;
    }

    if (!validarTelefono(telefono)) {
        mostrarMensaje('El teléfono debe tener 8 dígitos', 'error');
        esValido = false;
    }

    if (!validarContrasena(contrasena)) {
        mostrarMensaje('La contraseña debe tener: 8+ caracteres, mayúscula, minúscula, número y símbolo', 'error');
        esValido = false;
    }

    if (esValido) {
        console.log('Registro exitoso:', {
            nombre: nombre,
            correo: correo,
            telefono: telefono
        });
        mostrarMensaje('¡Registro exitoso!', 'exito');
        formularioRegistro.reset();
    }
});

// Evento para mostrar/ocultar contraseña
mostrarContrasena.addEventListener('click', function() {
    const tipo = inputContrasena.getAttribute('type') === 'password' ? 'text' : 'password';
    inputContrasena.setAttribute('type', tipo);
    this.setAttribute('aria-label', 
        tipo === 'password' ? 'Mostrar contraseña' : 'Ocultar contraseña');
});

const formularioLogin = document.getElementById('formulario-login');
const formularioRecuperar = document.getElementById('formulario-recuperar');
const mensajeLogin = document.getElementById('mensaje-login');
const mensajeRecuperacion = document.getElementById('mensaje-recuperacion');


function manejarLogin(evento) {
    evento.preventDefault();
    
    const correo = document.getElementById('correo-login').value.trim();
    const contrasena = document.getElementById('contrasena-login').value;


    if (!validarCorreo(correo)) {
        mostrarMensaje('Por favor ingrese un correo electrónico válido', 'error', 'login');
        return;
    }


    if (!validarCredenciales(correo, contrasena)) {
        manejarIntentoFallido(correo);
        return;
    }


    mostrarMensaje(`Bienvenido al sistema, ${correo}`, 'exito', 'login');
}


function manejarRecuperacion(evento) {
    evento.preventDefault();
    
    const correo = document.getElementById('correo-recuperar').value.trim();
    const nuevaContrasena = document.getElementById('nueva-contrasena').value;


    if (!validarCorreo(correo)) {
        mostrarMensaje('Por favor ingrese un correo electrónico válido', 'error', 'recuperacion');
        return;
    }


    if (!validarContrasena(nuevaContrasena)) {
        mostrarMensaje('La nueva contraseña debe cumplir con los requisitos', 'error', 'recuperacion');
        return;
    }

    desbloquearCuenta(correo);
    mostrarMensaje('Contraseña actualizada. Ahora puede iniciar sesión.', 'exito', 'recuperacion');
}


function mostrarMensaje(mensaje, tipo, seccion = 'registro') {
    const mensajeElemento = document.createElement('div');
    mensajeElemento.className = `mensaje ${tipo}`;
    mensajeElemento.textContent = mensaje;
    
    const contenedor = seccion === 'login' ? mensajeLogin : 
                      seccion === 'recuperacion' ? mensajeRecuperacion : 
                      document.querySelector('.contenedor');
    
    contenedor.appendChild(mensajeElemento);
    
  
    setTimeout(() => mensajeElemento.remove(), 3000);
}


if (formularioLogin) {
    formularioLogin.addEventListener('submit', manejarLogin);
}

if (formularioRecuperar) {
    formularioRecuperar.addEventListener('submit', manejarRecuperacion);
}