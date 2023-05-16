import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  student: Student | null;

  constructor(private router: Router){
    this.student = this.router.getCurrentNavigation()?.extras.state! as Student;
  }
}
