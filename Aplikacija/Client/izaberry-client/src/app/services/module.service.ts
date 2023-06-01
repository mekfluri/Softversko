import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Modul } from '../models/modul.model';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor(private http: HttpClient) { }

  async getModuleNames(): Promise<string[]> {
    let module$ = this.http.get<Modul[]>(`${environment.backend}/moduli`);
    let moduli = await firstValueFrom(module$);
    return moduli.map((modul: Modul) => modul.naziv);
  }

  async getModules(): Promise<Modul[]> {
    let module$ = this.http.get<Modul[]>(`${environment.backend}/moduli`);
    return firstValueFrom(module$);
  }

  async createModule(module: Modul) {
    let response$ = this.http.post(`${environment.backend}/moduli/${module.naziv}`, {});
    return firstValueFrom(response$);
  }

  async deleteModule(module: Modul) {
    let response$ = this.http.delete(`${environment.backend}/moduli/${module.id}`);
    return firstValueFrom(response$);
  }
}
