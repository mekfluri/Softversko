import { Modul } from "./modul.model";

class SignInModel {
    email: string;
    password: string;
    username: string;
    modul: Modul;
    semestar: number;
    constructor(){
        this.email = "";
        this.password = "";
        this.username = "";
        this.modul = new Modul(0, "");
        this.semestar = 0;
    }
}

export { SignInModel }