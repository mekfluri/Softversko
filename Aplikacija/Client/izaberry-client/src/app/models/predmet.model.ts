import { Komentar } from "./komentar.model";
import { Modul } from "./modul.model";
import { Ocena } from "./ocena.model";
import { Tag } from "./tag.model";

class Predmet {
    id: number;
    naziv: string;
    modul: Modul;
    semestar: number;
    ocene: Ocena[];
    komentari: Komentar[];
    tagovi: Tag[];
    espb: number;
    opis: string;
    constructor(id: number, naziv:string, modul: Modul, semestar: number, ocene: Ocena[], tagovi: Tag[], espb: number, opis: string, komentari: Komentar[]){
        this.id = id;
        this.naziv = naziv;
        this.modul = modul;
        this.semestar = semestar;
        this.ocene = ocene;
        this.tagovi = tagovi;
        this.espb = espb;
        this.opis = opis;
        this.komentari = komentari;
    }

    srednjaOcena(): Ocena {
        let srednjaOcena: Ocena = new Ocena();
        let key: keyof Ocena;

        srednjaOcena = this.ocene.reduce((acc, currentOcena) => {
            for(key in currentOcena){
                acc[key] += currentOcena[key];
            }
            return acc;
        }, srednjaOcena);

        for(key in srednjaOcena){
            srednjaOcena[key] /= 5;
        }
        
        return srednjaOcena;
    }

    overallOcena(): number {
        let srednjaOcena = this.srednjaOcena();
        let key: keyof Ocena;
        let overall: number = 0;

        for(key in srednjaOcena){
            overall += srednjaOcena[key];
        }

        return overall / 5;
    }
}

export { Predmet }