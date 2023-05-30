import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Predmet } from '../models/predmet.model';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { Modul } from '../models/modul.model';
import { Komentar } from '../models/komentar.model';

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
    let predmeti$ = this.http.get<Predmet[]>(`${environment.backend}/predmeti/poModulu/${module}`);
    let predmeti = await firstValueFrom(predmeti$);
    return predmeti;
  }

  async getById(id: number): Promise<Predmet> {
    let predmet$ = this.http.get<Predmet>(`${environment.backend}/predmeti/vrati/${id}`);
    return await firstValueFrom(predmet$);
  }

  async addComment(userId: number, predmetId: number, text: string){
    let komentarRequest = {
      studentId: userId,
      predmetId,
      text
    };
    let resp$ = this.http.post<Komentar>(`${environment.backend}/komentar/DodajKomentar`, komentarRequest);
    let resp = await firstValueFrom(resp$);
    return resp;
  }

  async create(predmet: Predmet){
    /*
    let resp$ = this.http.post(`${environment.backend}/predmeti`, predmet);
    let resp = await firstValueFrom(resp$);
    */
   console.log(predmet);
  }
}
