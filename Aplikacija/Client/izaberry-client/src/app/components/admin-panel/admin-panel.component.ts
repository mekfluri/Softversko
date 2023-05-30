import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private userService: UserService){}

  async ngOnInit(): Promise<void> {
    let token = localStorage.getItem("authToken");
    if(!token) {
      this.router.navigateByUrl("admin/login");
      return;
    }
    if(this.userService.user == null) {
      this.userService.user = await this.userService.getUserByToken(token);
    }
    /*
    if(this.userService.user!.perm != "ADMIN") {
      this.router.navigateByUrl("unauthorized");
    }
    */
  }
}
