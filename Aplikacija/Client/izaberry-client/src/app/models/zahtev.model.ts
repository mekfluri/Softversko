import {Literatura} from "./literatura.model";
import { Student } from "./student.model";

class Zahtev {
    id: number;
    student: Student;
    predmet: Literatura;


    constructor(id: number, student: Student, predmet: Literatura) {
        this.id = id;
        this.predmet = predmet;
        this.student = student;
    }
}

export { Zahtev }