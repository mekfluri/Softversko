class Ocena {
    id: number;
    dostupnostMaterijala: number;
    angazovanjeProfesora: number;
    laboratorijskeVezbe: number;
    tezinaPredmeta: number;
    prakticnoZnanje: number;
    constructor(id?: number, dostpunost?: number, angazovanje?: number, lab?: number, tezina?: number, prakticno?: number){
        this.id = id || 0;
        this.dostupnostMaterijala = dostpunost || 0;
        this.angazovanjeProfesora = angazovanje || 0;
        this.laboratorijskeVezbe = lab || 0;
        this.tezinaPredmeta = tezina || 0;
        this.prakticnoZnanje = prakticno || 0;
    }
}

export { Ocena }