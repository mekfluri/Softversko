import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MentorRequestPreview } from 'src/app/models/mentor-req-backend.model';
import { MentorService } from 'src/app/services/mentor.service';

@Component({
  selector: 'app-mentor-operations',
  templateUrl: './mentor-operations.component.html',
  styleUrls: ['./mentor-operations.component.scss']
})
export class MentorOperationsComponent implements OnInit{
  zahtevi: MentorRequestPreview[] | null = null;
  constructor(private mentorService: MentorService, private router: Router){}

  async ngOnInit(): Promise<void> {
    this.zahtevi = await this.mentorService.getRequests();
    console.log(this.zahtevi);
  }

  studentProfile(ev: Event){ 
    this.router.navigate(["profile", (ev.target as HTMLParagraphElement).id]);
  }

  async odobriMentorstvo(ev: Event) {
    await this.mentorService.acceptRequest(parseInt((ev.target as HTMLButtonElement).id));
  }

  async odbijMentorstvo(ev: Event) {
    await this.mentorService.deleteRequest(parseInt((ev.target as HTMLButtonElement).id));
  }
}
