var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class BooksController {
    constructor(domain) {
        this.domain = domain;
    }
    createBook(title, author, description, summary, publicationDate, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBook = {
                title: title.value,
                author: author.value,
                description: description.value,
                summary: summary.value,
                publicationDate: publicationDate.value
            };
            const header = {
                "accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            };
            const reqOptions = {
                method: "POST",
                headers: header,
                body: JSON.stringify(newBook)
            };
            const response = yield fetch(`${this.domain}/api/v1/books`, reqOptions);
            if (!response.ok) {
                throw new Error(`Error al crear el libro: ${response.status}: ${response.statusText}`);
            }
            const responseBodyCreateBook = yield response.json();
            return responseBodyCreateBook;
        });
    }
    readAllbooks(token, limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const header = {
                'accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };
            const requestOption = {
                method: 'GET',
                headers: header,
            };
            const response = yield fetch(`${this.domain}/api/v1/books?limit=${limit}&page=${page}`, requestOption);
            console.log(response);
            if (!response.ok) {
                throw new Error(`Error  al obtener libros: ${response.status}: ${response.statusText}`);
            }
            const responseBodyGetAllBooks = yield response.json();
            return responseBodyGetAllBooks;
        });
    }
    updateBook(idCatche, title, author, description, summary, publicationDate, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateBook = {
                title: title.value,
                author: author.value,
                description: description.value,
                summary: summary.value,
                publicationDate: publicationDate.value
            };
            const header = {
                "accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            };
            const requestOption = {
                method: "PATCH",
                headers: header,
                body: JSON.stringify(updateBook)
            };
            const response = yield fetch(`${this.domain}/api/v1/books/${idCatche}`, requestOption);
            if (!response.ok) {
                throw new Error(`Error al actualizar el libro:${response.status}: ${response.statusText}`);
            }
            const responseBodyUpdateBook = yield response.json();
            return responseBodyUpdateBook;
        });
    }
    deleteBook(id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const header = {
                "accept": "*/*",
                "Authorization": `Bearer ${token}`,
            };
            const requestOption = {
                method: "DELETE",
                headers: header
            };
            const response = yield fetch(`${this.domain}/api/v1/books/${id}`, requestOption);
            if (!response.ok) {
                throw new Error(`Error al eliminar libro:${response.status}: ${response.statusText}`);
            }
            const responseBodyDeleteBook = yield response.json();
            return responseBodyDeleteBook;
        });
    }
    readById(id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const header = {
                "accept": "*/*",
                "Authorization": `Bearer ${token}`,
            };
            const requestOption = {
                method: "GET",
                headers: header,
            };
            const response = yield fetch(`${this.domain}/api/v1/books/${id}`, requestOption);
            if (!response.ok) {
                throw new Error(`Error al obtener el libro:${response.status}: ${response.statusText}`);
            }
            const responseBodyGetById = yield response.json();
            return responseBodyGetById;
        });
    }
}
