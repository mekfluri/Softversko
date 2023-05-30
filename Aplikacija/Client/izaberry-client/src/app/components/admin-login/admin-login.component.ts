import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/login.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {

  email: string;
  password: string;

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
      let token = await this.authService.login(loginCredentials, true);
      localStorage.setItem("authToken", token);
      let user = await this.userService.getUserByToken(token);
      this.router.navigate(["profile"], {
        state: user!
      });
    }
    catch (err: any) {
      alert((err as Error).message);
    }
  }
  emailKeyUp(event: KeyboardEvent) {
    this.email = (event.target as HTMLInputElement).value;
  }
  passwordKeyUp(event: KeyboardEvent) {
    this.password = (event.target as HTMLInputElement).value;
  }
}