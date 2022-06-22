import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Prihlaska } from '../prihlaska';
import { PrihlaskaService } from '../prihlaska.service';
import { Run } from '../run';
import { RunsService } from '../runs.service';
import { Tim } from '../tim';
import { TimService } from '../tim.service';

@Component({
  selector: 'app-new-prihlaska',
  templateUrl: './new-prihlaska.component.html',
  styleUrls: ['./new-prihlaska.component.scss'],
})
export class NewPrihlaskaComponent implements OnInit {
  runs: Run[] | undefined;
  tim: Tim | undefined;
  prihlaska = {} as Prihlaska;
  prihlasky: Prihlaska[] | undefined;
  price: number = 0;
  tim$: Observable<Tim | undefined>;

  constructor(
    private runsService: RunsService,
    private timService: TimService,
    private prihlaskaService: PrihlaskaService,
    private router: Router
  ) {
    runsService.getAll().subscribe((value) => {
      this.runs = value;
    });

    prihlaskaService.getAll().subscribe((value) => {
      this.prihlasky = value;
    });
    this.tim$ = timService.onTimChange();
    this.tim$.subscribe((value) => {
      if (value) this.prihlaska.tim = value;
    });
  }

  ngOnInit(): void {}

  countPrice() {
    if (
      this.prihlaska.beh?.zakladnaCenaBehu &&
      this.prihlaska.pocetClenovTimu
    ) {
      this.prihlaska.celkovaCena = 0;
      this.prihlaska.celkovaCena =
        this.prihlaska.beh.zakladnaCenaBehu * this.prihlaska.pocetClenovTimu;
      this.prihlaska.celkovaCena += this.prihlaska.batozina
        ? this.prihlaska.beh.cenaBatozina
        : 0;
    }
    return this.price;
  }

  checkDuplicates() {
    if (
      this.prihlaska.beh &&
      this.prihlasky?.find((p) => p.beh.id === this.prihlaska.beh.id)
    ) {
      return true;
    }
    return false;
  }

  submit(ngForm: NgForm) {
    if (this.prihlaska.pocetClenovTimu > 5) return;

    if (this.checkDuplicates()) return;

    if (
      this.prihlaska.beh.kapacita -
        this.prihlaska.beh.prihlaseni -
        this.prihlaska.pocetClenovTimu <
      0
    )
      return;

    this.prihlaskaService.add(this.prihlaska).subscribe((response) => {
      this.router.navigate(['/']);
    });

    this.prihlaska.beh.prihlaseni =
      this.prihlaska.beh.prihlaseni + this.prihlaska.pocetClenovTimu;

    this.runsService.edit(this.prihlaska.beh).subscribe();
  }
}
