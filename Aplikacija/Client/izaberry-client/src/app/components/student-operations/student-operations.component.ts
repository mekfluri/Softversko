import { Component, OnInit } from '@angular/core';
import { StudentiService } from 'src/app/services/studenti.service';
import { Student } from 'src/app/models/student.model';
import { Modul } from 'src/app/models/modul.model';
import { ModuleService } from 'src/app/services/module.service';

@Component({
  selector: 'app-student-operations',
  templateUrl: './student-operations.component.html',
  styleUrls: ['./student-operations.component.scss']
})
export class StudentOperationsComponent implements OnInit {

  studenti: Student[] | null = null;
  student: Student | null = null;
  studentiArray: Student[] | null = null;
  currentStudent: Student | null = null;
  StudentToChange: Student | null = null;
  moduli: Modul[] | null = null;

  constructor(private StudentService: StudentiService, private modulService:ModuleService )
  {

  }

  async ngOnInit(): Promise<void> {
    this.studenti = await this. StudentService.getAllStudents();
    this.moduli = await this.modulService.getModules();
    
  }

  async getStudenti(){
    this.studentiArray = await this.StudentService.getAll();
  
  }

  async cleanList(){
    this.studentiArray = null;
  }

  async deletionKeyUp(event:Event){
    let sId = (event.target as HTMLInputElement).value;
    try {
      const id = parseInt(sId);
      this.currentStudent = this.studenti?.find(p => p.id == id)!;
    }
    catch(err: any) {
      console.error(err);
    }
  }

  async deleteStudent(){
    console.log(await this.StudentService.deleteStudent(this.currentStudent!.id));
  }

  async idChange(event: Event){
    let sId = (event.target as HTMLInputElement).value;
    try {
      const id = parseInt(sId);
     
      this.StudentToChange = this.studenti!.find(p => p.id == id)!;
    }
    catch(err: any) {
      console.error(err);
    }
  }

   async textKeyUp(event:Event)
   {
    this.StudentToChange!.username = (event.target as HTMLInputElement).value;
   }

   async UpdateStudent(){
    let response = await this.StudentService.updateStudent(this.StudentToChange!.username, this.StudentToChange!.id);
   }

   async textKeyUpSem(event: Event){
    this.StudentToChange!.semestar= parseInt((event.target as HTMLInputElement).value);
   }

   async UpdateStudentSemestar(){
    let response = await this.StudentService.updateStudentSemestar(this.StudentToChange!.semestar, this.StudentToChange!.id);
   }

   async textKeyUpBio(event: Event){
    this.StudentToChange!.bio= (event.target as HTMLInputElement).value;
   }
   async UpdateStudentBiografija(){
    let response = await this.StudentService.updateStudentBiografija(this.StudentToChange!.bio, this.StudentToChange!.id);
    console.log(response);
   }

   async modulChange(event:Event){
    let target = (event.target as HTMLSelectElement);
    this.StudentToChange!.modul =  new Modul(0, target.options[target.selectedIndex].value);
   }

   async UpdateStudentModul(){
    let response = await this.StudentService.updateStudentModul(this.StudentToChange!.modul.naziv, this.StudentToChange!.id);
   }
   async zatvori(){
    this.StudentToChange = null;
   }
}
