var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UsersController } from "./controllers/users.controller.js";
// URL de la API
const URL_API = "http://190.147.64.47:5155";
// Obtener los elementos del formulario y los campos de entrada
const form = document.getElementById("formLogin");
const email = document.getElementById("email");
const password = document.getElementById("password");
// Agregar evento de submit al formulario
form.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault(); // Prevenir la acción predeterminada del formulario
    // Crear una instancia del controlador de usuarios
    const user = new UsersController(URL_API);
    try {
        // Llamar a la función de login del controlador de usuarios
        const response = yield user.login(email, password);
        const token = response.data.token; // Obtener el token de la respuesta
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
        }
        else {
            // Si no hay token, mostrar una alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Invalid email or password.',
            });
        }
    }
    catch (error) {
        // Mostrar una alerta de error en caso de que ocurra un error durante el login
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while trying to log in.',
        });
        console.error("Login error:", error);
    }
    form.reset(); // Reiniciar el formulario después de enviar los datos
}));
