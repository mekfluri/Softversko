import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MentorRequestPreview } from 'src/app/models/mentor-req-backend.model';
import { Mentor } from 'src/app/models/mentor.model';
import { MessageResponse } from 'src/app/models/response.model';
import { MentorService } from 'src/app/services/mentor.service';

@Component({
  selector: 'app-mentor-operations',
  templateUrl: './mentor-operations.component.html',
  styleUrls: ['./mentor-operations.component.scss']
})
export class MentorOperationsComponent implements OnInit{
  mentorId: number = 0;
  zahtevi: MentorRequestPreview[] | null = null;
  mentori: Mentor[] | null = null;
  response: MessageResponse = new MessageResponse();
  constructor(private mentorService: MentorService, private router: Router){}

  async ngOnInit(): Promise<void> {
    this.zahtevi = await this.mentorService.getRequests();
    console.log(this.zahtevi);
  }

  async sviMentori() {
    this.mentori = await this.mentorService.getAll();
  }

  async showAll() {
    await this.sviMentori();
  }

  clearAll() {
    this.mentori = null;
  }

  async obrisiMentora() {
    if(this.mentorId == 0) return;
    await this.mentorService.removeMentor(this.mentorId);

  }

  private removeZahtev(id: number) {
    let zahtev = this.zahtevi?.find(zahtev => zahtev.id == id);
    let idx = this.zahtevi?.indexOf(zahtev!);
    this.zahtevi?.splice(idx!, 1);
  }

  studentProfile(ev: Event){ 
    this.router.navigate(["profile", (ev.target as HTMLParagraphElement).id]);
  }

  async odobriMentorstvo(ev: Event) {
    try {
      let zahtevId = parseInt((ev.target as HTMLButtonElement).id);
      let mentor = await this.mentorService.acceptRequest(zahtevId);
      let zahtev = this.zahtevi?.find(zahtev => zahtev.id == zahtevId);
      this.mentorService.addMentorPredmet(mentor.id, zahtev?.predmet!.id!);
      this.response.message = "Uspesno odobreno mentorstvo!";
      this.response.showResponse();
      this.removeZahtev(zahtevId);
    }
    catch(err: any){
      this.response.isError = true;
      this.response.message = "Neuspesno odobrenje mentrostva!";
      this.response.showResponse();
    }
  }

  async odbijMentorstvo(ev: Event) {
    try {
      let zahtevId = parseInt((ev.target as HTMLButtonElement).id);
      await this.mentorService.deleteRequest(zahtevId);
      this.response.message = "Uspesno odbijeno mentorstvo!";
      this.response.showResponse();
      this.removeZahtev(zahtevId);
    }
    catch(err: any){
      this.response.isError = true;
      this.response.message = "Neuspesno odbijeno mentorstvo!";
      this.response.showResponse();
    }
  }
}
