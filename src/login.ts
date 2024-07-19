import { UsersController } from "./controllers/users.controller.js";

const URL_API : string = "http://190.147.64.47:5155";
const form = document.getElementById("formLogin") as HTMLFormElement;
const email = document.getElementById("email") as HTMLInputElement;
const password = document.getElementById("password") as HTMLInputElement;

form.addEventListener("submit", async (e:Event) =>{
    e.preventDefault();
    const user = new UsersController(URL_API);
    const  response = await user.login(email, password);


    const token : string | null = response.data.token;

    if(token){
        localStorage.setItem('authToken', token);
        window.location.href = "books.html"
    }
    else{
        console.log("login falló");
    }
    form.reset()

})