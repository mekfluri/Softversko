import { Component, OnInit } from '@angular/core';
import { PredmetiService } from 'src/app/services/predmeti.service';
import { UserService } from 'src/app/services/user.service';
import { Privilegije } from 'src/app/models/permission.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Zahtev } from 'src/app/models/zahtev.model';
import { LiteraturaService } from 'src/app/services/literatura.service';

@Component({
  selector: 'app-zahtevi',
  templateUrl: './zahtevi.component.html',
  styleUrls: ['./zahtevi.component.scss']
})
export class ZahteviComponent implements OnInit {
  zahtevi: Zahtev[] = []; 

  constructor(
    private predmetiService: PredmetiService,
    private userService: UserService,
    private http: HttpClient,
    private router: Router,
    private authService:AuthService,
    private literaturaService: LiteraturaService
  ) { 
    if(!this.authService.isMentor()) {
      let err = new Error();
      err.message = "Nemate privilegije da vidite ovu stranicu";
      this.router.navigate(["error"], {
        state: err as Error
      });
    }
  }

  async ngOnInit(): Promise<void> {
    this.zahtevi = await this.literaturaService.getForMentor(this.authService.currentUserId());
    console.log(this.zahtevi);
  }

  async odobriLiteraturu(ev: Event) {
    let zahtevId = parseInt((ev.target as HTMLButtonElement).id);
    await this.literaturaService.odobriZahtev(zahtevId, this.authService.currentUserId());
    this.removeZahtev(zahtevId);
  }

  async odbijLiteraturu(ev: Event){
    let zahtevId = parseInt((ev.target as HTMLButtonElement).id);
    await this.literaturaService.odbijZahtev(parseInt((ev.target as HTMLButtonElement).id));
    this.removeZahtev(zahtevId);
  }

  private removeZahtev(id: number) {
    let zahtev = this.zahtevi?.find(zahtev => zahtev.id == id);
    let idx = this.zahtevi?.indexOf(zahtev!);
    this.zahtevi?.splice(idx!, 1);
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
    this.router.navigate(["profile", this.authService.currentUserId()]);
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
