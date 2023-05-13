import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'izaberry-client';
  constructor(private router: Router){}
  redirectToLogin() {
    this.router.navigateByUrl("login");
  }
}
