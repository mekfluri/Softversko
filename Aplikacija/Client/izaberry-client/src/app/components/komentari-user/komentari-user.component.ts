import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Komentar } from 'src/app/models/komentar.model';
import { Predmet } from 'src/app/models/predmet.model';
import { Student } from 'src/app/models/student.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute, Route } from '@angular/router';


@Component({
  selector: 'app-komentari-user',
  templateUrl: './komentari-user.component.html',
  styleUrls: ['./komentari-user.component.scss']
})
export class KomentariUserComponent implements OnInit {
  komentari: Komentar[] | null = null;

  constructor(private http: HttpClient, private auto: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    const secondParam = this.route.snapshot.paramMap.get('userId');
    const userId = secondParam ? parseInt(secondParam, 10) : null;

    this.getUserComments(userId!).then(() => {

    });
  }

  async getUserComments(userId: number) {
    try {
      const response = await this.http.get<any>(`${environment.backend}/komentar/byStudent/` + userId).toPromise();

      this.komentari = response;


    } catch (error) {
      console.error('Error fetching user comments:', error);
      this.komentari = null;
    }
  }
}
