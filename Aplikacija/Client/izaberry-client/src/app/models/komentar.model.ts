import { Predmet } from "./predmet.model";

class Komentar {
    id: number;
    predmet: Predmet;
    text: string;

    constructor(id: number, predmet: Predmet, text: string) {
        this.id = id;
        this.predmet = predmet;
        this.text = text;
    }
}

export { Komentar }