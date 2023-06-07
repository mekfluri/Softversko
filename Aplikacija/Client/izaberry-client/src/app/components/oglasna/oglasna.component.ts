
import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-oglasna',
  templateUrl: './oglasna.component.html',
  styleUrls: ['./oglasna.component.scss']
})
export class OglasnaComponent implements OnInit {
  currentNote: Note | null = null;
  i: number = 0;
  notes: Note[] = [];
  id: number = 0;

  ngOnInit(): void {
    this.retrieveAllNotes();
  }

  constructor(private http: HttpClient, private userService: UserService, private authService: AuthService) {
  }
  async retrieveAllNotes() {
    try {
      const response = await this.http.get<Note[]>('http://localhost:5006/note/vartiSveNotes').toPromise();
      console.log(response);

      if (response) {
        const notesWithStudentPromises = response.map(async note => {
          const { id, text } = note;
          const token = note.student?.token;

          if (token) {
            try {
              const student = await this.userService.getUserByToken(token);
              note.student = student;
            } catch (error) {
              console.error(`Failed to fetch student details for note with ID ${note.id}:`, error);
            }
          }

          return note;
        });

        this.notes = await Promise.all(notesWithStudentPromises);
      }
    } catch (error) {
      console.error(error);
    }
  }





  dragOver(event: Event) {
    console.log("dragOver");
    event.preventDefault();
    (event.target as HTMLElement).classList.add('drag-over');
    (event as DragEvent).dataTransfer!.dropEffect = "move";
  }

  dragEnter(event: Event) {
    console.log("dragEnter");
    event.preventDefault();
    (event.target as HTMLElement).classList.add('drag-over');
  }

  dragLeave(event: Event) {
    console.log("dragLevae");
    event.preventDefault();
    (event.target as HTMLElement).classList.remove('drag-over');
  }

  dragStart(event: Event) {
    console.log("dragStart");
    (event.target as HTMLElement).classList.add("dragging");
  }

  dragEnd(event: Event) {
    console.log("dragEnd");
    (event.target as HTMLElement).classList.remove("dragging");
  }

  drop(event: Event) {
    console.log("drop");
    let eventTarget = event.target as HTMLElement;
    event.preventDefault();

    eventTarget.classList.remove('drag-over');
    var data = (event as DragEvent).dataTransfer!.getData("text/plain");
    var note: HTMLElement | null = document.getElementById(data);
    note!.classList.remove('hide');
    let deleteSticky = document.createElement("button");
    deleteSticky.className = "deleteSticky";
    deleteSticky.innerHTML = "x";
    deleteSticky.onclick = (ev) => this.obrisiStiker();
    note!.appendChild(deleteSticky);

    eventTarget.appendChild(note!);
    setTimeout(() => {
      eventTarget.removeChild(note!);//promeni da se brise posle dva dana ne posle dve sekunde
    }, 50000);
  }

  obrisiStiker() {

  }

  async dodajNote() {
    let newNote: Note = new Note(this.notes.length);
    console.log(newNote);
    this.notes.push(newNote);
    this.currentNote = newNote;
  }

  textAreaInput(event: Event) {

    let target = event.target as HTMLTextAreaElement;
    const noteId = parseInt(target.id);
    this.notes[noteId].text = target.value.trim();
    this.currentNote = this.notes[noteId];
  }

  async saveNote() {
    if (this.currentNote) {
      try {
        const response = await this.userService.addNote(this.currentNote.text);
        console.log(this.currentNote.text);
        console.log(response);

        if (response?.id) {
          this.currentNote.id = response.id;
          console.log(this.currentNote.id);
        }

        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  }

  async deleteNote(currentNote: Note) {
    console.log("TU");
    console.log(currentNote);
    if (currentNote) {
      const index = this.notes.findIndex(note => note.id === currentNote.id);
      if (index !== -1) {
        this.notes.splice(index, 1);

        try {
          const response = await this.http.delete(`http://localhost:5006/note/obrisiNotes/${currentNote.id}`).toPromise();
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      }
      this.currentNote = null;
    }
  }
  getCurrentUserId(): number | undefined {
    console.log(this.userService.user?.id);
    return this.userService.user?.id;
  }


}
