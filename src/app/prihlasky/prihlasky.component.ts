import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Prihlaska } from '../prihlaska';
import { PrihlaskaService } from '../prihlaska.service';
import { Run } from '../run';
import { RunsService } from '../runs.service';
import { StanoviskoRunService } from '../stanovisko-run.service';
import { StanoviskoService } from '../stanovisko.service';
import { Tim } from '../tim';
import { TimService } from '../tim.service';

@Component({
  selector: 'app-prihlasky',
  templateUrl: './prihlasky.component.html',
  styleUrls: ['./prihlasky.component.scss'],
})
export class PrihlaskyComponent implements OnInit {
  prihlasky: Prihlaska[] | undefined;
  private tim: Tim | undefined;

  constructor(
    private timService: TimService,
    private prihlaskaService: PrihlaskaService
  ) {
    timService.onTimChange().subscribe((value) => {
      this.tim = value;
    });
    this.reload();
  }

  ngOnInit(): void {}

  reload() {
    this.prihlaskaService.getAll().subscribe((value) => {
      if (this.tim?.nazov !== 'admin')
        this.prihlasky = value.filter((p) => p.tim.id === this.tim?.id);
      else {
        this.prihlasky = value;
      }
    });
  }

  delete(prihlaska: Prihlaska) {
    this.prihlaskaService.delete(prihlaska).subscribe(() => this.reload());
  }
}
