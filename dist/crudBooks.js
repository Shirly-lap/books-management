var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import Swal from 'sweetalert2';
import { TemplateController } from "./controllers/template.controller.js";
import { BooksController } from "./controllers/books.controller.js";
const URL_BOOKS = "http://190.147.64.47:5155";
const btnLogout = document.getElementById("btn-logout");
const prevPage = document.getElementById("prev-page");
const nextPage = document.getElementById("next-page");
const btnSearch = document.getElementById("btn-search");
const searchIdInput = document.getElementById("search-id");
const token = localStorage.getItem("authToken");
let currentPage = 1;
const limit = 5;
btnLogout.addEventListener("click", (e) => {
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
            Swal.fire('Logged out!', 'You have been logged out successfully.', 'success').then(() => {
                window.location.href = "index.html";
            });
        }
    });
});
if (!token) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Authentication token is missing. Please log in',
    }).then(() => {
        window.location.href = "index.html";
    });
}
else {
    const booksTableBody = document.getElementById("books-table-body");
    const form = document.getElementById("book-form");
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const description = document.getElementById("description");
    const summary = document.getElementById("summary");
    const publicationDate = document.getElementById("publication-date");
    let idCache;
    const tableTemplate = new TemplateController(booksTableBody);
    function allBooks(limit, currentPage) {
        return __awaiter(this, void 0, void 0, function* () {
            const crudBooks = new BooksController(URL_BOOKS);
            try {
                const response = yield crudBooks.readAllbooks(token, limit, currentPage);
                console.log(`Respuesta de allBooks ${response}`);
                const books = response.data;
                const formattedBooks = books.map((book) => ({
                    id: book.id,
                    title: book.title,
                    author: book.author,
                    description: book.description,
                    summary: book.summary,
                    publicationDate: book.publicationDate
                }));
                tableTemplate.render(formattedBooks);
            }
            catch (error) {
                console.error("Error fetching books:", error);
            }
        });
    }
    allBooks(limit, currentPage);
    prevPage.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
        if (currentPage >= 1) {
            currentPage--;
            yield allBooks(limit, currentPage);
        }
    }));
    nextPage.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
        if (currentPage >= 1) {
            currentPage++;
            yield allBooks(limit, currentPage);
        }
    }));
    form.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const crudBooks = new BooksController(URL_BOOKS);
        if (idCache === undefined) {
            yield crudBooks.createBook(title, author, description, summary, publicationDate, token);
            Swal.fire({
                icon: 'success',
                title: 'Book Created',
                text: 'The book has been created successfully.',
            });
        }
        else {
            yield crudBooks.updateBook(idCache, title, author, description, summary, publicationDate, token);
            idCache = undefined;
            Swal.fire({
                icon: 'success',
                title: 'Book Updated',
                text: 'The book has been updated successfully.',
            });
        }
        form.reset();
        yield allBooks(limit, currentPage);
    }));
    booksTableBody.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
        if (e.target instanceof HTMLButtonElement) {
            const crudBooks = new BooksController(URL_BOOKS);
            if (e.target.classList.contains("btn-warning")) {
                idCache = e.target.dataset.id;
                if (idCache) {
                    const book = yield crudBooks.readById(idCache, token);
                    title.value = book.data.title;
                    author.value = book.data.author;
                    description.value = book.data.description;
                    summary.value = book.data.summary;
                    publicationDate.value = book.data.publicationDate;
                }
            }
            else if (e.target.classList.contains("btn-danger")) {
                console.log("estoy en el delete");
                let bookId = e.target.dataset.id;
                if (bookId) {
                    const confirmDelete = yield Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                    });
                    if (confirmDelete) {
                        yield crudBooks.deleteBook(bookId, token);
                        idCache = undefined;
                        yield allBooks(limit, currentPage);
                        Swal.fire('Deleted!', 'The book has been deleted.', 'success');
                    }
                }
            }
        }
    }));
    btnSearch.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const crudBooks = new BooksController(URL_BOOKS);
        const bookId = searchIdInput.value;
        if (bookId) {
            const book = yield crudBooks.readById(bookId, token);
            if (book) {
                tableTemplate.render([{
                        id: book.data.id,
                        title: book.data.title,
                        author: book.data.author,
                        description: book.data.description,
                        summary: book.data.summary,
                        publicationDate: book.data.publicationDate
                    }]);
            }
            else {
                alert("Book not found");
            }
        }
        else {
            yield allBooks(limit, currentPage);
        }
    }));
}
