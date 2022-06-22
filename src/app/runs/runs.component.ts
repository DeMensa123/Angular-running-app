import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs';
import { Prihlaska } from '../prihlaska';
import { PrihlaskaService } from '../prihlaska.service';
import { Run } from '../run';
import { RunsService } from '../runs.service';
import { Stanovisko } from '../stanovisko';
import { StanoviskoRunService } from '../stanovisko-run.service';
import { StanoviskoService } from '../stanovisko.service';
import { Tim } from '../tim';
import { TimService } from '../tim.service';

@Component({
  selector: 'app-runs',
  templateUrl: './runs.component.html',
  styleUrls: ['./runs.component.scss'],
})
export class RunsComponent implements OnInit {
  runs: Run[] | undefined;
  prihlasky: Prihlaska[] | undefined;
  stanoviska: Stanovisko[] | undefined;
  closeResult: String | undefined;

  private tim: Tim | undefined;

  constructor(
    private timService: TimService,
    private runsService: RunsService,
    private stanoviskoService: StanoviskoService,
    private localStorage: LocalStorageService,
    private stanoviskoRunService: StanoviskoRunService,
    private prihlaskaService: PrihlaskaService,
    private modalService: NgbModal
  ) {
    this.reload();
    timService.onTimChange().subscribe((value) => {
      this.tim = value;
    });
    stanoviskoService.getAll().subscribe((value) => {
      this.stanoviska = value;
    });
    prihlaskaService.getAll().subscribe((value) => {
      this.prihlasky = value;
    });
  }

  ngOnInit(): void {}

  reload() {
    this.runsService.getAll().subscribe((value) => {
      this.runs = value;
    });
  }

  saveRun(id: number | undefined) {
    let beh = this.runs?.find((run) => run.id === id);
    if (beh) this.stanoviskoRunService.nextRun(beh);
    this.localStorage.set('behId', beh?.id);
  }

  delete(run: Run) {
    if (this.tim && this.tim?.nazov !== 'admin') return;

    this.stanoviska
      ?.filter((s) => s.beh.id === run.id)
      .forEach((s) => this.stanoviskoService.delete(s).subscribe());

    this.prihlasky
      ?.filter((p) => p.beh.id === run.id)
      .forEach((p) => this.prihlaskaService.delete(p).subscribe());

    this.runsService.delete(run).subscribe(() => {
      this.reload();
    });
  }

  countObcerstvenie(run: Run) {
    return this.stanoviska?.filter((s) => s.beh.id === run.id && s.obcerstvenie)
      .length;
  }

  countLekar(run: Run) {
    return this.stanoviska?.filter((s) => s.beh.id === run.id && s.lekar)
      .length;
  }

  countPrevysenie(run: Run) {
    return this.stanoviska
      ?.filter((s) => s.beh.id === run.id)
      .reduce((prev, curr) => prev + curr.prevysenie, 0);
  }

  countVzdialenost(run: Run) {
    return this.stanoviska
      ?.filter((s) => s.beh.id === run.id)
      .reduce((prev, curr) => prev + curr.vzdialenostPredStanoviska, 0);
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
