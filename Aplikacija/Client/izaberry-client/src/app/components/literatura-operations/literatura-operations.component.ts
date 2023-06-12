import { Component, OnInit } from '@angular/core';
import { LiteraturaService } from 'src/app/services/literatura.service';
import { Student } from 'src/app/models/student.model';
import { KomentariService } from 'src/app/services/komentari.service';
import { Literatura } from 'src/app/models/literatura.model';
import { Predmet } from 'src/app/models/predmet.model';
import { PredmetiService } from 'src/app/services/predmeti.service';
import { StudentiService } from 'src/app/services/studenti.service';



@Component({
  selector: 'app-literatura-operations',
  templateUrl: './literatura-operations.component.html',
  styleUrls: ['./literatura-operations.component.scss']
})
export class LiteraturaOperationsComponent implements OnInit {

  studenti: Student[] | null = null;
  student: Student | null = null;
  litearturaArray: Literatura[] | null = null;
  currentliteratura: Literatura | null = null;
  literature: Literatura[] | null = null;
  predmeti: Predmet[] | null = null;
  predmet: Predmet | null = null;
  literaturaToChange: Literatura | null = null;

  constructor(private StudentService: StudentiService, private LiteraturaService: LiteraturaService, private KomentarService: KomentariService, private PredmetiService: PredmetiService) {

  }

  async ngOnInit(): Promise<void> {
    this.studenti = await this.StudentService.getAllStudents();
    this.literature = await this.LiteraturaService.getAll();
    this.predmeti = await this.PredmetiService.getAll();


  }

  async LiteraturaStudenta() {
    let response = await this.LiteraturaService.StudentLiteratura(this.student!.id);
    console.log(response);

    this.litearturaArray = Object.values(response);
    console.log(this.litearturaArray);



  }

  async idKeyUp(event: Event) {
    let sId = (event.target as HTMLInputElement).value;
    try {
      const id = parseInt(sId);
      this.student = this.studenti?.find(p => p.id == id)!;
    }
    catch (err: any) {
      console.error(err);
    }
  }

  async deletionKeyUp(event: Event) {
    let sId = (event.target as HTMLInputElement).value;
    try {
      const id = parseInt(sId);
      this.currentliteratura = this.literature?.find(p => p.id == id)!;
    }
    catch (err: any) {
      console.error(err);
    }
  }

  async deleteLiteratura() {
    await this.LiteraturaService.deleteLiteratura(this.currentliteratura!.id);
  }

  async getLiteartura() {
    this.litearturaArray = await this.LiteraturaService.getAll();
    console.log(this.litearturaArray);
  }

  async cleanList() {
    this.litearturaArray = null;
  }

  async idKeyUpPredmeta(event: Event) {
    let sId = (event.target as HTMLInputElement).value;
    try {
      const id = parseInt(sId);
      this.predmet = this.predmeti?.find(p => p.id == id)!;

    }
    catch (err: any) {
      console.error(err);
    }
  }

  async LiteraturaPredmeta() {
    let response = await this.LiteraturaService.PredmetLiteratura(this.predmet!.id);

    this.litearturaArray = Object.values(response);
  }

  async idChange(event: Event) {
    let sId = (event.target as HTMLInputElement).value;
    try {
      const id = parseInt(sId);
      this.literaturaToChange = this.literature!.find(p => p.id == id)!;

    }
    catch (err: any) {
      console.error(err);
    }
  }
}
