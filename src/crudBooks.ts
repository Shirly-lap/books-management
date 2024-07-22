import { TemplateController } from "./controllers/template.controller.js";
import { BooksController } from "./controllers/books.controller.js";


const URL_BOOKS: string = "http://190.147.64.47:5155";
const btnLogout = document.getElementById("btn-logout") as HTMLButtonElement;
const  prevPage = document.getElementById("prev-page") as HTMLButtonElement;
const  nextPage = document.getElementById("next-page") as HTMLButtonElement;
const token = localStorage.getItem("authToken");

let currentPage : number = 1;
const limit : number = 5;

btnLogout.addEventListener("click", (e:Event)=>{
    localStorage.removeItem("authToken");
    window.location.href = "index.html"
});

if (!token) {
    alert("Authentication token is missing. Please log in")
    window.location.href = "index.html";
} else {
    const containerBooks = document.querySelector(".container-books") as HTMLDivElement;
    const form = document.querySelector("form") as HTMLFormElement;
    const title = document.getElementById("title") as HTMLInputElement;
    const author = document.getElementById("author") as HTMLInputElement;
    const description = document.getElementById("description") as HTMLInputElement;
    const summary = document.getElementById("summary") as HTMLInputElement;
    const publicationDate = document.getElementById("publication-date") as HTMLInputElement;
    let idCatche : undefined | string;



    const cardTemplate = new TemplateController(containerBooks);


    async function allBooks(limit: number, currentPage: number) {
        const crudBooks = new BooksController(URL_BOOKS);
        try {
            const response = await crudBooks.readAllbooks(token as string, limit, currentPage);
            console.log(`Respuesta de allBooks ${response}`)
            const books = response.data;

            containerBooks.innerHTML = '';

            for (const book of books) {
                cardTemplate.render(book.id, book.title, book.author, book.description, book.summary, book.publicationDate);
            }

        } catch (error) {
            console.error("Error fetching books:", error);
        }
    }
    allBooks(limit, currentPage);

    
    prevPage.addEventListener("click", async (e: Event) => {
        if (currentPage >= 1) {
            currentPage--
            await allBooks(limit, currentPage);
        }
    });

    nextPage.addEventListener("click", async (e: Event) => {
        if (currentPage >= 1) {
            currentPage++
            await allBooks(limit, currentPage);
        }
    });

    form.addEventListener("submit", async (e: Event) => {
        e.preventDefault();
        const crudBooks = new BooksController(URL_BOOKS);

        if (idCatche === undefined) {
            await crudBooks.createBook(title, author, description, summary, publicationDate, token as string);
        } else {
            await crudBooks.updateBook(idCatche, title, author, description, summary, publicationDate, token as string);
            idCatche = undefined;
        }
        form.reset();
        await allBooks(limit, currentPage);
    });

    containerBooks.addEventListener("click", async (e: Event) => {
        if (e.target instanceof HTMLButtonElement) {
            const crudBooks = new BooksController(URL_BOOKS);

            if (e.target.classList.contains("btn-warning")) {
                idCatche = e.target.dataset.id;

                if (idCatche) {
                    const book = await crudBooks.readById(idCatche, token as string)
                    title.value = book.data.title;
                    author.value = book.data.author;
                    description.value = book.data.description;
                    summary.value = book.data.summary;
                    publicationDate.value = book.data.publicationDate
                }
            } else if (e.target.classList.contains("btn-danger")) {
                console.log("estoy en el delete")
                let bookId = e.target.dataset.id;

                if (bookId) {
                    const confirmDelete = confirm("Are you sure you want to delete?")
                    if (confirmDelete) {
                        await crudBooks.deleteBook(bookId, token as string);
                        idCatche = undefined;
                        await allBooks(limit, currentPage);
                    }
                }
            }
        }

    })

}