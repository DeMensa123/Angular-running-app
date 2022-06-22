import { Run } from "./run";
import { Stanica } from "./stanica";

export interface Stanovisko {
    id?: number;
    stanica?: Stanica;
    beh: Run;
    poradie: number;
    lekar: boolean;
    obcerstvenie: boolean;
    vzdialenostPredStanoviska: number;
    prevysenie: number;
}
