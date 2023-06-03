import { Component, OnInit } from '@angular/core';
import { CdkAccordion, CdkAccordionModule } from '@angular/cdk/accordion';
import { TagService } from 'src/app/services/tag.service';
import { Tag } from 'src/app/models/tag.model';
import { getSafePropertyAccessString } from '@angular/compiler';
import { Komentar } from 'src/app/models/komentar.model';
import { KomentariService } from 'src/app/services/komentari.service';
import { Student } from 'src/app/models/student.model';
import { Predmet } from 'src/app/models/predmet.model';
import { PredmetiService } from 'src/app/services/predmeti.service';

@Component({
  selector: 'app-komentari',
  templateUrl: './komentari.component.html',
  styleUrls: ['./komentari.component.scss']
})
export class KomentariComponent implements OnInit {
  komentari: Komentar[] | null = null;
  currentKomentar: Komentar | null = null;
  studenti: Student[] | null= null;
  student: Student | null = null;
  komentariArray: Komentar[] | null = null;
  predmeti: Predmet[] | null = null;
  predmet: Predmet | null = null;
  komentarToChange: Komentar | null = null;

  constructor(private KomentarService: KomentariService, private PredmetiService: PredmetiService) {
    this.currentKomentar = null;

  }

  async ngOnInit(): Promise<void> {
    this.komentari = await this.KomentarService.getAllComments();
    this.studenti = await this.KomentarService.getAllStudents();
    this.predmeti = await this.PredmetiService.getAll();
    
  }

  async getKomentari() {
      this.komentariArray = await this.KomentarService.getAllComments();
  }

  async UpdateKomentar() {
      let resonse = await this.KomentarService.UpdateKomentar(this.komentarToChange!.text, this.komentarToChange!.id);  
  }

  async deleteKomentar() {
      console.log(await this.KomentarService.deleteComment(this.currentKomentar!.id));
  }
  async komentariPredmeta()
  {
   
    let response = await this.KomentarService.Predmetkomentari(this.predmet!.id);
    console.log(response);

    this.komentariArray = Object.values(response);
    console.log(this.komentariArray);

  }


  async komentariStudenta()
  {
   
    let response = await this.KomentarService.Studentkomentari(this.student!.id);
    console.log(response);

    this.komentariArray = Object.values(response);
    console.log(this.komentariArray);

  }

  idChange(event: Event){
    let sId = (event.target as HTMLInputElement).value;
    try {
      const id = parseInt(sId);
      this.currentKomentar = this.komentari?.find(p => p.id == id)!;
      this.komentarToChange = this.komentari?.find(p => p.id == id)!;
    }
    catch(err: any) {
      console.error(err);
    }
  }

  cleanList() {
    this.komentariArray = null;
  }

  textKeyUp(event: Event) {
    this.komentarToChange!.text = (event.target as HTMLInputElement).value;
  }

  idKeyUp(event: Event){
    let sId = (event.target as HTMLInputElement).value;
    try {
      const id = parseInt(sId);
      this.student = this.studenti?.find(p => p.id == id)!;
    }
    catch(err: any) {
      console.error(err);
    }

    
  }

  idKeyUpPredmeta(event: Event){
    let sId = (event.target as HTMLInputElement).value;
    try {
      const id = parseInt(sId);
      this.predmet = this.predmeti?.find(p => p.id == id)!;
    }
    catch(err: any) {
      console.error(err);
    }

    console.log(this.student);
  }

  deletionKeyUp(event:Event){
    let sId = (event.target as HTMLInputElement).value;
    try {
      const id = parseInt(sId);
      this.currentKomentar = this.komentari?.find(p => p.id == id)!;
    }
    catch(err: any) {
      console.error(err);
    }
  }



}
