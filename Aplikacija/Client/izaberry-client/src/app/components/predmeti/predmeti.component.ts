import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Modul } from 'src/app/models/modul.model';
import { Predmet } from 'src/app/models/predmet.model';
import { Tag } from 'src/app/models/tag.model';
import { PredmetiService } from 'src/app/services/predmeti.service';
import { TagService } from 'src/app/services/tag.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-predmeti',
  templateUrl: './predmeti.component.html',
  styleUrls: ['./predmeti.component.scss']
})
export class PredmetiComponent implements OnInit{
  predmeti: Predmet[] | null = null;
  moduli: string[] | null = null;
  tagovi: Tag[] | null = null;

  constructor(private http: HttpClient, private predmetiService: PredmetiService,
     private router: Router, private tagService: TagService) {}

  private async fetchModules(): Promise<string[]> {
    let module$ = this.http.get<Modul[]>(`${environment.backend}/moduli`);
    let moduli = await firstValueFrom(module$);
    return moduli.map((modul: Modul) => modul.naziv);
  }
  async ngOnInit() {
    this.moduli = await this.fetchModules();
    this.tagovi = await this.tagService.getAllTags();
  }

  async modulClick(event: Event) {
    let modul = (event.target as HTMLDivElement).innerText;
    this.predmeti = await this.predmetiService.getByModule(modul);
  }

  predmetClick(event: Event){
    let predmetId = parseInt((event.target as HTMLDivElement).id);
    this.router.navigate(["/predmet"], {
      state: {
        predmetId
      }
    });
  }
}
