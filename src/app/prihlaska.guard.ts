import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Tim } from './tim';
import { TimService } from './tim.service';

@Injectable({
  providedIn: 'root',
})
export class PrihlaskaGuard implements CanActivate {
  private tim: Tim | undefined;

  constructor(private timService: TimService, private router: Router) {
    timService.onTimChange().subscribe((value) => {
      this.tim = value;
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.tim && this.tim?.nazov !== 'admin'
      ? true
      : this.router.parseUrl('/login');
  }
}
