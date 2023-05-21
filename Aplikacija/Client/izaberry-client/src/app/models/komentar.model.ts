import { Predmet } from "./predmet.model";
import { Student } from "./student.model";

class Komentar {
    id: number;
    student: Student;
    predmet: Predmet;
    text: string;

    constructor(id: number, student: Student, predmet: Predmet, text: string) {
        this.id = id;
        this.predmet = predmet;
        this.text = text;
        this.student = student;
    }
}

export { Komentar }