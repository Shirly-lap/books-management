var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class UsersController {
    constructor(domain) {
        this.domain = domain;
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const credentials = {
                email: email.value,
                password: password.value
            };
            const header = {
                'accept': '*/*',
                'Content-Type': 'application/json'
            };
            const requestOption = {
                method: 'POST',
                headers: header,
                body: JSON.stringify(credentials),
            };
            const response = yield fetch(`${this.domain}/api/v1/auth/login`, requestOption);
            if (!response.ok) {
                console.log(`Response body : ${(yield response.json()).message}`);
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const responseBodyLogin = yield response.json();
            return responseBodyLogin;
        });
    }
}
