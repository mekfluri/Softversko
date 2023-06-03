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
export class UserProfileComponent implements OnInit {
  student: Student | null;
  komentari: Komentar[] | null = null;
  editingBio: boolean = false;

  constructor(private router: Router, private userService: UserService) {
    this.student = null;
  }

  async ngOnInit(): Promise<void> {
    let token = localStorage.getItem("authToken");
    if (token) {
      this.student = await this.userService.getUserByToken(token);
      console.log(this.student);
    }
  }

  editBio() {
    this.editingBio = true;
  }

  async saveBio() {
    if (this.student && this.student.bio) {
      this.student.bio = this.student.bio.trim();
      this.editingBio = false;
      try {
        //await this.userService.updateStudentBio(this.student.id, this.student.bio);
        console.log("Bio saved successfully");
      } catch (error) {
        console.error("Failed to save bio:", error);
      }
    }
  }

  cancelEditBio() {
    this.editingBio = false;
  }

  showCalendar() {
    this.router.navigateByUrl("kalendar");
  }

  showLiteratura() {
    // Implement this method
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
  redirectToPredmeti() {
    this.router.navigateByUrl("predmeti");
  }
}
