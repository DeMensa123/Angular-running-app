import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prihlaska } from './prihlaska';

@Injectable({
  providedIn: 'root',
})
export class PrihlaskaService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Prihlaska[]>('/api/v1/prihlaska');
  }

  add(prihlaska: Prihlaska) {
    return this.http.post<Prihlaska>('/api/v1/prihlaska', prihlaska);
  }

  delete(prihlaska: Prihlaska) {
    return this.http.delete<void>(`/api/v1/prihlaska/${prihlaska.id}`);
  }
}
