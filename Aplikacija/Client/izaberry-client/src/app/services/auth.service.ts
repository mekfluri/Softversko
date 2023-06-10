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
import { Privilegije } from '../models/permission.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtService: JwtHelperService;
  constructor(private http: HttpClient, private userService: UserService) {
    this.jwtService = new JwtHelperService();
  }

  isMentor(): boolean {
    let token = localStorage.getItem("authToken");
    console.log(token);
    if(token != null){
      let decoded = this.jwtService.decodeToken(token);
      if((decoded.perm as Privilegije) >= Privilegije.MENTOR) {
        return true;
      }
    }
    return false;
  }

  currentUserPermissions(): Privilegije {
    let token = localStorage.getItem("authToken");
    if(token) {
      let decoded = this.jwtService.decodeToken(token);
      return parseInt(decoded.perm) as Privilegije;
    }
    return 1;
  }

  currentUserId(): number {
    let token = localStorage.getItem("authToken");
    if (token) {
      let decoded = this.jwtService.decodeToken(token);
      return parseInt(decoded.sub);
    }
    else return -1;
  }

  async login(credentials: LoginModel, role: string): Promise<string> {
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Accept", "text/plain");

    let token$ = this.http.post(`${environment.backend}/login/${role}`, credentials, {
      headers,
      responseType: "text",
    });
    let result: string = "";
    try {
      result = await firstValueFrom(token$);
    }
    catch (err: any) {
      throw new Error(err.error);
    }
    return result;
  }
  async register(credentials: SignInModel): Promise<string> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    let register$ = this.http.post(`${environment.backend}/registracija`, credentials, {
      headers,
      responseType: "text"
    });
    let token = "";
    try {
      token = await firstValueFrom(register$);
    }
    catch (err: any) {
      throw new Error(err.error);
    }
    return token;
  }
}
