import { Predmet } from "./predmet.model";
import { Student } from "./student.model";

class MentorRequestPreview {
    id: number;
    student: Student | null;
    predmet: Predmet | null;
    indeksPhoto: string;
    predmetPhoto: string;
    constructor(id?: number, student?: Student, predmet?: Predmet, firstPhoto?: string, secondPhoto?: string) {
        this.id = id || 0;
        this.student = student || null;
        this.predmet = predmet || null;
        this.indeksPhoto = firstPhoto || "";
        this.predmetPhoto = secondPhoto || "";
    }
}

export { MentorRequestPreview }