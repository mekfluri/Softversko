import { Student } from "./student.model";
import { Mentor } from "./mentor.model";

class Literatura{
    id: number;
    student: Student;
    mentor: Mentor;
    filepath: string;

    constructor(id: number,student: Student, mentor:Mentor, file: string)
    {
        this.id = id;
        this.student = student;
        this.mentor = mentor;
        this.filepath = file;
    }

}

 export { Literatura }
