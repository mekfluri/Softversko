import {Predmet} from "./predmet.model";
import { Student } from "./student.model";

class Literatura{
    id: number;
    student: Student;
    predmet: Predmet;
    filePath: string;


    constructor(id: number, student: Student, predmet: Predmet,filePath: string) {
        this.id = id;
        this.predmet = predmet;

        this.student = student;
        this.filePath=filePath;
    }
}
export{Literatura}