import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tag } from '../models/tag.model';
import { environment } from 'src/environments/environment';
import { first, firstValueFrom } from 'rxjs';
import { Komentar } from '../models/komentar.model';
import { Student } from '../models/student.model';
import { Literatura } from '../models/literatura.model';
@Injectable({
  providedIn: 'root'
})
export class LiteraturaService {

  constructor(private http:HttpClient) { }

  async StudentLiteratura(id :number)
  {
    let literatura$ = this.http.get<Literatura[]>(`${environment.backend}/literatura/byStudentLit/${id}`);
    let literatura = await firstValueFrom(literatura$);
    console.log(literatura);
    return literatura;
  }

  
}
