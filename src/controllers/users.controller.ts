import { BodyRequestLogin, BodyResponseLogin } from "../models/auth.model";

export class UsersController {
    public domain: string; // Dominio de la API

    constructor(domain: string) {
        this.domain = domain; // Inicializa el dominio de la API
    }

    /**
     * Método para autenticar a un usuario
     * @param email - Elemento HTMLInputElement que contiene el correo electrónico del usuario
     * @param password - Elemento HTMLInputElement que contiene la contraseña del usuario
     * @returns - Promesa que resuelve un objeto BodyResponseLogin
     * @throws - Lanza un error si la respuesta de la API no es exitosa
     */
    async login(email: HTMLInputElement, password: HTMLInputElement): Promise<BodyResponseLogin> {
        // Construye el objeto de credenciales para la solicitud
        const credentials: BodyRequestLogin = {
            email: email.value,
            password: password.value
        };

        // Define los encabezados para la solicitud
        const header: Record<string, string> = {
            'accept': '*/*',
            'Content-Type': 'application/json'
        };

        // Define las opciones de la solicitud
        const requestOption: RequestInit = {
            method: 'POST',
            headers: header,
            body: JSON.stringify(credentials),
        };

        // Realiza la solicitud a la API
        const response: Response = await fetch(`${this.domain}/api/v1/auth/login`, requestOption);

        // Verifica si la respuesta de la API es exitosa
        if (!response.ok) {
            // Muestra el mensaje de error en la consola
            console.log(`Response body: ${(await response.json()).message}`);
            // Lanza un error si la respuesta no es exitosa
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        // Analiza y retorna el cuerpo de la respuesta como BodyResponseLogin
        const responseBodyLogin: BodyResponseLogin = await response.json();
        return responseBodyLogin;
    }
}
