import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tag } from '../models/tag.model';
import { environment } from 'src/environments/environment';
import { first, firstValueFrom } from 'rxjs';
import { Komentar } from '../models/komentar.model';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class KomentariService {

  constructor(private http:HttpClient) { }

  async Studentkomentari(id : number): Promise<Komentar[]>{
  
    let komentari$ = this.http.get<Komentar[]>(`${environment.backend}/komentar/byStudent/${id}`);
    let komentari = await firstValueFrom(komentari$);
    console.log(komentari);
    return komentari;
  }
 
  async Predmetkomentari(id : number): Promise<Komentar[]>{
    
    let komentari$ = this.http.get<Komentar[]>(`${environment.backend}/komentar/byPredmet/${id}`);
    let komentari = await firstValueFrom(komentari$);
    console.log(komentari);
    return komentari;
  }
 
  async getAllComments(): Promise<Komentar[] | null>{
    let komentari$ = this.http.get<Komentar[]>(`${environment.backend}/komentar/vratikomentar`);
    let komentari = await firstValueFrom(komentari$);
    return komentari;
  
  }


  async deleteComment(id: number){
    let resp$ = this.http.delete(`${environment.backend}/komentar/obrisiKomentar/${id}`, {
      responseType: "text"
    });
    return firstValueFrom(resp$);
  
  }

 async UpdateKomentar(text: string, id: number)
 {
  let resp$= this.http.put(`${environment.backend}/komentar/azurirajKomentar/${text}/${id}`, {
     responseType: "text"
  });
  return firstValueFrom(resp$);
  
 }

}
