import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Predmet } from '../models/predmet.model';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { Modul } from '../models/modul.model';

@Injectable({
  providedIn: 'root'
})
export class PredmetiService {

  constructor(private http: HttpClient) { }

  async getAll(): Promise<Predmet[] | null> {
    let predmeti$ = this.http.get<Predmet[]>(`${environment.backend}/predmeti`);
    let predmeti = await firstValueFrom(predmeti$);
    return predmeti;
  }

  async getByModule(module: string): Promise<Predmet[]> {
    let predmeti$ = this.http.get<Predmet[]>(`${environment.backend}/predmeti/${module}`);
    let predmeti = await firstValueFrom(predmeti$);
    return predmeti;
  }
}
