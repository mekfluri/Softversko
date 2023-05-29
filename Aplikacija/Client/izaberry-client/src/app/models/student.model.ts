class Student {
    id: number;
    username: string;
    modul: string;
    semestar: number;
    email: string;
    token: string | null;
    perm: string | null;

    constructor(id: number, username: string, modul: string, semestar: number, email: string, perm?: string){
        this.id = id;
        this.username = username;
        this.modul = modul;
        this.semestar = semestar;
        this.email = email;
        this.token = null;
        this.perm = perm ?? null;
    }
}

export { Student }