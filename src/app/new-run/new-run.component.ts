import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Run } from '../run';
import { Router } from '@angular/router';
import { RunsService } from '../runs.service';
import { Stanovisko } from '../stanovisko';
import { StanoviskoService } from '../stanovisko.service';
import { Stanica } from '../stanica';
import { StanicaService } from '../stanica.service';
import { StanoviskoRunService } from '../stanovisko-run.service';

@Component({
  selector: 'app-new-run',
  templateUrl: './new-run.component.html',
  styleUrls: ['./new-run.component.scss'],
})
export class NewRunComponent {
  run = {} as Run;
  stanovisko = {} as Stanovisko;
  stanice: Stanica[] | undefined;
  showForm: boolean = false;

  constructor(
    private runs: RunsService,
    private stanicaService: StanicaService,
    private stanoviskoService: StanoviskoService,
    private stanoviskoRunService: StanoviskoRunService,
    private router: Router
  ) {
    stanicaService.getAll().subscribe((value) => {
      this.stanice = value;
    });
  }

  submit(form: NgForm) {
    if (form.invalid) return;
    this.stanoviskoRunService.nextRun(this.run);

    this.runs.add(this.run).subscribe((response) => {
      this.router.navigate(['/stanoviska']);
    });
  }

  onClickForm() {
    this.showForm = !this.showForm;
  }
}
