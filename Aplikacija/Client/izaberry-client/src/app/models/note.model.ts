import { Predmet } from "./predmet.model";
import { Student } from "./student.model";

class Note {
    id: number;
    student: Student | null;
    predmet: Predmet | null;
    text: string;
    doneVisible: boolean;

    constructor(id?: number, student?: Student, predmet?: Predmet, text?: string){
        this.id = id || 0;
        this.student = student || null;
        this.predmet = predmet || null;
        this.text = text || "";
        this.doneVisible = false;
    }
}

export { Note }