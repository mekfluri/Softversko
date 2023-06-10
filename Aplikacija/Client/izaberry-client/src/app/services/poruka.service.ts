import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Modul } from '../models/modul.model';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PorukaService {

  constructor(private http: HttpClient) { }

  async Provera(idstudneta1: number, idstudenta2: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.backend}/chat/dodajChat/${idstudneta1}/${idstudenta2}`, {})
        .subscribe(
          (response: any) => {
            console.log(response);
            resolve(response);
          },
          (error) => {
            console.error('Greška prilikom slanja poruke:', error);
            reject(error);
          }
        );
    });
  }

  async KreirajPoruku(userid: number, text: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.backend}/chat/DodajPoruku/${userid}/${text}`, {})
        .subscribe(
          (response: any) => {
            console.log(response);
            resolve(response);
          },
          (error) => {
            console.error('Greška prilikom slanja poruke:', error);
            reject(error);
          }
        );
    });
  }
  getNeprocitanePorukeCount(userId: number) {
    const url = `${environment.backend}/chat/VratiNeprocitanePorukeStudenta/${userId}`;
    return this.http.get<number>(url);
  }
  
 
  async PosaljiPoruku(chatid: number, idporuke: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(`${environment.backend}/chat/DodajPorukuUChat/${idporuke}/${chatid}`, {})
        .subscribe(
          (response: any) => {
            console.log(response);
            resolve(response);
          },
          (error) => {
            reject(error);
          },
          () => {
            // Handle the completion of the HTTP request
          }
        );
    });
  }
  async VratiPoslednjuDodatuPoruku(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.backend}/chat/VratiPoslednjuDodatuPoruku`)
        .subscribe(
          (response: any) => {
            console.log(response);
            resolve(response);
          },
          (error) => {
            console.error('Greška prilikom dobavljanja poslednje dodate poruke:', error);
            reject(error);
          }
        );
    });
  }

  async OznaciPorukuKaoProcitanu(porukaId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(`${environment.backend}/chat/OznaciPorukuKaoProcitanu/${porukaId}`, {})
        .subscribe(
          (response: any) => {
            console.log(response);
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

}
