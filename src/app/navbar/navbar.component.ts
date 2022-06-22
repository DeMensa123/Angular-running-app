import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Tim } from '../tim';
import { TimService } from '../tim.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  tim$: Observable<Tim | undefined>;

  constructor(private timService: TimService, private router: Router) {
    this.tim$ = timService.onTimChange();
  }

  logout() {
    this.timService.logout()
    this.router.navigate(['/home']);
  }
}
