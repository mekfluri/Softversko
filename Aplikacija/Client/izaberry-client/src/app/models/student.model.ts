import { Modul } from "./modul.model";
import { Privilegije } from "./permission.model";

class Student {
    id: number;
    username: string;
    modul: Modul;
    semestar: number;
    email: string;
    token: string | null;
    perm: Privilegije;
    bio: string;

    constructor(id: number, username: string, modul: Modul, semestar: number, email: string, perm?: Privilegije,   bio: string = ""){
        this.id = id;
        this.username = username;
        this.modul = modul;
        this.semestar = semestar;
        this.email = email;
        this.token = null;
        this.perm = perm ?? Privilegije.STUDENT;
        this.bio = bio;
    }
}

export { Student }