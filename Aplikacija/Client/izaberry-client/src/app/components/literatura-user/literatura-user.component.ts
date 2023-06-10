import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PredmetiService } from 'src/app/services/predmeti.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { LiteraturaService } from 'src/app/services/literatura.service';
import { Literatura } from 'src/app/models/literatura.model';

@Component({
  selector: 'app-literatura-user',
  templateUrl: './literatura-user.component.html',
  styleUrls: ['./literatura-user.component.scss']
})
export class LiteraturaUserComponent implements OnInit {
  predmetId: number = 0;
  literature: Literatura[] = [];
  dokumentDivs: any[] = [];
  slikeDivs: any[] = [];
  userId: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private predmetiService: PredmetiService,
    private userService: UserService,
    private AuthService: AuthService,
    private literaturaService: LiteraturaService
  ) { }

  async ngOnInit(): Promise<void> {
    const secondParam = this.route.snapshot.paramMap.get('userId');
    this.userId = parseInt(secondParam!);
    this.literature = await this.literaturaService.StudentLiteratura(this.userId);
  }

  isPdfFile(naziv: string): boolean {
    return naziv.toLowerCase().endsWith('.pdf');
  }

  isJpgFile(naziv: string): boolean {
    return naziv.toLowerCase().endsWith('.jpg');
  }

  isPngFile(naziv: string): boolean {
    return naziv.toLowerCase().endsWith('.png');
  }
}
