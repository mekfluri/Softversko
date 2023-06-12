import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Komentar } from 'src/app/models/komentar.model';
import { Student } from 'src/app/models/student.model';
import { UserService } from 'src/app/services/user.service';
import { Privilegije } from 'src/app/models/permission.model';
import { StudentiService } from 'src/app/services/studenti.service';
import { HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { debounceTime } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PorukaService } from 'src/app/services/poruka.service';


import { AuthService } from 'src/app/services/auth.service';
import { Modul } from 'src/app/models/modul.model';
import { environment } from 'src/environments/environment';
import { Chat } from 'src/app/models/chat.model';

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
  showdiv: boolean = false;
  showcontainer: boolean = false;
  rezultat: string = "../../../assets/logoFinal.png";
  searchTerm: string = '';
  searchResults: Student[] = [];
  response!: { dbPath: '' };
  idchata: number = 0;
  idporuke: number = 0;
  prikaziPoruku: boolean = false;
  text: string = "";
  unreadMessageCount: number = 0;
  isLoggedIn: boolean = false;


  constructor(
    private PorukaService: PorukaService,
    private StudentiService: StudentiService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private http: HttpClient // Added http client injection
  ) {
    this.localId = this.authService.currentUserId();
    let userId = this.route.snapshot.paramMap.get("userId");
    if (userId) {
      this.userId = parseInt(userId);
    } else {
      this.userId = this.authService.currentUserId();
    }
    this.student = null;
    this.isLoggedIn = this.authService.currentUserId() != -1;
  }
  fetchPorukeCount() {
    const userId = this.authService.currentUserId();
    const url = `${environment.backend}/chat/VratiNeprocitanePorukeStudenta/${userId}`;

    this.http.get<any[]>(url).subscribe(
      (response) => {
        this.unreadMessageCount = response.length;
      },
      (error) => {
      }
    );
  }

  async ngOnInit(): Promise<void> {
    try {
      this.student = await this.userService.getUserById(this.userId);
      this.fetchPorukeCount();

    } catch (err: any) {
      this.router.navigate(["error"], {
        state: err as Error
      });
    }

    this.PostaviSliku();


  }

  async showPhoto() {
    this.showdiv = true;
  }

  async PostaviSliku() {
    var rez = this.StudentiService.VratiSliku(this.student!.id);
    if (rez != null) {
      rez
        .then((odgovor) => {
          this.rezultat = odgovor.replace('Client\\izaberry-client\\src', '..');
        })
        .catch((error) => {
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
        await this.StudentiService.updateStudentBiografija(
          this.student.bio,
          this.student.id
        );
      } catch (error) {
      }
    }
  }
  searchUsers(): void {
    if (this.searchTerm.trim() === '') {
      this.searchResults = [];
      return;
    }


    this.http.get<any[]>('http://localhost:5006/student/vratiStudente')
      .subscribe(
        (response) => {

          const filteredStudents = response.filter((student: any) => {
            return (
              student.username.toLowerCase().startsWith(this.searchTerm.toLowerCase()) ||
              student.email.toLowerCase().startsWith(this.searchTerm.toLowerCase())
            );
          });
          this.searchResults = filteredStudents.map((student: any) => {
            const modul = student.modul ? new Modul(student.modul.id, student.modul.naziv) : null;
            return new Student(
              student.id,
              student.username,
              modul as Modul,
              student.semestar,
              student.email,
              student.perm,
              student.bio,
              student.ProfilePhotoURL
            );
          });
        },
        (error) => {
        }
      );
  }



  selectUser(event: Event): void {
    let id = parseInt((event.target as HTMLElement).id);
    const profileUrl = `/profile/${id}`;
    this.router.navigate([profileUrl]).then(() => {
      location.reload();
    });
  }



  async prikaz() {
    this.showcontainer = false;
    this.showdiv = true;
  }

  async ugasidiv() {
    this.showdiv = false;
  }

  cancelEditBio() {
    this.editingBio = false;
  }

  async show() {
    this.showcontainer = true;
    this.showdiv = false;
  }

  isActiveLink(link: string): boolean {
    return this.router.isActive(link, true);
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
  /* 
  
    canShowButtons(): boolean {
      if (this.userService.user) {
        return (
          this.userService.user.perm === Privilegije.ADMIN ||
          this.userService.user.perm === Privilegije.MENTOR
        );
      }
      return false;
    }
    */

  uploadFinished = (event: { dbPath: "" }) => {
    this.response = event;
  };

  async onCreate() {
    this.student!.ProfilePhotoURL = this.response.dbPath;
    var kodiraj = encodeURIComponent(this.student!.ProfilePhotoURL);
    let updatovano = await this.StudentiService.UpdatePhoto(
      this.student!.id,
      kodiraj
    );

    var rez = this.StudentiService.VratiSliku(this.student!.id);
    rez
      .then((odgovor) => {
        this.rezultat = odgovor.replace('Client\\izaberry-client\\src', '..');
      })
      .catch((error) => {
      });
  }



  async idKeyUp(event: Event) {
    this.text = (event.target as HTMLInputElement).value;

  }

  async posaljiPoruku() {
    this.prikaziPoruku = true;
    try {
      const rezultat = await this.PorukaService.Provera(this.userId, this.localId);
      this.idchata = rezultat.id;
    } catch (error) {
    };
  }


  async kreirajPoruku() {
    try {
      const rezultat = await this.PorukaService.KreirajPoruku(this.localId, this.text);
      this.idporuke = rezultat.id;
    } catch (error) {
    } finally {
      this.text = '';
    }


    try {
      const rezultat = await this.PorukaService.PosaljiPoruku(this.idchata, this.idporuke);
    } catch (error) {
    }
  }


}


