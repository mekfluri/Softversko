import { Tag } from "./tag.model";

class PredmetSearch {
    naziv: string | null;
    tag: Tag | null;
    semestar: number | null;
    constructor(naziv?: string, tag?: Tag, semestar?: number){
        this.naziv = naziv || null;
        this.tag = tag || null;
        this.semestar = semestar || null;
    }
}

export { PredmetSearch }