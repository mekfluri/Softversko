import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tag } from '../models/tag.model';
import { environment } from 'src/environments/environment';
import { first, firstValueFrom } from 'rxjs';

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

  async createTag(tag: Tag){
    let response$ = this.http.post(`${environment.backend}/tag/dodajTag`, tag);
    let response = firstValueFrom(response$);
    return response;
  }

  async deleteTag(tag: Tag){
    let response$ = this.http.delete(`${environment.backend}/tag/${tag.id}`);
    return firstValueFrom(response$);
  }
}
