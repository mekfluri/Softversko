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
}
