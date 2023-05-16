import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  async getUserByToken(token: string): Promise<Student | null> {
    let headers = new HttpHeaders()
      .set("Authorization", `Bearer ${token}`);
    let user$ = this.http.get<Student>(`${environment.backend}/student`, {
      headers
    });
    let user = await firstValueFrom(user$);
    return user;
  }
}
