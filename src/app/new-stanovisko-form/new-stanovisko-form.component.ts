import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Run } from '../run';
import { RunsService } from '../runs.service';
import { Stanica } from '../stanica';
import { StanicaService } from '../stanica.service';
import { Stanovisko } from '../stanovisko';
import { StanoviskoService } from '../stanovisko.service';
import { StanoviskoRunService } from '../stanovisko-run.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-stanovisko-form',
  templateUrl: './new-stanovisko-form.component.html',
  styleUrls: ['./new-stanovisko-form.component.scss'],
})
export class NewStanoviskoFormComponent {
  runs: Run[] | undefined;
  stanovisko = {} as Stanovisko;
  stanoviska: Stanovisko[] | undefined;
  stanice: Stanica[] | undefined;
  showForm: boolean = false;
  stanoviskoControl: boolean = false;
  run: Run | undefined;
  poradie: number = 0;
  closeResult: String | undefined;

  constructor(
    private runsService: RunsService,
    private stanicaService: StanicaService,
    private stanoviskoService: StanoviskoService,
    private router: Router,
    private stanoviskoRunService: StanoviskoRunService,
    private modalService: NgbModal
  ) {
    stanicaService.getAll().subscribe((value) => {
      this.stanice = value;
    });
    runsService.getAll().subscribe((value) => {
      this.runs = value;
    });
    this.reload();
  }

  reload() {
    this.stanoviskoService.getAll().subscribe((value) => {
      this.stanoviska = value.filter(
        (item) => item.beh.id === this.runs?.slice(-1)[0].id
      );
    });
  }

  onClickForm() {
    if (this.checkStanica(this.stanovisko?.stanica)?.length !== 0) {
      this.stanoviskoControl = true;
      return;
    }
    this.showForm = !this.showForm;
    this.stanoviskoControl = false;
  }

  checkStanica(stanica: Stanica | undefined) {
    return this.stanoviska?.filter(
      (item) => item.stanica?.nazov === stanica?.nazov
    );
  }

  addStanovisko(form: NgForm) {
    if (form.invalid) return;

    if (this.runs) {
      this.stanovisko.beh = this.runs.slice(-1)[0];

      if (this.stanoviska?.length === 0) {
        this.stanovisko.poradie = 1;
      } else {
        let stan = this.stanoviska?.slice(-1);
        if (stan) {
          this.stanovisko.poradie = stan[0].poradie + 1;
        }
      }

      if (this.stanoviska && this.stanoviska?.length > 0) {
        this.stanovisko.prevysenie = this.computePrevysenie();
        this.stanovisko.vzdialenostPredStanoviska = this.computeVzdialenost();
      }

      this.stanoviskoService.add(this.stanovisko).subscribe((response) => {
        this.reload();
        form.reset();
        this.onClickForm();
      });
    }
  }

  delete(stanovisko: Stanovisko) {
    this.stanoviskoService.delete(stanovisko).subscribe(() => {
      this.reload();
    });
  }

  checkStanovisko() {
    if (this.stanoviska) {
      if (this.stanoviska?.length < 2) {
        return;
      }
      this.router.navigate(['/behy']);
    }
  }

  computePrevysenie() {
    let actualVyska = this.stanovisko?.stanica?.vyska;
    let predVyska = this.stanoviska?.find(
      (s) => s.poradie === this.stanovisko?.poradie - 1
    )?.stanica?.vyska;

    if (!actualVyska || !predVyska) return 0;

    return actualVyska - predVyska;
  }

  computeVzdialenost() {
    let actualZD = this.stanovisko?.stanica?.zemDlzka;
    let actualZS = this.stanovisko?.stanica?.zemSirka;
    let predZD = this.stanoviska?.find(
      (s) => s.poradie === this.stanovisko?.poradie - 1
    )?.stanica?.zemDlzka;
    let predZS = this.stanoviska?.find(
      (s) => s.poradie === this.stanovisko?.poradie - 1
    )?.stanica?.zemSirka;

    if (!actualZD || !actualZS || !predZD || !predZS) return 0;
    return (
      ((actualZD + actualZS + predZD + predZS) / 4) * (Math.random() * 7 + 1)
    );
  }

  open(content: any, item: Stanovisko) {
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
