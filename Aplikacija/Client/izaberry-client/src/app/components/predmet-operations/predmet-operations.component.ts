import { Component, OnInit } from '@angular/core';
import { Modul } from 'src/app/models/modul.model';
import { Predmet, PredmetDto } from 'src/app/models/predmet.model';
import { MessageResponse } from 'src/app/models/response.model';
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

  predmeti: Predmet[] | null = null;
  predmet: Predmet;
  selectedPredmet: Predmet | undefined = undefined;
  predmetToChange: Predmet | null;
  showPredmeti: boolean = false;
  otvori: boolean = false;
  otvoriazuriranje: boolean = false;

  tagovi: Tag[] | null = null;
  moduli: string[] | null = null;
  semestri: Array<number> = Array(8).fill(0).map((val, idx) => idx+ 1);
  response: MessageResponse = new MessageResponse();

  constructor(private predmetService: PredmetiService, private tagService: TagService, private modulService: ModuleService){
    this.predmet = new Predmet();
    this.predmetToChange = null;
  }

  async ngOnInit(): Promise<void> {
    this.tagovi = await this.tagService.getAllTags();
    this.moduli = await this.modulService.getModuleNames();
    this.predmeti = await this.predmetService.getAll();
  }

  async getPredmeti() {
    this.predmeti = await this.predmetService.getAll();
    this.selectedPredmet = this.predmeti![0];
    this.showPredmeti = true;
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
    this.predmet.tagovi = [...Array.from(target.selectedOptions).map(t => new Tag(0, t.value))];
  }

  idChange(event: Event){ 
    let sId = (event.target as HTMLInputElement).value;
    try {
      const id = parseInt(sId);
      this.predmetToChange = this.predmeti?.find(p => p.id == id)!;
       this.predmet = this.predmeti?.find(p => p.id == id)!;
    }
    catch(err: any) {
      console.error(err);
    }
  }

  async dodajPredmet(){
    try {
      await this.predmetService.create(this.predmet as PredmetDto);
      this.response.message = "Uspesno dodat predmet!";
      this.response.showResponse();
    }
    catch(err: any){
      this.response.isError = true;
      this.response.message = "Neuspesno dodat predmet!";
      this.response.showResponse();
    }
  }

  cleanPredmeti() {
    this.showPredmeti = false;
  }

  predmetChange(event: Event) {
    let target = event.target as HTMLSelectElement;
    let naziv = target.options[target.selectedIndex].value;
    this.selectedPredmet = this.predmeti?.find(p => p.naziv == naziv);
  }

  deletionKeyUp(event: Event) {
    this.predmet.id = parseInt((event.target as HTMLInputElement).value);
  }
  async deletePredmet() {
    try {
      await this.predmetService.delete(this.predmet.id);
      this.response.message = "Uspesno obrisan predmet";
      this.response.showResponse();
    }
    catch(err: any){
      this.response.isError = true;
      this.response.message = "Uspesno obrisan predmet";
      this.response.showResponse();
    }
  }

  async updatePredmet(){
    this.otvoriazuriranje = true;
    let response = await this.predmetService.updatePredmet(this.predmet.id, this.predmet.naziv, this.predmet.modul.naziv, this.predmet.semestar, this.predmet.espb, this.predmet.opis);
  }

  async otvoriDiv(){
     this.otvori = true;
  }
  async zatvori(){
    this.otvori = false;
  }
  async close(){
    this.predmetToChange = null;
  }
}
