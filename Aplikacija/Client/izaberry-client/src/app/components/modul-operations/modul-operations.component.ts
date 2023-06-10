import { Component } from '@angular/core';
import { Modul } from 'src/app/models/modul.model';
import { MessageResponse } from 'src/app/models/response.model';
import { ModuleService } from 'src/app/services/module.service';

@Component({
  selector: 'app-modul-operations',
  templateUrl: './modul-operations.component.html',
  styleUrls: ['./modul-operations.component.scss']
})
export class ModulOperationsComponent {
  moduli: Modul[] | null = null;
  currentModule: Modul = new Modul(0, "");
  response: MessageResponse = new MessageResponse();

  constructor(private modulService: ModuleService){}

  modulKeyUp(event: Event) {
    this.currentModule.naziv = (event.target as HTMLInputElement).value;
  }

  idKeyUp(event: Event) {
    this.currentModule.id = parseInt((event.target as HTMLInputElement).value);
  }

  async createModule() {
    try {
      await this.modulService.createModule(this.currentModule);
      this.response.message = "Uspesno dodat modul";
      this.response.showResponse();
    }
    catch(err: any){
      this.response.isError = true;
      this.response.message = "Neuspesno dodavanje modula";
      this.response.showResponse();
    }
  }

  //TODO: brisanje ne radi
  async deleteModule() {
    try {
      await this.modulService.deleteModule(this.currentModule);
      this.response.message = "Uspesno brisanje modula";
      this.response.showResponse();
    }
    catch(err: any){
      this.response.isError = true;
      this.response.message = "Neuspesno brisanje modula";
      this.response.showResponse();
    }
  }

  async getModules() {
    this.moduli = await this.modulService.getModules();
  }

  async cleanModules() {
    this.moduli = null;
  }
}
