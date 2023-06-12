import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preference } from 'src/app/models/preference.model';
import { QuizResponse } from 'src/app/models/quiz-response.model';
import { Student } from 'src/app/models/student.model';
import { Tag } from 'src/app/models/tag.model';
import { AuthService } from 'src/app/services/auth.service';
import { QuizService } from 'src/app/services/quiz.service';
import { TagService } from 'src/app/services/tag.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  user: Student | null = null;
  recommendations: QuizResponse[] | null = null;
  isLoggedIn: boolean = false;
  tagovi: Tag[] | null = null;
  preference: Preference[] | null = null;

  constructor(private authService: AuthService, private quizService: QuizService, private router: Router, private tagService: TagService) {
    this.isLoggedIn = this.authService.currentUserId() != -1;
  }
  async ngOnInit(): Promise<void> {
    this.tagovi = await this.tagService.getAllTags();
  }

  async doQuiz() {
    if (this.authService.currentUserId() != -1) {
      this.recommendations = (await this.quizService.getRecommendationsForUser());
    }
    else if (this.preference != null) {
      this.recommendations = (await this.quizService.getRecommendations(this.preference));
    }
  }

  gotoPredmet(ev: Event) {
    let predmetId = parseInt((ev.target as HTMLDivElement).id);
    this.router.navigate(["predmet"], {
      state: { predmetId }
    });
  }

  addPreference() {
    if (this.preference == null) {
      this.preference = new Array<Preference>();
    }
    this.preference.push(new Preference());
  }

  saveNewPreferences() {
  }

}