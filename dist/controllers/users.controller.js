var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class UsersController {
    constructor(domain) {
        this.domain = domain; // Inicializa el dominio de la API
    }
    /**
     * Método para autenticar a un usuario
     * @param email - Elemento HTMLInputElement que contiene el correo electrónico del usuario
     * @param password - Elemento HTMLInputElement que contiene la contraseña del usuario
     * @returns - Promesa que resuelve un objeto BodyResponseLogin
     * @throws - Lanza un error si la respuesta de la API no es exitosa
     */
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            // Construye el objeto de credenciales para la solicitud
            const credentials = {
                email: email.value,
                password: password.value
            };
            // Define los encabezados para la solicitud
            const header = {
                'accept': '*/*',
                'Content-Type': 'application/json'
            };
            // Define las opciones de la solicitud
            const requestOption = {
                method: 'POST',
                headers: header,
                body: JSON.stringify(credentials),
            };
            // Realiza la solicitud a la API
            const response = yield fetch(`${this.domain}/api/v1/auth/login`, requestOption);
            // Verifica si la respuesta de la API es exitosa
            if (!response.ok) {
                // Muestra el mensaje de error en la consola
                console.log(`Response body: ${(yield response.json()).message}`);
                // Lanza un error si la respuesta no es exitosa
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            // Analiza y retorna el cuerpo de la respuesta como BodyResponseLogin
            const responseBodyLogin = yield response.json();
            return responseBodyLogin;
        });
    }
}
