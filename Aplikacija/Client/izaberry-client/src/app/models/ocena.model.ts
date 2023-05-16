class Ocena {
    id: number;
    dostupnostMaterijala: number;
    angazovanjeProfesora: number;
    laboratorijskeVezbe: number;
    tezinaPredmeta: number;
    prakticnoZnanje: number;
    constructor(id: number, dostpunost: number, angazovanje: number, lab: number, tezina: number, prakticno: number){
        this.id = id;
        this.dostupnostMaterijala = dostpunost;
        this.angazovanjeProfesora = angazovanje;
        this.laboratorijskeVezbe = lab;
        this.tezinaPredmeta = tezina;
        this.prakticnoZnanje = prakticno;
    }
}

export { Ocena }