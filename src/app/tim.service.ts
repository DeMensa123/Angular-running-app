import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Tim } from './tim';

@Injectable({
  providedIn: 'root',
})
export class TimService {
  private timSubject = new BehaviorSubject<Tim | undefined>(undefined);

  private token: number | undefined;

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {
    this.token = localStorage.get('timId') || undefined;
    this.timSubject.next(localStorage.get('timSubject') || undefined);
  }

  getAll() {
    return this.http.get<Tim[]>('/api/v1/tim');
  }

  add(tim: Tim) {
    return this.http.post<Tim>('/api/v1/tim', tim);
  }

  delete(tim: Tim) {
    return this.http.delete<void>(`/api/v1/tim/${tim.id}`);
  }

  getToken() {
    return this.token;
  }

  loginTim(tim: Tim) {
    return this.http
      .post<Tim>('/api/v1/tim/login', tim)
      .pipe(
        map((tim) => {
          this.token = tim.id;
          this.localStorage.set('timId', this.token);
          if (!tim) {
            return undefined;
          }
          return tim;
        })
      )
      .pipe(
        tap((tim) => {
          this.timSubject.next(tim);
          this.localStorage.set('timSubject', this.get());
        })
      );
  }

  get() {
    return this.timSubject.getValue();
  }

  onTimChange() {
    return this.timSubject.asObservable();
  }

  logout() {
    this.localStorage.set('timId', undefined);
    this.localStorage.set('timSubject', undefined);
    this.timSubject.next(undefined);
  }
}
