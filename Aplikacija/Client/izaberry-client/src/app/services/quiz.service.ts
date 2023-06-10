import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QuizResponse } from '../models/quiz-response.model';
import { Preference } from '../models/preference.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  async getRecommendationsForUser(): Promise<QuizResponse[]> {
    let resp$ = this.http.get<QuizResponse[]>(`${environment.backend}/kviz/byPreferences`);
    return (await firstValueFrom(resp$));
  }

  async getRecommendations(preference: Preference[]) {
    let resp$ = this.http.post<QuizResponse[]>(`${environment.backend}/kviz`, preference);
    return (await firstValueFrom(resp$));
  }
}
