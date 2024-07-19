import { BodyRequestCreateBook, BodyResponseGetAllBooks ,BodyResponseCreateBook } from "../models/books.model";

export class BooksController{
    public domain : string;

    constructor (domain:string){
        this.domain = domain;
    }

    async getAllbooks(token: string, limit : number, page: number): Promise <BodyResponseGetAllBooks>{
        const header : Record<string, string> ={
            'accept' : '*/*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        }


        const requestOption :RequestInit ={
            method : 'GET',
            headers : header,
        }
        const response :Response = await fetch(`${this.domain}/api/v1/books?limit=${limit}&page=${page}`, requestOption);
        console.log(response);
        if(!response.ok){
            throw new Error(`Error  al obtener libros: ${response.status}: ${response.statusText}`)
        }
        const responseBodyGetAllBooks : BodyResponseGetAllBooks = await response.json();
        return responseBodyGetAllBooks
    }

    async create(title: HTMLInputElement, author: HTMLInputElement, description : HTMLInputElement, summary : HTMLInputElement, publicationDate: HTMLInputElement, token: string) : Promise <BodyResponseCreateBook>{
        const newBook : BodyRequestCreateBook = {
            title : title.value,
            author :author.value,
            description : description.value,
            summary : summary.value,
            publicationDate : publicationDate.value
        };

        const header : Record<string, string> ={
            'accept' : '*/*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        };

        const requestOption : RequestInit ={
            method : 'POST',
            headers : header,
            body : JSON.stringify(newBook),
        };

        const response : Response = await fetch (`${this.domain}/api/v1/books`)
    if (!response.ok) {
        throw new Error(`Error al crear libros:${response.status}: ${response.statusText}`);
    }
    const responseBodyCreateBook: BodyResponseCreateBook = await response.json();
    return responseBodyCreateBook;
    }

}