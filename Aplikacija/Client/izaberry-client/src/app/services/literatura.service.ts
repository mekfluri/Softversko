import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tag } from '../models/tag.model';
import { environment } from 'src/environments/environment';
import { first, firstValueFrom } from 'rxjs';
import { Komentar } from '../models/komentar.model';
import { Student } from '../models/student.model';
import { Literatura } from '../models/literatura.model';
import { Zahtev } from '../models/zahtev.model';
@Injectable({
  providedIn: 'root'
})
export class LiteraturaService {

  constructor(private http:HttpClient) { }

  async StudentLiteratura(id :number)
  {
    let literatura$ = this.http.get<Literatura[]>(`${environment.backend}/literatura/byStudentLit/${id}`);
    let literatura = await firstValueFrom(literatura$);
    console.log(literatura);
    return literatura;
  }

  async addRequest(predmetId: number, userId: number, file: File) {
    let formData = new FormData();
    formData.append(file.name, file, file.name);
    let resp$ = this.http.post(`${environment.backend}/zahtevi/dodajZahtev/${predmetId}/${userId}`, formData);
    return (await firstValueFrom(resp$));
  }

  async getForMentor(mentorId: number): Promise<Zahtev[]> {
    let resp$ = this.http.get<Zahtev[]>(`${environment.backend}/zahtevi/mentor/${mentorId}`);
    let result = await firstValueFrom(resp$);
    return result;
  }

  async odobriZahtev(zahtevId: number, mentorId: number){
    let resp$ = this.http.post(`${environment.backend}/zahtevi/odobri/${zahtevId}/${mentorId}`, {});
    let result = await firstValueFrom(resp$);
    console.log(result);
    return result;
  }

  async odbijZahtev(zahtevId: number){
    let resp$ = this.http.delete(`${environment.backend}/zahtevi/odbij/${zahtevId}`);
    return (await firstValueFrom(resp$));
  }
  
  async getAll()
  {
    let literatura$ = this.http.get<Literatura[]>(`${environment.backend}/literatura/vratisve`);
    let literatura = await firstValueFrom(literatura$);
    console.log(literatura);
    return literatura;
  }
  
  async deleteLiteratura(id: number)
  {
    let resp$ = this.http.delete(`${environment.backend}/literatura/obrisiLiteraturu/${id}`, {
      responseType: "text"
    });
    return firstValueFrom(resp$);
  }

  async PredmetLiteratura(id: number): Promise<Literatura[]>
  {
    let literature$ = this.http.get<Literatura[]>(`${environment.backend}/literatura/predmet/${id}`);
    let literatura = await firstValueFrom(literature$);
    return literatura;
  }
}
