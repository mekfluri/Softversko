import { Component, OnInit } from '@angular/core';
import { PredmetiService } from 'src/app/services/predmeti.service';
import { UserService } from 'src/app/services/user.service';
import { Privilegije } from 'src/app/models/permission.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-zahtevi',
  templateUrl: './zahtevi.component.html',
  styleUrls: ['./zahtevi.component.scss']
})
export class ZahteviComponent implements OnInit {
  zahtevi: any[] = []; 

  constructor(
    private predmetiService: PredmetiService,
    private userService: UserService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.fetchZahtevi();
  }

  async fetchZahtevi(): Promise<void> {
    console.log("usosam");
    try {
      const response = await this.predmetiService.vratiZahteve();
      if (response !== null) {
        this.zahtevi = response;
        console.log(this.zahtevi);
      } else {
        console.error('Error fetching zahtevi: Response is null');
      }
    } catch (error) {
      console.error('Error fetching zahtevi:', error);
    }
  }

  canShowButtons(): boolean {
    if (this.userService.user) {
      return (
        this.userService.user.perm === Privilegije.ADMIN ||
        this.userService.user.perm === Privilegije.MENTOR
      );
    }
    return false;
  }

  async dodaj(zahtev: any) {
    zahtev.odobreno = true;

    const id = zahtev.id;
    try {
      await this.http.put(`http://localhost:5006/zahtevi/izmeniZahtev/${id}`, zahtev).toPromise();
      console.log('Zahtev uspesno izmenjen');
      this.fetchZahtevi();
    } catch (error) {
      console.error('Greska:', error);
    }
  }

  async odbij(zahtev: any) {
    const id = zahtev.id;
    const literaturaId = zahtev.literatura.id;
    console.log(literaturaId);

    try {
      await this.http.delete(`http://localhost:5006/zahtevi/ObrisiZahteve/${id}`).toPromise();
      await this.http.delete(`http://localhost:5006/literatura/obrisiLiteraturu/${literaturaId}`).toPromise();

      const index = this.zahtevi.indexOf(zahtev);
      if (index !== -1) {
        this.zahtevi.splice(index, 1);
      }
    } catch (error) {
      console.error('Error deleting zahtev or literatura:', error);
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
