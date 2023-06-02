import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { C } from '@fullcalendar/core/internal-common';
import { PredmetiService } from 'src/app/services/predmeti.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-zahtevi',
  templateUrl: './zahtevi.component.html',
  styleUrls: ['./zahtevi.component.scss']
})
export class ZahteviComponent implements OnInit, AfterViewInit {
  zahtevi: any[] = []; // Array to store the fetched data

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private predmetiService: PredmetiService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.fetchZahtevi();
  }

  ngAfterViewInit() {
    
  }

  async fetchZahtevi(): Promise<void> {
    console.log("usosam");
    try {
      const response = await this.predmetiService.vratiZahteve();
      if (response !== null) {
        this.zahtevi = response;
        console.log(this.zahtevi);
        this.kreirajDiv(this.zahtevi);
      } else {
        console.error('Error fetching zahtevi: Response is null');
      }
    } catch (error) {
      console.error('Error fetching zahtevi:', error);
    }
  }
  
  

  kreirajDiv(zahtevi: any[]) {
    const divContainer = document.getElementById('zahtevi');
  
    zahtevi.forEach(zahtev => {
      const divElement = document.createElement('div');
      divContainer?.appendChild(divElement);
   
   
    });
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
