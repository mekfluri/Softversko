import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { Komentar } from '../models/komentar.model';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: Student | null = null;

  constructor(private http: HttpClient) { }

  async getUserByToken(token: string): Promise<Student | null> {
    let user$ = this.http.get<Student>(`${environment.backend}/student`);
    this.user = await firstValueFrom(user$);
    this.user.token = token;
    return this.user;
  }
 

  async addNote(tekst: string): Promise<any> {
    const url = `${environment.backend}/note/dodajNotes/${encodeURIComponent(tekst)}/${this.user?.id}`;
    const headers = new HttpHeaders({
      'accept': '*/*',
      'Authorization': `Bearer ${this.user?.token}`,
    });
  
    try {
      const response = await this.http.post(url, {}, { headers }).toPromise();
      console.log(`Note je uspesno dodata`);
      console.log(response);
      return response; 
    } catch (error) {
      console.error(error); 
      throw error; 
    }
  }
  
  async deleteThisNote(noteId: number): Promise<void> {
    const url = `${environment.backend}/note/obrisiNotes/${noteId}`;
    const headers = new HttpHeaders({
      'accept': '*/*',
      'Authorization': `Bearer ${this.user?.token}`,
    });
  
    try {
      await this.http.delete(url, { headers }).toPromise();
      console.log(`Note sa ID ${noteId} je uspesno obrisana`);
    } catch (error) {
      console.error(error); 
      throw error;
    }
  }
  
  
  async getUserComments(): Promise<Komentar[] | null> {
    let komentari$ = this.http.get<Komentar[]>(`${environment.backend}/komentar/byStudent/${this.user?.id}`);
    let komentari = await firstValueFrom(komentari$) ?? null;
    return komentari;
  }
}
