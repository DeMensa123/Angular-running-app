import { Component, OnInit } from '@angular/core';
import { Run } from '../run';
import { RunsService } from '../runs.service';
import { Stanica } from '../stanica';
import { StanicaService } from '../stanica.service';
import { Stanovisko } from '../stanovisko';
import { StanoviskoRunService } from '../stanovisko-run.service';
import { StanoviskoService } from '../stanovisko.service';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-stanoviska',
  templateUrl: './stanoviska.component.html',
  styleUrls: ['./stanoviska.component.scss'],
})
export class StanoviskaComponent implements OnInit {
  runs: Run[] | undefined;
  stanovisko = {} as Stanovisko;
  stanoviska: Stanovisko[] | undefined;
  stanice: Stanica[] | undefined;
  showForm: boolean = false;
  run: Run | undefined;

  constructor(
    private runsService: RunsService,
    private stanicaService: StanicaService,
    private stanoviskoService: StanoviskoService,
    private stanoviskoRunService: StanoviskoRunService,
    private localStorage: LocalStorageService
  ) {
    stanicaService.getAll().subscribe((value) => {
      this.stanice = value;
    });
    runsService.getAll().subscribe((value) => {
      this.runs = value;
    });
    runsService.get(localStorage.get('behId')).subscribe((value) => {
      this.run = value || undefined;
    });
    this.reload();
  }

  reload() {
    this.stanoviskoService.getAll().subscribe((value) => {
      this.stanoviska = value.filter((item) => item.beh.id === this.run?.id);
    });
  }

  ngOnInit() {
    this.stanoviskoRunService.run?.subscribe((r) => (this.run = r));
  }

  delete(stanovisko: Stanovisko) {
    this.stanoviskoService.delete(stanovisko).subscribe(() => {
      this.reload();
    });
  }
}
