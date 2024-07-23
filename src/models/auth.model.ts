// Interfaz para la estructura de la solicitud de login
export interface BodyRequestLogin {
    email: string; // Correo electrónico del usuario
    password: string; // Contraseña del usuario
}

// Interfaz para la estructura de la respuesta de login
export interface BodyResponseLogin {
    message: string; // Mensaje de texto que describe la respuesta
    data: Record<string, string>; // Objeto con pares clave-valor de tipo string que contiene los datos de la respuesta
}
