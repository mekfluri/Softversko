import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginModel } from '../models/login.model';
import { environment } from 'src/environments/environment';
import { Token } from '@angular/compiler';
import { firstValueFrom } from 'rxjs';
import { SignInModel } from '../models/sign-in.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  async login(credentials: LoginModel): Promise<string> {
    let headers = new HttpHeaders()
    .set("Content-Type","application/json")
    .set("Accept", "text/plain");
    let token$ = this.http.post(`${environment.backend}/login`, credentials, {
      headers,
      responseType: "text",
    });
    let result: string = "";
    try {
      result = await firstValueFrom(token$);
    }
    catch(err: any){
      throw new Error(err.error);
    }
    return result;
  }
  async register(credentials: SignInModel): Promise<string>{
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    let register$ = this.http.post(`${environment.backend}/registracija`, credentials, {
      headers,
      responseType: "text"
    });
    let token = "";
    try {
      token = await firstValueFrom(register$);
    }
    catch(err: any){
      throw new Error(err.error);
    }
    return token;
  }
}
