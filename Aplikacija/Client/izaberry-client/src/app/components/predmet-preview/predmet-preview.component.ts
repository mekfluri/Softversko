import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Komentar } from 'src/app/models/komentar.model';
import { Ocena } from 'src/app/models/ocena.model';
import { Predmet } from 'src/app/models/predmet.model';
import { Student } from 'src/app/models/student.model';
import { LoadingService } from 'src/app/services/loading.service';
import { PredmetiService } from 'src/app/services/predmeti.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-predmet-preview',
  templateUrl: './predmet-preview.component.html',
  styleUrls: ['./predmet-preview.component.scss']
})
export class PredmetPreviewComponent implements OnInit {

  predmet: Predmet | null = null;
  isLoggedIn: string | null = null;
  commentBox: string = "";
  ocena: Ocena = new Ocena();
  overallOcena: number = 0;
  private predmetId: number = 0;

  constructor(private router: Router, private predmetiService: PredmetiService, public userService: UserService,
    public loadingService: LoadingService) {
    this.predmetId = (this.router.getCurrentNavigation()?.extras.state as any).predmetId;
    this.isLoggedIn = localStorage.getItem("authToken");
    if(this.isLoggedIn) {
      this.userService.getUserByToken(this.isLoggedIn);
    }
  }

  async addOcena() {
    let ocena = await this.predmetiService.addOcena(this.predmetId, new Ocena(
      0,
      this.ocena.dostupnostMaterijala,
      this.ocena.angazovanjeProfesora,
      this.ocena.laboratorijskeVezbe,
      this.ocena.tezinaPredmeta,
      this.ocena.prakticnoZnanje));
    if(this.predmet?.ocene == null) {
      this.predmet!.ocene = new Array<Ocena>();
    }
    this.predmet?.ocene.push(ocena);
  }

  async ngOnInit(): Promise<void> {
    this.predmet = await this.predmetiService.getById(this.predmetId);
  }

  komentarKeyUp(event: Event){
    this.commentBox = (event.target as HTMLInputElement).value;
  }

  viewProfile(event: Event){
    let profileId = parseInt((event.target as HTMLSpanElement).id);
    this.router.navigate(["profile", profileId]);
  }
  async dodajKomentar() {
    let komentar = await this.predmetiService.addComment(this.userService.user!.id, this.predmetId, this.commentBox);
    this.predmet?.komentari.push(new Komentar(komentar.id, this.userService.user!, this.predmet, this.commentBox));
  }

  gotoOglasna() {
    this.router.navigate(["/oglasna"]);
  }
  gotoLiteratura() {
  
    const p = this.predmetId;
  
    this.router.navigate(['/literatura', p], { state: { predmetId: this.predmetId } });
  }
  
  gotoMentorRequest() {
    this.router.navigate(["mentor-request"], {
      state: {
        predmetId: this.predmet?.id
      }
    });
  }

}
