import { TemplateController } from "./controllers/template.controller.js";
import { BooksController } from "./controllers/books.controller.js";

// URL de la API de libros
const URL_BOOKS: string = "http://190.147.64.47:5155";

// Elementos del DOM
const btnLogout = document.getElementById("btn-logout") as HTMLButtonElement;
const prevPage = document.getElementById("prev-page") as HTMLButtonElement;
const nextPage = document.getElementById("next-page") as HTMLButtonElement;
const btnSearch = document.getElementById("btn-search") as HTMLButtonElement;
const searchIdInput = document.getElementById("search-id") as HTMLInputElement;

// Obtener el token de autenticación almacenado en el localStorage
const token = localStorage.getItem("authToken");

// Variables para la paginación
let currentPage: number = 1;
const limit: number = 5;

// Evento para el botón de cerrar sesión
btnLogout.addEventListener("click", (e: Event) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You will be logged out!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, log me out!'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("authToken");
            Swal.fire(
                'Logged out!',
                'You have been logged out successfully.',
                'success'
            ).then(() => {
                window.location.href = "index.html";
            });
        }
    });
});

// Verificar si el token de autenticación existe
if (!token) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Authentication token is missing. Please log in',
    }).then(() => {
        window.location.href = "index.html";
    });
} else {
    // Elementos del DOM para la tabla de libros y el formulario de libros
    const booksTableBody = document.getElementById("books-table-body") as HTMLTableSectionElement;
    const form = document.getElementById("book-form") as HTMLFormElement;
    const title = document.getElementById("title") as HTMLInputElement;
    const author = document.getElementById("author") as HTMLInputElement;
    const description = document.getElementById("description") as HTMLInputElement;
    const summary = document.getElementById("summary") as HTMLInputElement;
    const publicationDate = document.getElementById("publication-date") as HTMLInputElement;
    let idCache: undefined | string;

    // Controlador de plantillas para renderizar libros
    const tableTemplate = new TemplateController(booksTableBody);

    // Función para cargar todos los libros con paginación
    async function allBooks(limit: number, currentPage: number) {
        const crudBooks = new BooksController(URL_BOOKS);
        try {
            const response = await crudBooks.readAllbooks(token as string, limit, currentPage);
            console.log(`Respuesta de allBooks ${response}`);
            const books = response.data;

            const formattedBooks = books.map((book: any) => ({
                id: book.id,
                title: book.title,
                author: book.author,
                description: book.description,
                summary: book.summary,
                publicationDate: book.publicationDate
            }));

            tableTemplate.render(formattedBooks);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    }
    allBooks(limit, currentPage);

    // Evento para el botón de página anterior
    prevPage.addEventListener("click", async (e: Event) => {
        if (currentPage >= 1) {
            currentPage--;
            await allBooks(limit, currentPage);
        }
    });

    // Evento para el botón de página siguiente
    nextPage.addEventListener("click", async (e: Event) => {
        if (currentPage >= 1) {
            currentPage++;
            await allBooks(limit, currentPage);
        }
    });

    // Evento para el formulario de crear/actualizar libro
    form.addEventListener("submit", async (e: Event) => {
        e.preventDefault();
        const crudBooks = new BooksController(URL_BOOKS);

        if (idCache === undefined) {
            await crudBooks.createBook(title, author, description, summary, publicationDate, token as string);
            Swal.fire({
                icon: 'success',
                title: 'Book Created',
                text: 'The book has been created successfully.',
            });
        } else {
            await crudBooks.updateBook(idCache, title, author, description, summary, publicationDate, token as string);
            idCache = undefined;
            Swal.fire({
                icon: 'success',
                title: 'Book Updated',
                text: 'The book has been updated successfully.',
            });
        }
        form.reset();
        await allBooks(limit, currentPage);
    });

    // Evento para los botones de editar y eliminar en la tabla de libros
    booksTableBody.addEventListener("click", async (e: Event) => {
        if (e.target instanceof HTMLButtonElement) {
            const crudBooks = new BooksController(URL_BOOKS);

            if (e.target.classList.contains("btn-warning")) {
                idCache = e.target.dataset.id;

                if (idCache) {
                    const book = await crudBooks.readById(idCache, token as string);
                    title.value = book.data.title;
                    author.value = book.data.author;
                    description.value = book.data.description;
                    summary.value = book.data.summary;
                    publicationDate.value = book.data.publicationDate;
                }
            } else if (e.target.classList.contains("btn-danger")) {
                console.log("estoy en el delete");
                let bookId = e.target.dataset.id;

                if (bookId) {
                    const confirmDelete = await Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                    });

                    if (confirmDelete) {
                        await crudBooks.deleteBook(bookId, token as string);
                        idCache = undefined;
                        await allBooks(limit, currentPage);
                        Swal.fire(
                            'Deleted!',
                            'The book has been deleted.',
                            'success'
                        );
                    }
                }
            }
        }
    });

    // Evento para el botón de búsqueda de libro por ID
    btnSearch.addEventListener("click", async (e: Event) => {
        e.preventDefault();
        const crudBooks = new BooksController(URL_BOOKS);
        const bookId = searchIdInput.value;

        if (bookId) {
            const book = await crudBooks.readById(bookId, token as string);
            if (book) {
                tableTemplate.render([{
                    id: book.data.id,
                    title: book.data.title,
                    author: book.data.author,
                    description: book.data.description,
                    summary: book.data.summary,
                    publicationDate: book.data.publicationDate
                }]);
            } else {
                alert("Book not found");
            }
        } else {
            await allBooks(limit, currentPage);
        }
    });
}
