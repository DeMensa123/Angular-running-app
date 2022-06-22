import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Tim } from '../tim';
import { TimService } from '../tim.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  tim = {} as Tim;
  loginErrorMsg: String | undefined;

  constructor(private timService: TimService, private router: Router) {}

  ngOnInit(): void {}

  submit(form: NgForm) {
    if (form.invalid) return;

    try {
      this.timService.loginTim(this.tim).subscribe({
        next: (res) => {
          this.router.navigate(['/home']);
        },
        error: (e) => {
          this.loginErrorMsg = 'Zadali ste nesprávne meno alebo heslo !';
        },
        complete: () => {},
      });
    } catch (err) {
      this.loginErrorMsg = 'Zadali ste nesprávne meno alebo heslo !';
    }
  }
}
