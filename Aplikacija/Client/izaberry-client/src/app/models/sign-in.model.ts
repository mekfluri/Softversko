class SignInModel {
    email: string;
    password: string;
    username: string;
    modul: string;
    semestar: number;
    constructor(){
        this.email = "";
        this.password = "";
        this.username = "";
        this.modul = "Racunarstvo i Informatika";
        this.semestar = 0;
    }
}

export { SignInModel }