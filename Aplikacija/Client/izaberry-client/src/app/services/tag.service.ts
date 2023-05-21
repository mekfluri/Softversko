import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tag } from '../models/tag.model';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http:HttpClient) { }

  async getAllTags(): Promise<Tag[]> {
    let tagovi$ = this.http.get<Tag[]>(`${environment.backend}/tag`);
    let tagovi = await firstValueFrom(tagovi$);
    return tagovi;
  }
}
