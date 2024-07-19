import { BodyRequestLogin, BodyResponseLogin } from "../models/auth.model";

export class UsersController{
    public domain : string;

    constructor (domain: string){
        this.domain = domain;
    }

    async login (email: HTMLInputElement, password: HTMLInputElement) : Promise <BodyResponseLogin>{
        const credentials : BodyRequestLogin = {
            email : email.value,
            password : password.value
        }

        const header : Record<string, string> ={
            'accept' : '*/*',
            'Content-Type': 'application/json'
        }

        const requestOption : RequestInit ={
            method : 'POST',
            headers : header,
            body : JSON.stringify(credentials),
        }

        const response : Response = await fetch(`${this.domain}/api/v1/auth/login`, requestOption);

        if (!response.ok) {
            console.log(`Response body : ${(await response.json()).message}`);
            throw new  Error(`Error: ${response.status} ${response.statusText}`);         
        }

        const responseBodyLogin : BodyResponseLogin = await response.json();
        return responseBodyLogin;
    }

}