import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PredmetiService } from 'src/app/services/predmeti.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { LiteraturaService } from 'src/app/services/literatura.service';


@Component({
  selector: 'app-dodaj-literaturu',
  templateUrl: './dodaj-literaturu.component.html',
  styleUrls: ['./dodaj-literaturu.component.scss']
})
export class DodajLiteraturuComponent implements OnInit {
  predmetId: number = 0;
  userId: number = 0;
  literatura: any[] = [];
  dokumentDivs: any[] = [];
  slikeDivs: any[] = [];
  file: File | null = null;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private predmetiService: PredmetiService,
    private userService: UserService,
    private elementRef: ElementRef,
    private AuthService: AuthService,
    private literaturaService: LiteraturaService,
  ) { }
  async ngOnInit(): Promise<void> {
    if (this.userService.user == null) {
      const token = localStorage.getItem("authToken");
      this.userService.getUserByToken(token!);


    }
    console.log(this.userService.user);
    const state = this.route.snapshot.paramMap.get('predmetId');
    if (state) {
      this.predmetId = parseInt(state, 10);
      console.log(this.predmetId);

    } else {

    }
  }

  fileChange(event: Event) {
    let target = event.target as HTMLInputElement;
    this.file = target.files![0];
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
    this.router.navigate(["profile", this.userService.user!.id]);
  }
  redirectToQuiz() {
    this.router.navigateByUrl('kviz');
  }
  redirectToPredmeti() {
    this.router.navigateByUrl('predmeti');
  }
  async redirectToZahtevi() {
    await this.literaturaService.addRequest(this.predmetId, this.userService.user?.id!, this.file!);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('authToken') !== null;
  }
}
