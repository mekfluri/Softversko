import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Literatura } from 'src/app/models/literatura.model';
import { LiteraturaService } from 'src/app/services/literatura.service';
import { PredmetiService } from 'src/app/services/predmeti.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-literatura',
  templateUrl: './literatura.component.html',
  styleUrls: ['./literatura.component.scss']
})
export class LiteraturaComponent implements OnInit {
  predmetId: number = 0;
  literature: Literatura[] = [];
  dokumentDivs: any[] = [];
  slikeDivs: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private predmetiService: PredmetiService,
    private literaturaService: LiteraturaService,
    private auth:AuthService
  ) { }

  async ngOnInit(): Promise<void> {
    const state = this.route.snapshot.paramMap.get('predmetId');
    if (state) {
      this.predmetId = parseInt(state, 10);
    } else {
   
    }
    this.literature = await this.literaturaService.PredmetLiteratura(this.predmetId);
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
    this.router.navigateByUrl('profile/' + this.auth.currentUserId());

  }

  redirectToQuiz() {
    this.router.navigateByUrl('kviz');
  }

  redirectToPredmeti() {
    this.router.navigateByUrl('predmeti');
  }

  redirectToDodaj() {
    this.router.navigateByUrl(`dodajLiteraturu/${this.predmetId}`);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('authToken') !== null;
  }

  isImage(filename: string): boolean {
    const extension = filename.split('.').pop()?.toLowerCase();
    return extension === 'jpg' || extension === 'png';
  }

  isDocument(filename: string): boolean {
    const extension = filename.split('.').pop()?.toLowerCase();
    return extension === 'txt' || extension === 'pdf' || extension === 'doc';
  }
}
