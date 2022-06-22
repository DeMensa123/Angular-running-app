import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Run } from './run';

@Injectable({
  providedIn: 'root',
})
export class StanoviskoRunService {
  run = new BehaviorSubject<Run | undefined>(undefined);
  constructor() {}

  nextRun(run: Run) {
    this.run?.next(run);
  }
}
