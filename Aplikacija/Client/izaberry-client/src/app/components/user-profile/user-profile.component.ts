import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/student.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit{
  student: Student | null;

  constructor(private router: Router, private userService: UserService) {
    //this.student = this.router.getCurrentNavigation()?.extras.state! as Student;
    this.student = null;
  }
  async ngOnInit(): Promise<void> {
    let token = localStorage.getItem("authToken");
    if(token) {
      this.student = await this.userService.getUserByToken(token);
    }
  }

  showCalendar() {

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
}
