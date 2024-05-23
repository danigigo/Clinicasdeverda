document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const showRegisterButton = document.getElementById('show-register');
    const showLoginButton = document.getElementById('show-login');
    const loginContainer = document.getElementById('login-container');
    const registerContainer = document.getElementById('register-container');

    showRegisterButton.addEventListener('click', () => {
        loginContainer.classList.add('fade-out');
        loginContainer.classList.remove('fade-in');
        registerContainer.classList.add('fade-in');
        registerContainer.classList.remove('fade-out');
        setTimeout(() => {
            loginContainer.style.display = 'none';
            registerContainer.style.display = 'block';
        }, 500); // Duración de la animación
    });

    showLoginButton.addEventListener('click', () => {
        registerContainer.classList.add('fade-out');
        registerContainer.classList.remove('fade-in');
        loginContainer.classList.add('fade-in');
        loginContainer.classList.remove('fade-out');
        setTimeout(() => {
            registerContainer.style.display = 'none';
            loginContainer.style.display = 'block';
        }, 500); // Duración de la animación
    });

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const Celular = document.getElementById('celular').value;
        const role = document.getElementById('role').value;

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        const data = { nombre, email, password, Celular };

        try {
            let response;
            if (role === 'doctor') {
                response = await axios.post('http://localhost:4000/doctores/registrardoc', data);
            } else {
                response = await axios.post('http://localhost:4000/pacientes/registrar', data);
            }
            alert(response.data.mensaje || 'Registro exitoso');
            // Recarga la página después del registro exitoso
            location.reload();
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al registrar');
        }
    });

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); 
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const role = document.getElementById('login-role').value;

        const data = { email, password };

        try {
            let response;
            if (role === 'doctor') {
                response = await axios.post('http://localhost:4000/doctores/login', data);
                if (response.data.mensaje === 'Inicio de sesión exitoso') {
                    const nombre = response.data.nombre ? response.data.nombre : '';
                    alert(`Bienvenido, Doctor ${nombre}`);
                    window.location.href = `perfildoc.html?nombre=${nombre}`;
                }
            } else {
                response = await axios.post('http://localhost:4000/pacientes/login', data);
                if (response.data.mensaje === 'Inicio de sesión exitoso') {
                    const nombre = response.data.nombre ? response.data.nombre : '';
                    alert(`Bienvenido, Paciente ${nombre}`);
                    window.location.href = `perfilpac.html?nombre=${nombre}`;
                }
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al iniciar sesión');
        }
    });
});
