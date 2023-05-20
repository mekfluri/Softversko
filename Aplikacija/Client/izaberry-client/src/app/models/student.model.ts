class Student {
    id: number;
    username: string;
    modul: string;
    semestar: number;
    email: string;
    token: string | null;

    constructor(id: number, username: string, modul: string, semestar: number, email: string){
        this.id = id;
        this.username = username;
        this.modul = modul;
        this.semestar = semestar;
        this.email = email;
        this.token = null;
    }
}

export { Student }