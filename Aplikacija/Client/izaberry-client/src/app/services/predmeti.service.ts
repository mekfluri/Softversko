import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Predmet, PredmetDto } from '../models/predmet.model';
import { Zahtev } from '../models/zahtev.model';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { Modul } from '../models/modul.model';
import { Komentar } from '../models/komentar.model';
import { Literatura } from '../models/literatura.model';
import { Ocena } from '../models/ocena.model';

type NoIDOcena = Omit<Ocena, "id">;


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
  async dodajLiteraturu(filePath: string, studentID: number, predmetID: number): Promise<any> {
    const response$ = this.http.post<any>(
      `${environment.backend}/literatura/dodajLiteraturu/${studentID}/${predmetID}?filePath=${filePath}`,
      {}
    );

    const response = await firstValueFrom(response$);
    return response;
  }
  async dodajZahtev(literaturaID: number): Promise<any> {
    try {
      const response = await this.http.post<any>(
        `${environment.backend}/zahtevi/dodajZahtev/${literaturaID}`,
        {}
      ).toPromise();

      if (response.ok) {
        return response.body;
      } else {
        console.error('Error while adding zahtev:', response.error);
        throw new Error(response.error);
      }
    } catch (error) {
      console.error('Error while adding zahtev:', error);
      throw error;
    }
  }
  async vratiPoslednjuLiteraturu(): Promise<Literatura | null> {
    let zahtevi$ = this.http.get<any>(`${environment.backend}/literatura/vratiPoslednjuDodatu`);
    let zahtevi = await firstValueFrom(zahtevi$);
    if (zahtevi) {
      return new Literatura(
        zahtevi.Id,
        zahtevi.mentor,
        zahtevi.student,
        zahtevi.predmet,
        zahtevi.filePath
      );
    } else {
      return null;
    }
  }


  async vratiZahteve(): Promise<Zahtev[] | null> {
    let zahtevi$ = this.http.get<any[]>(`${environment.backend}/zahtevi/vratiZahteve`);
    let zahtevi = await firstValueFrom(zahtevi$);
    return zahtevi;
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

  async addComment(userId: number, predmetId: number, text: string) {
    let komentarRequest = {
      studentId: userId,
      predmetId,
      text
    };
    let resp$ = this.http.post<Komentar>(`${environment.backend}/komentar/DodajKomentar`, komentarRequest);
    let resp = await firstValueFrom(resp$);
    return resp;
  }

  async addOcena(predmetId: number, ocena: Partial<Ocena>) {
    let ocena$ = this.http.put(`${environment.backend}/predmeti/dodajOcenu/${predmetId}`, ocena);
    return firstValueFrom(ocena$);
  }

  async create(predmet: PredmetDto) {
    console.log(predmet);
    let resp$ = this.http.post(`${environment.backend}/predmeti/dodajPredmet`, predmet, {
      responseType: "text"
    });
    let resp = await firstValueFrom(resp$);
    console.log(resp);
  }

  async delete(predmetId: number) {
    let resp$ = this.http.delete(`${environment.backend}/predmeti/obrisi/${predmetId}`, {
      responseType: "text"
    });
    return firstValueFrom(resp$);
  }

  async vratiLiteraturuPredmeta(idpredmeta: number): Promise<any[]> {
    let literature$ = this.http.get<any[]>(`${environment.backend}/literatura/vartiLiteraturuPredmeta/${idpredmeta}`);
    return await firstValueFrom(literature$);
  }

  async updatePredmet(id: number, naziv: string, nazivModula: string, semestar: number, espb: number, opis: string) {
    let resp$ = this.http.put(`${environment.backend}/predmeti/azurirajPredmetOperations/${id}/${naziv}/${nazivModula}/${semestar}/${espb}/${opis}`, {
      responseType: "text"
    });
    return firstValueFrom(resp$);
  }

}
