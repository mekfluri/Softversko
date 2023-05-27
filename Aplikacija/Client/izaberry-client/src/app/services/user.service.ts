import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { Komentar } from '../models/komentar.model';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

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

  async getUserComments(): Promise<Komentar[] | null> {
    let komentari$ = this.http.get<Komentar[]>(`${environment.backend}/komentar/byStudent/${this.user?.id}`);
    let komentari = await firstValueFrom(komentari$) ?? null;
    return komentari;
  }
}
