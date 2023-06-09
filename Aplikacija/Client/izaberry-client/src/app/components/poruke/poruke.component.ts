import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Poruka } from 'src/app/models/poruke.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-poruke',
  templateUrl: './poruke.component.html',
  styleUrls: ['./poruke.component.scss']
})
export class PorukeComponent implements OnInit {
  poruke: Poruka[] | null = null;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    const studentId = this.route.snapshot.paramMap.get('studentId');
    if (studentId) {
      const userId = parseInt(studentId);
      console.log("zovem");
      this.getUserComments(userId);
    }
  }

  ngOnInit() {
    const studentId = this.route.snapshot.paramMap.get('studentId');
    if (studentId) {
      const userId = parseInt(studentId);
      console.log("zovem");
      this.getUserComments(userId);
    }
  }

  getUserComments(userId: number) {
    this.http
      .get<Poruka[]>(`${environment.backend}/chat/VratiNeprocitanePorukeStudenta/${userId}`)
      .subscribe(
        (response) => {
          this.poruke = response;
          console.log(this.poruke);
        },
        (error) => {
          console.error('Error fetching user comments:', error);
          this.poruke = null;
        }
      );
  }
}
