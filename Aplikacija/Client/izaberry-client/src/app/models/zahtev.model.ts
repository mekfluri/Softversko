import {Literatura} from "./literatura.model";
import { Predmet } from "./predmet.model";
import { Student } from "./student.model";

class Zahtev {
    id: number;
    student: Student;
    predmet: Predmet;
    fileUrl: string;


    constructor(id: number, student: Student, predmet: Predmet, filePath: string) {
        this.id = id;
        this.predmet = predmet;
        this.student = student;
        this.fileUrl = filePath;
    }
}

export { Zahtev }