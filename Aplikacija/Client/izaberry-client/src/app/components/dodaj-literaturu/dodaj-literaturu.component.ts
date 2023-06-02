import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PredmetiService } from 'src/app/services/predmeti.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dodaj-literaturu',
  templateUrl: './dodaj-literaturu.component.html',
  styleUrls: ['./dodaj-literaturu.component.scss']
})
export class DodajLiteraturuComponent implements OnInit {
  predmetId: number = 0;
  literatura: any[] = [];
  dokumentDivs: any[] = [];
  slikeDivs: any[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private predmetiService: PredmetiService
  ) { }
  ngOnInit(): void {
    const state = this.route.snapshot.paramMap.get('predmetId');
    if (state) {
      this.predmetId = parseInt(state, 10);
      console.log(this.predmetId);
      
    } else {
   
    }
  }
  redirectToLogin() {
    this.router.navigateByUrl('login');
  }
  redirectToOglasna() {
    this.router.navigateByUrl('oglasna');
  }
  redirectToHome() {
    this.router.navigateByUrl('');
  }
  redirectToProfil() {
    this.router.navigateByUrl('profile');
  }
  redirectToQuiz() {
    this.router.navigateByUrl('kviz');
  }
  redirectToPredmeti() {
    this.router.navigateByUrl('predmeti');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('authToken') !== null;
  }
}
