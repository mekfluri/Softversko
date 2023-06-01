import { Komentar } from "./komentar.model";
import { Modul } from "./modul.model";
import { Ocena } from "./ocena.model";
import { Tag } from "./tag.model";


class PredmetDto {
    naziv: string;
    modul: Modul;
    semestar: number;
    espb: number;
    opis: string;
    tagovi: Tag[];

    constructor(naziv?: string, modul?: Modul, semestar?: number, espb?: number, opis?: string, tagovi?: Tag[]){
        this.naziv = naziv || "";
        this.modul = modul || new Modul(0, "");
        this.semestar = semestar || 0;
        this.espb = espb || 0;
        this.opis = opis || "";
        this.tagovi = tagovi || [];
    }
}

class Predmet extends PredmetDto {
    id: number;
    ocene: Ocena[];
    komentari: Komentar[];
    constructor(id?: number, naziv?:string, modul?: Modul, semestar?: number, ocene?: Ocena[], tagovi?: Tag[], espb?: number, opis?: string, komentari?: Komentar[]){
        super(naziv, modul, semestar, espb, opis, tagovi);
        this.id = id || 0;
        this.ocene = ocene || [];
        this.komentari = komentari|| [];
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

export { Predmet, PredmetDto }