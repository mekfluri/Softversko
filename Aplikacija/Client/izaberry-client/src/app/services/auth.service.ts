import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginModel } from '../models/login.model';
import { environment } from 'src/environments/environment';
import { Token } from '@angular/compiler';
import { JwtHelperService } from '@auth0/angular-jwt';
import { firstValueFrom } from 'rxjs';
import { SignInModel } from '../models/sign-in.model';
import { UserService } from './user.service';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtService: JwtHelperService;
  constructor(private http: HttpClient, private userService: UserService) {
    this.jwtService = new JwtHelperService();
  }

  decodeToken(token: string) {
    let decoded = this.jwtService.decodeToken(token);
    console.log(decoded);
  }

  async login(credentials: LoginModel, admin?: boolean): Promise<string> {
    let headers = new HttpHeaders()
    .set("Content-Type","application/json")
    .set("Accept", "text/plain");

    let url = environment.backend;
    if(admin) {
      url += "/admin";
    }

    let token$ = this.http.post(`${url}/login`, credentials, {
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
