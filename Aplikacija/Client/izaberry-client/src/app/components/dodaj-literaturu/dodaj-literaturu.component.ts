import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PredmetiService } from 'src/app/services/predmeti.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';


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
    private predmetiService: PredmetiService,
    private userService: UserService,
    private elementRef: ElementRef,
    private AuthService:AuthService
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
  async redirectToZahtevi() {
    try {
      const literaturaInput = this.elementRef.nativeElement.querySelector('#literatura');
      const filePath = literaturaInput.value;
      console.log(filePath);

      const number = this.AuthService.currentUserId();;
      if (number != null) {
        const literaturaPromise = this.predmetiService.dodajLiteraturu(
          filePath,
          number,
          this.predmetId
        );
        const literaturaResponse = await this.predmetiService.vratiPoslednjuLiteraturu();
        const literaturaID = literaturaResponse?.id;
        console.log(literaturaResponse?.id);
        console.log(literaturaID);
        const zahtevResponse = this.predmetiService.dodajZahtev(literaturaID!);


        if (zahtevResponse !== null) {
          console.log('Zahtev uspesno dodat:', zahtevResponse);
        } else {
          console.error('Nije dodat zahtev: Response is null');
        }
      } else {
        console.error('Nije dodata literatura: Response is null');
      }

    } catch (error) {
      console.error('Error adding literatura/zahtev:', error);
    }

    this.router.navigateByUrl('zahtevi');
  }


  isLoggedIn(): boolean {
    return localStorage.getItem('authToken') !== null;
  }
}
