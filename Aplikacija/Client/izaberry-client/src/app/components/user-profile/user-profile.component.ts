import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Komentar } from 'src/app/models/komentar.model';
import { Student } from 'src/app/models/student.model';
import { UserService } from 'src/app/services/user.service';
import { Privilegije } from 'src/app/models/permission.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  student: Student | null;
  komentari: Komentar[] | null = null;
  editingBio: boolean = false;
  userId: number;
  localId: number;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private authService: AuthService) {
    this.localId = this.authService.currentUserId();
    let userId = this.route.snapshot.paramMap.get("userId");
    if (userId) {
      this.userId = parseInt(userId);
    }
    else {
      this.userId = this.authService.currentUserId();
    }
    this.student = null;
  }

  async ngOnInit(): Promise<void> {
    try {
      this.student = await this.userService.getUserById(this.userId);
    }
    catch(err: any){
      this.router.navigate(["error"], {
        state: err as Error
      });
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

  showLiteratura() {
    this.showLiteraturaDiv = !this.showLiteraturaDiv;
  }
  

  async showKomentari() {
    let komentari = await this.userService.getUserComments();

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
  redirectToZahtevi() {
    this.router.navigateByUrl("zahtevi");
  }

  canShowButtons(): boolean {
    if (this.userService.user) {

      return (
        this.userService.user.perm === Privilegije.ADMIN ||
        this.userService.user.perm === Privilegije.MENTOR

      );
    }
    return false;
  }

}
