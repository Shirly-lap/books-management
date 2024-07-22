import { 
    BodyRequestCreateBook, 
    BodyResponseGetAllBooks, 
    BodyResponseCreateBook, 
    BodyResponseGetById, 
    BodyResponseUpdateBook, 
    BodyResquestUpdateBook, 
    BodyResponseDeleteBook 
} from "../models/books.model";

export class BooksController {
    public domain: string; // URL base de la API

    /**
     * Constructor de la clase BooksController
     * @param domain - URL base de la API
     */
    constructor(domain: string) {
        this.domain = domain;
    }

    /**
     * Crea un nuevo libro
     * @param title - Campo HTMLInputElement para el título del libro
     * @param author - Campo HTMLInputElement para el autor del libro
     * @param description - Campo HTMLInputElement para la descripción del libro
     * @param summary - Campo HTMLInputElement para el resumen del libro
     * @param publicationDate - Campo HTMLInputElement para la fecha de publicación del libro
     * @param token - Token de autenticación del usuario
     * @returns - Promesa que resuelve con la respuesta del servidor al crear el libro
     * @throws - Error si la respuesta del servidor no es OK
     */
    async createBook(
        title: HTMLInputElement, 
        author: HTMLInputElement, 
        description: HTMLInputElement, 
        summary: HTMLInputElement, 
        publicationDate: HTMLInputElement, 
        token: string
    ): Promise<BodyResponseCreateBook> {
        // Construye el objeto con los datos del libro a crear
        const newBook: BodyRequestCreateBook = {
            title: title.value,
            author: author.value,
            description: description.value,
            summary: summary.value,
            publicationDate: publicationDate.value
        };

        // Configura los encabezados de la solicitud
        const header: Record<string, string> = {
            "accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        };

        // Configura las opciones de la solicitud
        const reqOptions: RequestInit = {
            method: "POST",
            headers: header,
            body: JSON.stringify(newBook)
        };

        // Realiza la solicitud para crear el libro
        const response: Response = await fetch(`${this.domain}/api/v1/books`, reqOptions);

        if (!response.ok) {
            // Lanza un error si la respuesta no es OK
            throw new Error(`Error al crear el libro: ${response.status}: ${response.statusText}`);
        }

        // Obtiene y retorna la respuesta del servidor
        const responseBodyCreateBook: BodyResponseCreateBook = await response.json();
        return responseBodyCreateBook;
    }

    /**
     * Obtiene todos los libros con paginación
     * @param token - Token de autenticación del usuario
     * @param limit - Número máximo de libros por página
     * @param page - Número de la página actual
     * @returns - Promesa que resuelve con la respuesta del servidor con la lista de libros
     * @throws - Error si la respuesta del servidor no es OK
     */
    async readAllbooks(token: string, limit: number, page: number): Promise<BodyResponseGetAllBooks> {
        // Configura los encabezados de la solicitud
        const header: Record<string, string> = {
            'accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        // Configura las opciones de la solicitud
        const requestOption: RequestInit = {
            method: 'GET',
            headers: header,
        };

        // Realiza la solicitud para obtener todos los libros
        const response: Response = await fetch(`${this.domain}/api/v1/books?limit=${limit}&page=${page}`, requestOption);
        console.log(response);

        if (!response.ok) {
            // Lanza un error si la respuesta no es OK
            throw new Error(`Error al obtener libros: ${response.status}: ${response.statusText}`);
        }

        // Obtiene y retorna la respuesta del servidor
        const responseBodyGetAllBooks: BodyResponseGetAllBooks = await response.json();
        return responseBodyGetAllBooks;
    }

    /**
     * Actualiza un libro existente
     * @param idCatche - ID del libro a actualizar
     * @param title - Campo HTMLInputElement para el nuevo título del libro
     * @param author - Campo HTMLInputElement para el nuevo autor del libro
     * @param description - Campo HTMLInputElement para la nueva descripción del libro
     * @param summary - Campo HTMLInputElement para el nuevo resumen del libro
     * @param publicationDate - Campo HTMLInputElement para la nueva fecha de publicación del libro
     * @param token - Token de autenticación del usuario
     * @returns - Promesa que resuelve con la respuesta del servidor al actualizar el libro
     * @throws - Error si la respuesta del servidor no es OK
     */
    async updateBook(
        idCatche: string, 
        title: HTMLInputElement, 
        author: HTMLInputElement, 
        description: HTMLInputElement, 
        summary: HTMLInputElement, 
        publicationDate: HTMLInputElement, 
        token: string
    ): Promise<BodyResponseUpdateBook> {
        // Construye el objeto con los datos actualizados del libro
        const updateBook: BodyResquestUpdateBook = {
            title: title.value,
            author: author.value,
            description: description.value,
            summary: summary.value,
            publicationDate: publicationDate.value
        };

        // Configura los encabezados de la solicitud
        const header: Record<string, string> = {
            "accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };

        // Configura las opciones de la solicitud
        const requestOption: RequestInit = {
            method: "PATCH",
            headers: header,
            body: JSON.stringify(updateBook)
        };

        // Realiza la solicitud para actualizar el libro
        const response: Response = await fetch(`${this.domain}/api/v1/books/${idCatche}`, requestOption);
        if (!response.ok) {
            // Lanza un error si la respuesta no es OK
            throw new Error(`Error al actualizar el libro:${response.status}: ${response.statusText}`);
        }

        // Obtiene y retorna la respuesta del servidor
        const responseBodyUpdateBook: BodyResponseUpdateBook = await response.json();
        return responseBodyUpdateBook;
    }

    /**
     * Elimina un libro
     * @param id - ID del libro a eliminar
     * @param token - Token de autenticación del usuario
     * @returns - Promesa que resuelve con la respuesta del servidor al eliminar el libro
     * @throws - Error si la respuesta del servidor no es OK
     */
    async deleteBook(id: string, token: string): Promise<BodyResponseDeleteBook> {
        // Configura los encabezados de la solicitud
        const header: Record<string, string> = {
            "accept": "*/*",
            "Authorization": `Bearer ${token}`,
        };

        // Configura las opciones de la solicitud
        const requestOption: RequestInit = {
            method: "DELETE",
            headers: header
        };

        // Realiza la solicitud para eliminar el libro
        const response: Response = await fetch(`${this.domain}/api/v1/books/${id}`, requestOption);
        if (!response.ok) {
            // Lanza un error si la respuesta no es OK
            throw new Error(`Error al eliminar libro:${response.status}: ${response.statusText}`);
        }

        // Obtiene y retorna la respuesta del servidor
        const responseBodyDeleteBook: BodyResponseDeleteBook = await response.json();
        return responseBodyDeleteBook;
    }

    /**
     * Obtiene un libro por su ID
     * @param id - ID del libro a obtener
     * @param token - Token de autenticación del usuario
     * @returns - Promesa que resuelve con la respuesta del servidor con los detalles del libro
     * @throws - Error si la respuesta del servidor no es OK
     */
    async readById(id: string, token: string): Promise<BodyResponseGetById> {
        // Configura los encabezados de la solicitud
        const header: Record<string, string> = {
            "accept": "*/*",
            "Authorization": `Bearer ${token}`,
        };

        // Configura las opciones de la solicitud
        const requestOption: RequestInit = {
            method: "GET",
            headers: header,
        };

        // Realiza la solicitud para obtener un libro por su ID
        const response: Response = await fetch(`${this.domain}/api/v1/books/${id}`, requestOption);
        if (!response.ok) {
            // Lanza un error si la respuesta no es OK
            throw new Error(`Error al obtener el libro:${response.status}: ${response.statusText}`);
        }

        // Obtiene y retorna la respuesta del servidor
        const responseBodyGetById: BodyResponseGetById = await response.json();
        return responseBodyGetById;
    }
}
