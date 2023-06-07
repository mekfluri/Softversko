import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Komentar } from 'src/app/models/komentar.model';
import { Student } from 'src/app/models/student.model';
import { UserService } from 'src/app/services/user.service';
import { Privilegije } from 'src/app/models/permission.model';
import { StudentiService } from 'src/app/services/studenti.service';
import { HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';
//import { ConsoleReporter } from 'jasmine';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  student: Student | null;
  komentari: Komentar[] | null = null;
  editingBio: boolean = false;
  rezultat: string = "";
  showdiv: boolean = false;


  response!: { dbPath: ''; };
  


  constructor(private http: HttpClient, private router: Router, private userService: UserService, private studentService: StudentiService) {
    this.student = null;
  }

  async ngOnInit(): Promise<void> {
    let token = localStorage.getItem("authToken");
    if (token) {
      this.student = await this.userService.getUserByToken(token);

      this.PostaviSliku();
 
    }

  }
  async showPhoto(){
    this.showdiv = true
  }
  
  PostaviSliku()
  {
    
      var rez = this.studentService.VratiSliku(this.student!.id);
      rez.then((odgovor) => {
      
        //this.rezultat = encodeURIComponent(odgovor);
        
        this.rezultat = odgovor.replace('Client\\izaberry-client\\src', '..');
        console.log(this.rezultat);

        console.log(odgovor);
      }).catch((error) => {
        console.error('Greška prilikom dohvatanja slike:', error);
      });
 
  }

  editBio() {
    this.editingBio = true;
  }

  async saveBio() {
    
    if (this.student && this.student.bio) {
      this.student.bio = this.student.bio.trim();
      this.editingBio = false;
      try {
        await this.studentService.updateStudentBiografija(this.student.bio, this.student.id);
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
    // Implement this method
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
  redirectToZahtevi(){
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
  uploadFinished = (event: { dbPath: ""; }) => { 
    this.response = event; 
    console.log(this.response);
  }
 async onCreate(){
    this.student!.ProfilePhotoURL = this.response.dbPath;
    console.log(this.student!.ProfilePhotoURL);
    var kodiraj = encodeURIComponent(this.student!.ProfilePhotoURL);
    console.log(kodiraj);
    //da uzmem studentov id i da ga zapamtim zajedno sa putanjom
    let updatovano = await this.studentService.UpdatePhoto(this.student!.id, kodiraj);
   
    var rez = this.studentService.VratiSliku(this.student!.id);
      rez.then((odgovor) => {
      
        //this.rezultat = encodeURIComponent(odgovor);
        
        this.rezultat = odgovor.replace('Client\\izaberry-client\\src', '..');
        console.log(this.rezultat);

        console.log(odgovor);
      }).catch((error) => {
        console.error('Greška prilikom dohvatanja slike:', error);
      });
    
  }

  createImgPath()
  {
     
   
    
  }
   

}
