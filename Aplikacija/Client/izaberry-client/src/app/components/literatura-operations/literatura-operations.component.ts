import { Component, OnInit } from '@angular/core';
import { LiteraturaService } from 'src/app/services/literatura.service';
import { Student } from 'src/app/models/student.model';
import { KomentariService } from 'src/app/services/komentari.service';
import { Literatura } from 'src/app/models/literatura.model';



@Component({
  selector: 'app-literatura-operations',
  templateUrl: './literatura-operations.component.html',
  styleUrls: ['./literatura-operations.component.scss']
})
export class LiteraturaOperationsComponent implements OnInit{
  
  studenti: Student[] | null = null;
  student: Student | null = null;
  litearturaArray: Literatura[] | null = null;

   constructor(private LiteraturaService: LiteraturaService,private KomentarService: KomentariService)
   {

   }

   async ngOnInit(): Promise<void>{
     this.studenti = await this.KomentarService.getAllStudents();


   }

   async LiteraturaStudenta()
   {
      let response = await this.LiteraturaService.StudentLiteratura(this.student!.id);
      console.log(response);

      this.litearturaArray = Object.values(response);
      console.log(this.litearturaArray);
       
   
   
   }
   
   async idKeyUp(event : Event)
   {
    let sId = (event.target as HTMLInputElement).value;
    try {
      const id = parseInt(sId);
      this.student = this.studenti?.find(p => p.id == id)!;
    }
    catch(err: any) {
      console.error(err);
    }
   }
  
  }
