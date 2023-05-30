import { Component, OnInit } from '@angular/core';
import { Modul } from 'src/app/models/modul.model';
import { Predmet } from 'src/app/models/predmet.model';
import { Tag } from 'src/app/models/tag.model';
import { ModuleService } from 'src/app/services/module.service';
import { PredmetiService } from 'src/app/services/predmeti.service';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-predmet-operations',
  templateUrl: './predmet-operations.component.html',
  styleUrls: ['./predmet-operations.component.scss']
})
export class PredmetOperationsComponent implements OnInit{
  predmet: Predmet;
  tagovi: Tag[] | null = null;
  moduli: string[] | null = null;
  semestri: Array<number> = Array(8).fill(0).map((val, idx) => idx+ 1);

  constructor(private predmetService: PredmetiService, private tagService: TagService, private modulService: ModuleService){
    this.predmet = new Predmet();
  }

  async ngOnInit(): Promise<void> {
    this.tagovi = await this.tagService.getAllTags();
    this.moduli = await this.modulService.getModuleNames();
  }

  nazivKeyUp(event: Event){
    this.predmet.naziv = (event.target as HTMLInputElement).value;
  }

  opisKeyUp(event: Event){
    this.predmet.opis = (event.target as HTMLInputElement).value;
  }

  espbKeyUp(event: Event){
    this.predmet.espb = parseInt((event.target as HTMLInputElement).value);
  }

  modulChange(event: Event){
    let target = (event.target as HTMLSelectElement);
    this.predmet.modul.naziv = target.options[target.selectedIndex].value;
  }

  semestarChange(event: Event){
    let target = (event.target as HTMLSelectElement);
    this.predmet.semestar = parseInt(target.options[target.selectedIndex].value);
  }

  tagChange(event: Event){
    let target = (event.target as HTMLSelectElement);
    this.predmet.tagovi.push(new Tag(0, target.options[target.selectedIndex].value));
  }

  async dodajPredmet(){
    await this.predmetService.create(this.predmet);
  }
}
