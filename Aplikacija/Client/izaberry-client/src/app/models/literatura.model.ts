import { Mentor } from "./mentor.model";
import {Predmet} from "./predmet.model";
import { Student } from "./student.model";

class Literatura{
    id: number;
    student: Student;
    predmet: Predmet;
    filePath: string;
    mentor: Mentor;


    constructor(id: number, mentor:Mentor, student: Student, predmet: Predmet,filePath: string) {
        this.id = id;
        this.predmet = predmet;
        
        this.mentor= mentor;
        this.student = student;
        this.filePath=filePath;

    }
}
export{Literatura}