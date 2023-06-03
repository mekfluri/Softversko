import { Predmet } from "./predmet.model";
import { Student } from "./student.model";
import { Modul } from "./modul.model";
import { Privilegije } from "./permission.model";

class Mentor extends Student{

     predmeti: Predmet[];

    constructor(id: number, username: string, modul: Modul, semestar: number, email: string, perm?: Privilegije,   bio: string = "") {
        super(id,username,modul, semestar, email, perm, bio);
          
           this.predmeti = [];    
    }


    
}
 
export { Mentor }