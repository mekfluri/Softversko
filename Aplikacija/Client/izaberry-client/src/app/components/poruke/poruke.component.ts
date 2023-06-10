import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Poruka } from 'src/app/models/poruke.model';
import { environment } from 'src/environments/environment';
import { Student } from 'src/app/models/student.model';
import { StudentiService } from 'src/app/services/studenti.service';
import { AuthService } from 'src/app/services/auth.service';
import { first, firstValueFrom, Observable } from 'rxjs';
import { createElement } from '@fullcalendar/core/preact';

@Component({
  selector: 'app-poruke',
  templateUrl: './poruke.component.html',
  styleUrls: ['./poruke.component.scss']
})
export class PorukeComponent implements OnInit {
  @ViewChild('divContainer') divContainer!: ElementRef;

  poruke: Poruka[] | null = null;
  student: Student | null = null;
  userId: number =0;
  prikazi:boolean = false;
  svePoruke: Poruka[] | null = null;
  text: string = "";
  chat: number =0;
  idporuke: number =0;
  primalacDiv: any[] = [];
  posiljalacDiv: any[] = [];
  poruka: Poruka | null = null;

  constructor(private authService: AuthService,private StudentService: StudentiService,private http: HttpClient, private route: ActivatedRoute) {
    const studentId = this.route.snapshot.paramMap.get('studentId');
    if (studentId) {
      const userId = parseInt(studentId);
      console.log("zovem");
      //this.getUserComments(userId);
    }
  }

  async ngOnInit() {
    let userId = this.route.snapshot.paramMap.get("userId");
  if (userId) {
    this.userId = parseInt(userId);
  } else {
    this.userId = this.authService.currentUserId();
  }
    
  }

 async getUserComments() {
    

    this.http
      .get<Poruka[]>(`${environment.backend}/chat/VratiNeprocitanePorukeStudenta/${this.userId}`)
      .subscribe(
        (response) => {
          this.poruke= [];
          response.forEach(element => {
              if(element.student.id != this.userId){
                 this.poruke?.push(element);
                 console.log(element);
                 
              }
              console.log(this.poruke);
             
          });
          
          
        },
        (error) => {
          console.error('Error fetching user comments:', error);
          this.poruke = null;
        }
      );
  }

  createDiv() : void
  {

    const container = this.divContainer.nativeElement;
    container.innerHTML = '';

      for(let poruka of this.svePoruke!){
        const div = document.createElement('div');
        
        if(poruka.student.id == this.userId)
        {
          div.className = 'div-levo';
        }
        else{
          div.className = 'div-desno';
        }
        
        //div.innerHTML = poruka.text;
        container.appendChild(div);
        const divZaPoruku = document.createElement('div');
        divZaPoruku.classList.add("ZaPoruku");
        divZaPoruku.textContent =poruka.text;
        div.appendChild(divZaPoruku);
      }
  }

 async odgovori(poruka: Poruka){
     this.prikazi = true;
     this.chat = poruka.chat.id;
     this.http
     .get<Poruka[]>(`${environment.backend}/chat/VratiPorukeIzChata/${this.chat!}`)
     .subscribe(
       (response) => {
           this.svePoruke = response;
           console.log(this.svePoruke);
           this.createDiv();
        
       },
       (error) => {
         console.error('Error fetching user comments:', error);
         
       }
     );

      //dodaj da je poruka procitana (idporuke)
        
  /* await this.http.put(`${environment.backend}/chat/PromeniStatus/${poruka.id}`, {})
   .subscribe(
     (response: any) => {
       console.log(response);
     
        
     },
     (error) => {
       console.error('Greška prilikom slanja poruke:', error);
     }
   );*/
      

 }

  async idKeyUp(event: Event){
      this.text =  (event.target as HTMLInputElement).value;

  }

  async posalji(){

  await this.http.post(`${environment.backend}/chat/DodajPoruku/${this.userId}/${this.text}`, {})
   .subscribe(
     (response: any) => {
       console.log(response.id);
       this.idporuke = response.id;
       console.log(this.idporuke);
        
     },
     (error) => {
       console.error('Greška prilikom slanja poruke:', error);
     }
   );
 
   console.log(this.idporuke); 

  }

  async sacuvaj()
  {
    
   await this.http.put(`${environment.backend}/chat/DodajPorukuUChat/${this.idporuke}/${this.chat}`, {})
   .subscribe(
     (response: any) => {
       console.log(response);
     
        
     },
     (error) => {
       console.error('Greška prilikom slanja poruke:', error);
     }
   );
  
  }

  async obrisi(poruka: Poruka){
    await this.http.delete(`${environment.backend}/chat/ObrisiPoruku/${poruka.id}`, {})
    .subscribe(
      (response: any) => {
        console.log(response);
      
         
      },
      (error) => {
        console.error('Greška prilikom slanja poruke:', error);
      }
    ); 
  }


   createDivLevo(poruka:Poruka)
   {
       const divJedan = document.createElement("div");
       divJedan.className = "Poruka"
       divJedan.innerHTML = poruka.student.username;


   }

   createDivDesno(poruka:Poruka)
   {
    const divJedan = document.createElement("div");
    divJedan.className = "Poruka"
    divJedan.innerHTML = poruka.student.username;
   }
}


