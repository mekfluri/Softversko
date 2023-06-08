class MentorRequest {
    studentId: number;
    predmetId: number;
    firstPage: File | null;
    predmetPage: File | null;

    constructor(studentId?: number, predmetId?: number, firstPage?: File, predmetPage?: File){
        this.studentId = studentId || 0;
        this.predmetId = predmetId || 0;
        this.firstPage = firstPage || null;
        this.predmetPage = predmetPage || null;
    }
}

export { MentorRequest }