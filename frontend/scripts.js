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
        const celular = document.getElementById('celular').value;
        const role = document.getElementById('role').value;

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        const data = { nombre, email, password, celular };

        try {
            const response = await fetch(`http://localhost:4000/${role === 'doctor' ? 'doctores' : 'pacientes'}/registrar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            alert(result.mensaje || 'Registro exitoso');
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
            const response = await fetch(`http://localhost:4000/${role === 'doctor' ? 'doctores' : 'pacientes'}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            alert(result.msg || 'Login exitoso');
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al iniciar sesión');
        }
    });
});
