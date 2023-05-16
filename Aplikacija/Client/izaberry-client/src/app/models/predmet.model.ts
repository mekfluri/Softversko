import { Ocena } from "./ocena.model";
class Predmet {
    id: number;
    naziv: string;
    modul: string;
    semestar: number;
    ocene: Ocena[];
    tagovi: Tag[];
    espb: number;
    opis: string;
    constructor(id: number, naziv:string, modul: string, semestar: number, ocene: Ocena[], tagovi: Tag[], espb: number, opis: string){
        this.id = id;
        this.naziv = naziv;
        this.modul = modul;
        this.semestar = semestar;
        this.ocene = ocene;
        this.tagovi = tagovi;
        this.espb = espb;
        this.opis = opis;
    }
}