import { Predmet } from "./predmet.model";

class ValueType {
    first: Predmet | null;
    second: number | null;

    constructor(first?: Predmet, second?: number){
        this.first = first || null;
        this.second = second || null;
    }
}

class QuizResponse {
    key: number | null;
    value: ValueType | null;

    constructor(key?: number, value?: ValueType){
        this.key = key || null;
        this.value = value || null;
    }
}

export { QuizResponse, ValueType }