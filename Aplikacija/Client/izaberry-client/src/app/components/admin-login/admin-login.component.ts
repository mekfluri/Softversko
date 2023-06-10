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
  error: Error | null = null;

  constructor(private router: Router, private authService: AuthService, private userService: UserService) {
    this.email = "";
    this.password = "";
  }
  async ngOnInit(): Promise<void> {
    if (localStorage.getItem("authToken") != null) {
      this.router.navigateByUrl("admin");
    }
  }

  redirectToSignup() {
    this.router.navigateByUrl("signup");
  }

  async loginRequest() {
    try {
      let loginCredentials = new LoginModel(this.email, this.password);
      let token = await this.authService.login(loginCredentials, "admin");
      localStorage.setItem("authToken", token);
      let user = await this.userService.getUserByToken(token);
      this.router.navigate(["admin"], {
        state: user!
      });
    }
    catch (err: any) {
      this.router.navigate(["error"], {
        state: err as Error
      })
    }
  }
  emailKeyUp(event: KeyboardEvent) {
    this.email = (event.target as HTMLInputElement).value;
  }
  passwordKeyUp(event: KeyboardEvent) {
    this.password = (event.target as HTMLInputElement).value;
  }
}