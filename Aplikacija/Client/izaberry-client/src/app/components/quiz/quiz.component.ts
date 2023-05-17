import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  pitanje1: string[] = [
    "Koje vrste matematičkih problema biste voleli da primenjujete u tehnološkim i inženjerskim oblastima?",
    "Koje oblasti matematike biste voleli da proučavate i primenjujete u ekonomiji i finansijama?",
    "Koje vrste matematičkih problema biste voleli da primenjujete u medicini i biologiji?",
    "Koje oblasti matematike biste voleli da istražujete u oblastima veštačke inteligencije i mašinskog učenja?"
  ];

  odgovori1: string[][] = [
    [
      "Problemi koji se tiču obrade signala i komunikacija",
      "Problemi koji zahtevaju primenu matematičkih metoda u elektronici i telekomunikacijama",
      "Problemi koji se odnose na modeliranje i simulaciju fizičkih sistema",
      "Problemi koji zahtevaju primenu matematičke optimizacije u mašinstvu i industrijskom inženjeringu",
      "Problemi koji se tiču numeričkog modeliranja i analize strujanja fluida",
      "Problemi koji zahtevaju primenu matematičke analize u energetici i obnovljivim izvorima energije"
    ],
    [
      "Matematičko modeliranje finansijskih instrumenata i derivata",
      "Statistička analiza tržišta i predviđanje finansijskih trendova",
      "Optimizacija portfelja i upravljanje rizikom",
      "Finansijsko inženjerstvo i kvantitativne metode",
      "Matematička analiza ekonomskih modela i predviđanja",
      "Primena verovatnoće i statistike u analizi finansijskih podataka"
    ],
    [
      "Modeliranje širenja bolesti i epidemiološka analiza",
      "Analiza genetičkih podataka i bioinformatika",
      "Matematički modeli za istraživanje rasta tumorskih ćelija",
      "Statistička analiza medicinskih eksperimenata i kliničkih ispitivanja",
      "Analiza bioloških mreža i interakcija među molekulima",
      "Primena matematičke optimizacije u proučavanju bioloških sistema"
    ],
    [
      "Algoritmi mašinskog učenja i duboko učenje",
      "Modeliranje i analiza velikih skupova podataka",
      "Obrada prirodnog jezika i analiza sentimenta",
      "Reinforcement learning i autonomni sistemi",
      "Generativni modeli i prepoznavanje oblika",
      "Matematičke metode za interpretaciju i objašnjenje mašinskih modela"
    ]
  ];

  ngOnInit() {
    this.updateText();
  }

  updateText() {
    const predmet = document.getElementById('predmet1') as HTMLSelectElement;
    const broj = document.getElementById('brojevi') as HTMLSelectElement;


    const selectedPredmet = predmet.value;
    const selectedBroj = parseInt(broj.value, 10);

    if (selectedPredmet === 'RACUNARSTVO I INFORMATIKA' && selectedBroj === 2) {
      const pitanjeDivs = document.getElementsByClassName('pitanjeDiv');
      const odgovorDivs = document.getElementsByClassName('odgovorDiv');

      for (let i = 0; i < pitanjeDivs.length; i++) {
        const pitanjeDiv = pitanjeDivs[i] as HTMLElement;
        const odgovorDiv = odgovorDivs[i] as HTMLElement;

        pitanjeDiv.innerText = "Pitanje " + (i + 1) + ": " + this.pitanje1[i];
        odgovorDiv.innerHTML = "";

        for (let j = 0; j < this.odgovori1[i].length; j++) {
          const odgovor = this.odgovori1[i][j];
          const p = document.createElement('p');
          p.innerText = odgovor;
          odgovorDiv.appendChild(p);
        }
      }
    }
    else {
      const pitanjeDivs = document.getElementsByClassName('pitanjeDiv');
      const odgovorDivs = document.getElementsByClassName('odgovorDiv');

    
      for (let i = 0; i < pitanjeDivs.length; i++) {
        const pitanjeDiv = pitanjeDivs[i] as HTMLElement;
       
    
        pitanjeDiv.innerText = "";
        
      }
      for (let i = 0; i < odgovorDivs.length; i++)
    
      {
        const odgovorDiv = odgovorDivs[i] as HTMLElement;
        odgovorDiv.innerHTML = "";
        
      } 
    }
  }
}