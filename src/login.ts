import { UsersController } from "./controllers/users.controller.js";

// URL de la API
const URL_API: string = "http://190.147.64.47:5155";

// Obtener los elementos del formulario y los campos de entrada
const form = document.getElementById("formLogin") as HTMLFormElement;
const email = document.getElementById("email") as HTMLInputElement;
const password = document.getElementById("password") as HTMLInputElement;

// Agregar evento de submit al formulario
form.addEventListener("submit", async (e: Event) => {
    e.preventDefault(); // Prevenir la acción predeterminada del formulario

    // Crear una instancia del controlador de usuarios
    const user = new UsersController(URL_API);

    try {
        // Llamar a la función de login del controlador de usuarios
        const response = await user.login(email, password);
        const token: string | null = response.data.token; // Obtener el token de la respuesta

        if (token) {
            // Si el token existe, almacenarlo en el localStorage y mostrar una alerta de éxito
            localStorage.setItem('authToken', token);
            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: 'You have successfully logged in.',
            }).then(() => {
                // Redirigir a la página de libros después de cerrar la alerta
                window.location.href = "books.html";
            });
        } else {
            // Si no hay token, mostrar una alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Invalid email or password.',
            });
        }
    } catch (error) {
        // Mostrar una alerta de error en caso de que ocurra un error durante el login
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while trying to log in.',
        });
        console.error("Login error:", error);
    }

    form.reset(); // Reiniciar el formulario después de enviar los datos
});
