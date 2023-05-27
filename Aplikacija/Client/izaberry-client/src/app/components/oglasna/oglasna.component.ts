import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-oglasna',
  templateUrl: './oglasna.component.html',
  styleUrls: ['./oglasna.component.scss']
})
export class OglasnaComponent {
  i: number = 0;
  notes: Note[] = new Array<Note>;

  constructor(private http: HttpClient, private userService: UserService) {
    this.notes.push(new Note(undefined, undefined, undefined, "note iz fejk baze broj 1"));
    this.notes.push(new Note(undefined, undefined, undefined, "note iz fejk baze broj 2"));
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

  dodajNote() {
    let newNote: Note = new Note(this.notes.length);
    this.notes.push(newNote);
  }

  textAreaInput(event: Event){
    let target = event.target as HTMLTextAreaElement;
    this.notes[parseInt(target.id)].text = target.value;
  }
}
