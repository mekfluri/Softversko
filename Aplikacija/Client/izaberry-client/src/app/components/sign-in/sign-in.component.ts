import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, map, mergeMap } from 'rxjs';
import { Modul } from 'src/app/models/modul.model';
import { SignInModel } from 'src/app/models/sign-in.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  hasError: boolean = false;
  errorMessage: string = "";
  registerInfo: SignInModel;
  moduli: string[];
  constructor(private http: HttpClient, private router: Router, private authService: AuthService, private userService: UserService) {
    this.registerInfo = new SignInModel();
    this.moduli = [];
  }

  private async fetchModules(): Promise<string[]> {
    let module$ = this.http.get<Modul[]>(`${environment.backend}/moduli`);
    let moduli = await firstValueFrom(module$);
    return moduli.map((modul: Modul) => modul.naziv);
  }
  async ngOnInit(): Promise<void> {
    this.moduli = await this.fetchModules();
  }

  async onRegisterClick() {
    try {
      let token = await this.authService.register(this.registerInfo);
      localStorage.setItem("authToken", token);
      let user = await this.userService.getUserByToken(token);
      this.router.navigate(["profile"], { state: user! });
    }
    catch (err: any) {
      this.hasError = true;
      this.errorMessage = (err as Error).message;
    }
  }

  private getInput(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  passwordKeyUp(event: KeyboardEvent) {
    this.registerInfo.password = this.getInput(event);
  }

  emailKeyUp(event: KeyboardEvent) {
    this.registerInfo.email = this.getInput(event);
  }

  usernameKeyUp(event: KeyboardEvent) {
    this.registerInfo.username = this.getInput(event);
  }

  modulChange(event: Event) {
    this.registerInfo.modul = this.getInput(event);
  }

  semestarChange(event: Event) {
    this.registerInfo.semestar = parseInt(this.getInput(event));
  }
}
