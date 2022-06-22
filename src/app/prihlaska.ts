import { Run } from "./run";
import { Tim } from "./tim";

export interface Prihlaska {
    id?: number;
    tim: Tim;
    beh: Run;
    celkovaCena: number;
    pocetClenovTimu: number;
    batozina: boolean;
}
