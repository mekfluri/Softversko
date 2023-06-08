import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MentorRequest } from '../models/mentor-request.model';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MentorService {

  constructor(private http: HttpClient) { }

  async createRequest(request: MentorRequest) {
    let formData = new FormData();
    formData.append("file1", request.firstPage!, request.firstPage!.name);
    formData.append("file2", request.predmetPage!, request.predmetPage!.name);
    let resp$ = this.http.post(`${environment.backend}/mentorRequest/${request.studentId}/${request.predmetId}`, formData);
    console.log(await firstValueFrom(resp$));
  }
}
