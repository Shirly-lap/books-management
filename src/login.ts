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

    try {
        const response = await user.login(email, password);
        const token: string | null = response.data.token;

        if (token) {
            localStorage.setItem('authToken', token);
            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: 'You have successfully logged in.',
            }).then(() => {
                window.location.href = "books.html";
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Invalid email or password.',
            });
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while trying to log in.',
        });
        console.error("Login error:", error);
    }
    form.reset()

})