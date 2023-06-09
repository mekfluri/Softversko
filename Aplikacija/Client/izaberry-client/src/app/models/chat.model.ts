import { Student } from "./student.model";
import { Poruka } from "./poruke.model";

class Chat {
  id: number;
  studentPrimaoc: Student;
  studentPosiljaoc: Student;
  poruke: Poruka[];

  constructor(id: number, studentPrimaoc: Student, studentPosiljaoc: Student, poruke: Poruka[]) {
    this.id = id;
    this.studentPrimaoc = studentPrimaoc;
    this.studentPosiljaoc = studentPosiljaoc;
    this.poruke = poruke;
  }
}

export { Chat };
