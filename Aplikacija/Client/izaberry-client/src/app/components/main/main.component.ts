import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  userId: number;
  constructor(private router: Router, private authService: AuthService){
    this.userId = this.authService.currentUserId();
  }
  redirectToLogin() {
    this.router.navigateByUrl("login");
  }
  redirectToOglasna() {
    this.router.navigateByUrl("oglasna");
  }
  redirectToProfil() {
    this.router.navigate(["profile", this.userId]);
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
