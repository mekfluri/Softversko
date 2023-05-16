class Student {
    id: number;
    username: string;
    modul: string;
    semestar: number;
    email: string;

    constructor(id: number, username: string, modul: string, semestar: number, email: string){
        this.id = id;
        this.username = username;
        this.modul = modul;
        this.semestar = semestar;
        this.email = email;
    }
}

export { Student }