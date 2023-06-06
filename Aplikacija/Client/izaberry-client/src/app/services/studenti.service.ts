import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tag } from '../models/tag.model';
import { environment } from 'src/environments/environment';
import { first, firstValueFrom, Observable } from 'rxjs';
import { Komentar } from '../models/komentar.model';
import { Student } from '../models/student.model';
import { Modul } from '../models/modul.model';

@Injectable({
  providedIn: 'root'
})
export class StudentiService {

  constructor(private http:HttpClient) { }

  async getAllStudents(): Promise<Student[] | null>
  {
    let studenti$ = this.http.get<Student[]>(`${environment.backend}/student/vratiStudente`);
    let studenti = await firstValueFrom(studenti$);
    return studenti;
  }

  async getAll()
  {
    let studenti$ = this.http.get<Student[]>(`${environment.backend}/student/vratiStudente`);
    let studenti = await firstValueFrom(studenti$);
    return studenti;
  
  }

  async deleteStudent(id: number)
  {
    let resp$ = this.http.delete(`${environment.backend}/student/obrisiStudenta/${id}`, {
      responseType: "text"
    });
    return firstValueFrom(resp$);
  }



  async updateStudent( username: string, id: number) {


    let resp$= this.http.put( `${environment.backend}/student/azurirajStudenta/${username}/${id}`,  {
      responseType: "text"
   });
   return firstValueFrom(resp$); 


  }

  async updateStudentSemestar(semestar: number, id:number)
  {
    let resp$= this.http.put( `${environment.backend}/student/azurirajSemestarStudenta/${semestar}/${id}`,  {
      responseType: "text"
   });
   return firstValueFrom(resp$);
  }

  async updateStudentBiografija(bio: string, id:number)
  {
    let resp$= this.http.put( `${environment.backend}/student/azurirajBioStudenta/${bio}/${id}`,  {
      responseType: "text"
   });
   return firstValueFrom(resp$);
  }

  async updateStudentModul(naziv: string, id:number)
  {
    let resp$= this.http.put( `${environment.backend}/student/azurirajModulStudenta/${naziv}/${id}`,  {
      responseType: "text"
   });
   return firstValueFrom(resp$);
  }

}
