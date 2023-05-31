


import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarComponent } from '@fullcalendar/angular';




@Component({
  selector: 'app-kalendar',
  templateUrl: './kalendar.component.html',
  styleUrls: ['./kalendar.component.scss']
})

export class KalendarComponent implements OnInit {
 

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
  constructor( private http: HttpClient){}
 
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
            console.log(p);
           
            
           
          
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
      console.log('Poruka:', item.poruka);
      console.log(item.id);
      console.log(item);
      
      const dateonly = item.oznacenDatum.split('T')[0];
      
      console.log('Datum:', dateonly);
      this.events.push({ title: item.poruka, date: dateonly, color: '#0000FF' , id: item.id});
   
    });
    
    this.updateCalendarEvents();

}

addEventToDatabase() {
  const { title, date, color } = this.newEvent;
  console.log(date);
  this.events.push({ title, date, color});
  this.updateCalendarEvents();

  


   this.http.post("http://localhost:5006/datum/dodajdatum/"+ this.newEvent.title+"/"+this.newEvent.date, this.newEvent)
     .subscribe(
       response => {
         console.log('Događaj spremljen u bazu:', response);
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
  console.log("kliknuli smo");
  const confirmation = window.confirm('Jeste li sigurni da želite izbrisati događaj?');
  if (confirmation) {
    const id = event.event.id; 
    const dateObj = new Date(event.event.start);
    dateObj.setDate(dateObj.getDate() + 1);
    
    const date1 = dateObj.toISOString().substring(0, 10);

    console.log(date1);
    console.log(id);
    const index = this.events.findIndex((e: any) => {
 
      console.log("Comparing:", e.title, e.date, event.event.title, date1);
      console.log("Are dates equal?", new Date(e.date).getTime() === new Date(date1).getTime());
      console.log(new Date(e.date).getTime());
      console.log(new Date(date1).getTime());
      return e.title === event.event.title && new Date(e.date).getTime() === new Date(date1).getTime();
    });
    console.log(index);
    
    if (index !== -1) {
      this.events.splice(index, 1);
      this.updateCalendarEvents();

      
  
      this.http.delete("http://localhost:5006/datum/obrisiDatum/"+ id)
        .subscribe(
          response=> {
            console.log('Događaj izbrisan iz baze:', response);
          }
        );

        this.updateCalendarEvents();

    }
  }
}

}
