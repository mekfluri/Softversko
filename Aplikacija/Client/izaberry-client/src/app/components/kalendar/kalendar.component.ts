


import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';




@Component({
  selector: 'app-kalendar',
  templateUrl: './kalendar.component.html',
  styleUrls: ['./kalendar.component.scss']
})

export class KalendarComponent implements OnInit {
  userId: number;
  localId: number;

 //pozovemo iz bazu podatke 
 // i prikazemo ih 
  events: any = [
    { title: 'Present', date: '2023-05-01' , color: '#0000FF'},
    { title: 'Absent', date: '2023-05-02' , color: '#0000FF'},
  ];
 
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: this.events,
    eventClick: this.deleteEvent.bind(this)
  };

  @ViewChild('fullCalendar')
  fullCalendar!: FullCalendarComponent;

  newEvent: any = {
    title: '',
    date: '',
    color: '#0000FF',
    id: ''
  };
  
  //Add Some Events
  markiraniDatumi1: any[] = [];  
  constructor( private http: HttpClient, private route: ActivatedRoute, private authService: AuthService){
    let user = this.route.snapshot.paramMap.get("userId");
    this.localId = this.authService.currentUserId();
    if(user){
      this.userId = parseInt(user);
    }
    else {
      this.userId = this.authService.currentUserId();
    }
  }
 
  ngAfterViewInit() {
    this.initializeFullCalendar();
  }

  initializeFullCalendar() {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin],
      events: this.events,
      eventClick: this.deleteEvent.bind(this)
    };
  }

  ngOnInit() {
   
      this.http.get<any>('http://localhost:5006/kalendar/vartiKalendar')
         .subscribe(
          p => {
           
            
           
          
            this.markiraniDatumi1 = p[0].markiraniDatumi.map((item: any) => ({
              id:item.id,
              poruka: item.poruka,
              oznacenDatum: item.oznacenDatum
            }));
    

            this. logPorukuIDatum();
          }
         );
    
  }

  logPorukuIDatum() {
    this.initializeFullCalendar();
    this.markiraniDatumi1.forEach(item => {
      
      const dateonly = item.oznacenDatum.split('T')[0];
      
      this.events.push({ title: item.poruka, date: dateonly, color: '#0000FF' , id: item.id});
   
    });
    
    this.updateCalendarEvents();

}

addEventToDatabase() {
  const { title, date, color } = this.newEvent;
  this.events.push({ title, date, color});
  this.updateCalendarEvents();

  


   this.http.post("http://localhost:5006/datum/dodajdatum/"+ this.newEvent.title+"/"+this.newEvent.date, this.newEvent)
     .subscribe(
       response => {
         //response mi je id ali kako ja da ga zapamtim sad???
         this.newEvent.id = response;
         
       },
       error => {
         console.error('Greška prilikom spremanja događaja:', error);
       }
     );

  // Resetirajte polja input 
  this.newEvent.title = '';
  this.newEvent.date = '';
}

updateCalendarEvents() {
  if (this.fullCalendar.getApi()) {
    this.fullCalendar.getApi().removeAllEvents();
    this.fullCalendar.getApi().addEventSource(this.events);
  }
}

deleteEvent(event: any)
{
  const confirmation = window.confirm('Jeste li sigurni da želite izbrisati događaj?');
  if (confirmation) {
    const id = event.event.id; 
    const dateObj = new Date(event.event.start);
    dateObj.setDate(dateObj.getDate() + 1);
    
    const date1 = dateObj.toISOString().substring(0, 10);

    const index = this.events.findIndex((e: any) => {
 
      return e.title === event.event.title && new Date(e.date).getTime() === new Date(date1).getTime();
    });
    
    if (index !== -1) {
      this.events.splice(index, 1);
      this.updateCalendarEvents();

      
  
      this.http.delete("http://localhost:5006/datum/obrisiDatum/"+ id)
        .subscribe(
          response=> {
          }
        );

        this.updateCalendarEvents();

    }
  }
}

}
