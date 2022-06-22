import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Tim } from '../tim';
import { TimService } from '../tim.service';

@Component({
  selector: 'app-registracia',
  templateUrl: './registracia.component.html',
  styleUrls: ['./registracia.component.scss'],
})
export class RegistraciaComponent implements OnInit {
  tim = {} as Tim;

  constructor(private timService: TimService, private router: Router) {}

  ngOnInit(): void {}

  submit(form: NgForm) {
    if (form.invalid) return;

    this.timService.add(this.tim).subscribe((value) => {
      if (value) {
        this.router.navigate(['/']);
      }
    });
  }
}
