import { Ocena } from "./ocena.model";
import { Tag } from "./tag.model";

class Preference {
    id: number;
    tag: Tag;
    ocena: number;

    constructor(id?: number, tag?: Tag, ocena?: number){
        this.id = id || 0;
        this.tag = tag || new Tag(0, "");
        this.ocena = ocena || 1;
    }
}

export { Preference }