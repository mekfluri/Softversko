import { Student } from "./student.model";
import { Chat } from "./chat.model";

class Poruka {
  id: number;
  student: Student;
  chat: Chat;
  text: string;
  procitana: boolean;

  constructor(id: number, student: Student, chat: Chat, text: string, procitana: boolean) {
    this.id = id;
    this.student = student;
    this.chat = chat;
    this.text = text;
    this.procitana = procitana;
  }
}

export { Poruka };
