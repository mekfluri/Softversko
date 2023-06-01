import { Modul } from "./modul.model";

class Student {
    id: number;
    username: string;
    modul: Modul;
    semestar: number;
    email: string;
    token: string | null;
    perm: string | null;
    bio: string;

    constructor(id: number, username: string, modul: Modul, semestar: number, email: string, perm?: string,   bio: string = ""){
        this.id = id;
        this.username = username;
        this.modul = modul;
        this.semestar = semestar;
        this.email = email;
        this.token = null;
        this.perm = perm ?? null;
        this.bio = bio;
    }
}

export { Student }