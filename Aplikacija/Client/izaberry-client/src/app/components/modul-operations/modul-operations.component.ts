import { Component } from '@angular/core';
import { Modul } from 'src/app/models/modul.model';
import { ModuleService } from 'src/app/services/module.service';

@Component({
  selector: 'app-modul-operations',
  templateUrl: './modul-operations.component.html',
  styleUrls: ['./modul-operations.component.scss']
})
export class ModulOperationsComponent {
  moduli: Modul[] | null = null;
  currentModule: Modul = new Modul(0, "");

  constructor(private modulService: ModuleService){}

  modulKeyUp(event: Event) {
    this.currentModule.naziv = (event.target as HTMLInputElement).value;
  }

  idKeyUp(event: Event) {
    this.currentModule.id = parseInt((event.target as HTMLInputElement).value);
  }

  async createModule() {
    await this.modulService.createModule(this.currentModule);
  }

  //TODO: brisanje ne radi
  async deleteModule() {
    await this.modulService.deleteModule(this.currentModule);
  }

  async getModules() {
    this.moduli = await this.modulService.getModules();
  }

  async cleanModules() {
    this.moduli = null;
  }
}
