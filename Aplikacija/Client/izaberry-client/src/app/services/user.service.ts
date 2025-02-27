import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { Komentar } from '../models/komentar.model';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { Preference } from '../models/preference.model';
import { Literatura } from '../models/literatura.model';


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

  async getUserById(id: number | undefined): Promise<Student | null> {
    let user$ = this.http.get<Student>(`${environment.backend}/student/${id}`);
    return (await firstValueFrom(user$));
  }
  async vratiLiteraturuStudenta(id: number): Promise<Literatura[] | null> {
    let user$ = this.http.get<Literatura[]>(`${environment.backend}/literatura/vartiLiteraturu/${id}`);
    const response = await user$.toPromise();
    return response ?? null;
  }
  
  
 

  async addNote(tekst: string,id:number): Promise<any> {
    const url = `${environment.backend}/note/dodajNotes/${encodeURIComponent(tekst)}/${id}`;
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
  
  
  async getUserComments(id:number): Promise<Komentar[] | null> {
    let komentari$ = this.http.get<Komentar[]>(`${environment.backend}/komentar/byStudent/${id}`);
    let komentari = await firstValueFrom(komentari$) ?? null;
    return komentari;
  }

  async addPreferences(preferences: Preference[]) {
    let resp$ = this.http.put(`${environment.backend}/student/preference`, preferences);
    console.log(await firstValueFrom(resp$));
  }

  async removePreference(id: number) {
    let resp$ = this.http.delete(`${environment.backend}/preference/${id}`);
    console.log(await firstValueFrom(resp$));
  }
}
