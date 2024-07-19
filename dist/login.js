var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UsersController } from "./controllers/users.controller.js";
const URL_API = "http://190.147.64.47:5155";
const form = document.getElementById("formLogin");
const email = document.getElementById("email");
const password = document.getElementById("password");
form.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const user = new UsersController(URL_API);
    const response = yield user.login(email, password);
    const token = response.data.token;
    if (token) {
        localStorage.setItem('authToken', token);
        window.location.href = "books.html";
    }
    else {
        console.log("login falló");
    }
    form.reset();
}));
