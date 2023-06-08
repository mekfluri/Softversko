import { Modul } from "./modul.model";
import { Privilegije } from "./permission.model";
import { Preference } from "./preference.model";

class Student {
    id: number;
    username: string;
    modul: Modul;
    semestar: number;
    email: string;
    token: string | null;
    perm: Privilegije;
    preference: Preference[];
    bio: string;
    ProfilePhotoURL: string;

    constructor(id: number, username: string, modul: Modul, semestar: number, email: string, perm?: Privilegije,  bio: string = "",ProfilePhotoURL: string ="", preference?: Preference[]){
        this.id = id;
        this.username = username;
        this.modul = modul;
        this.semestar = semestar;
        this.email = email;
        this.token = null;
        this.perm = perm ?? Privilegije.STUDENT;
        this.bio = bio;
        this.ProfilePhotoURL = ProfilePhotoURL; 
         this.preference = preference || [];
 
    }
}

export { Student }