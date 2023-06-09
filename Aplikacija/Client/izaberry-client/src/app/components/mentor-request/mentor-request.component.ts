import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MentorRequest } from 'src/app/models/mentor-request.model';
import { AuthService } from 'src/app/services/auth.service';
import { MentorService } from 'src/app/services/mentor.service';

@Component({
  selector: 'app-mentor-request',
  templateUrl: './mentor-request.component.html',
  styleUrls: ['./mentor-request.component.scss']
})
export class MentorRequestComponent {
  predmetId: number = 0;
  userId: number = 0;
  mentorRequest: MentorRequest;

  constructor(private router: Router, private authService: AuthService, private mentorService: MentorService) {
    let state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      this.predmetId = state["predmetId"] as number;
    }
    else {
      let err = new Error();
      err.message = "Invalid predmet!";
      this.router.navigate(["error"], {
        state: err as Error
      });
    }
    let currentUserId = authService.currentUserId();
    if(currentUserId == -1) {
      this.router.navigate(["login"]);
    }
    this.userId = currentUserId;
    this.mentorRequest = new MentorRequest(this.userId, this.predmetId);
  }

  indexPage(ev: Event) {
    this.mentorRequest.firstPage = (ev.target as HTMLInputElement).files![0];
  }

  predmetPage(ev: Event){
    this.mentorRequest.predmetPage = (ev.target as HTMLInputElement).files![0];
  }

  async sendRequest() {
    await this.mentorService.createRequest(this.mentorRequest);
  }
}
