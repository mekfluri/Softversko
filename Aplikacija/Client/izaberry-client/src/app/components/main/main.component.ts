import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  constructor(private router: Router){}
  redirectToLogin() {
    this.router.navigateByUrl("login");
  }
  redirectToOglasna() {
    this.router.navigateByUrl("oglasna");
  }
  redirectToProfil() {
    this.router.navigateByUrl("profile");
  }
  redirectToQuiz()
  {
    this.router.navigateByUrl("kviz");
  }
  redirectToPredmeti() {
    this.router.navigateByUrl("predmeti");
  }
  isLoggedIn(): boolean {
    return localStorage.getItem("authToken") !== null;
  }
  
}
