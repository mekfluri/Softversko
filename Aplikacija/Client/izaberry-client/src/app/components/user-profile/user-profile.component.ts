import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Komentar } from 'src/app/models/komentar.model';
import { Student } from 'src/app/models/student.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit{
  student: Student | null;
  komentari: Komentar[] | null = null;

  constructor(private router: Router, private userService: UserService) {
    //this.student = this.router.getCurrentNavigation()?.extras.state! as Student;
    this.student = null;
  }
  async ngOnInit(): Promise<void> {
    let token = localStorage.getItem("authToken");
    if(token) {
      this.student = await this.userService.getUserByToken(token);
      console.log(this.student);
    }
  }

  showCalendar() {
     this.router.navigateByUrl("kalendar");
  }

  showLiteratura() {

  }

  async showKomentari() {
    let komentari = await this.userService.getUserComments();
    console.log(komentari);
    return komentari;
  }

  logOut() {
    localStorage.removeItem("authToken");
    this.router.navigateByUrl("");
  }

   
  redirectToOglasna() {
    this.router.navigateByUrl("oglasna");
  }
  redirectToHome() {
    this.router.navigateByUrl("");
  }
}
