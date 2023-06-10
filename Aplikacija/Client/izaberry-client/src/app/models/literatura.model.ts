import { Mentor } from "./mentor.model";
import {Predmet} from "./predmet.model";
import { Student } from "./student.model";

class Literatura{
    id: number;
    student: Student;
    predmet: Predmet;
    filePath: string;
    mentor: Mentor;
    naziv: string;


    constructor(id: number, mentor:Mentor, student: Student, predmet: Predmet,filePath: string, naziv?: string) {
        this.id = id;
        this.predmet = predmet;
        
        this.mentor= mentor;
        this.student = student;
        this.filePath=filePath;
        this.naziv = naziv || "untitled";

    }
}
export{Literatura}