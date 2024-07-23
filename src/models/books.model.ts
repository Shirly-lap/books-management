// Interfaz para la respuesta al obtener todos los libros
export interface BodyResponseGetAllBooks {
    message: string; // Mensaje de respuesta
    data: Datum[]; // Array de objetos de tipo Datum que contiene la información de los libros
}

// Interfaz que define la estructura de los datos de cada libro
export interface Datum {
    id: string;
    title: string;
    author: string;
    description: string;
    summary: string;
    publicationDate: string;
    createdBy: string;
    updatedBy: null;
    deletedBy: null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: null;
    files: any[];
}

// Interfaz para la solicitud al crear un nuevo libro
export interface BodyRequestCreateBook {
    title: string
    author: string
    description: string
    summary: string
    publicationDate: string
}

// Interfaz para la respuesta al crear un nuevo libro
export interface BodyResponseCreateBook{
    message: string, // Mensaje de respuesta
    data : Record <string, string> // Objeto con pares clave-valor de tipo string que contiene los datos del libro creado
}

// Interfaz para la respuesta al obtener un libro por su ID
export interface BodyResponseGetById {
    message: string, 
    data : Record <string, string> 
}
// Interfaz para la solicitud al actualizar un libro
export interface BodyResquestUpdateBook{
    title: string
    author: string
    description: string
    summary: string
    publicationDate: string
}

// Interfaz para la respuesta al actualizar un libro
export interface BodyResponseUpdateBook {
    message: string, 
    data : Record <string, string> 
}

// Interfaz para la respuesta al eliminar un libro
export interface BodyResponseDeleteBook{
    message: string, 
    data: null
}

