import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/login.model';
import { Privilegije } from 'src/app/models/permission.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  selectedValue: string = "student";

  constructor(private router: Router, private authService: AuthService, private userService: UserService) {
    this.email = "";
    this.password = "";
  }
  async ngOnInit(): Promise<void> {
    if (localStorage.getItem("authToken") != null) {
      this.router.navigateByUrl("profile");
    }
  }

  redirectToSignup() {
    this.router.navigateByUrl("signup");
  }

  async loginRequest() {
    try {
      let loginCredentials = new LoginModel(this.email, this.password);
      let token = await this.authService.login(loginCredentials, this.selectedValue);
      localStorage.setItem("authToken", token);

      let user = await this.userService.getUserByToken(token);
      switch(user!.perm){
        case Privilegije.STUDENT:
          this.router.navigate(["profile", user!.id]);
          break;
        case Privilegije.ADMIN:
          this.router.navigate(["admin"]);
          break;
        case Privilegije.MENTOR:
          this.router.navigate(["zahtevi"]);
      }
    }
    catch (err: any) {
      this.router.navigate(["error"], {
        state: err as Error
      });
    }
  }
  emailKeyUp(event: KeyboardEvent) {
    this.email = (event.target as HTMLInputElement).value;
  }
  passwordKeyUp(event: KeyboardEvent) {
    this.password = (event.target as HTMLInputElement).value;
  }


  redirectToOglasna() {
    this.router.navigateByUrl("oglasna");
  }
  redirectToHome() {
    this.router.navigateByUrl("");
  }
}
