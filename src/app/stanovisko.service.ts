import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stanovisko } from './stanovisko';

@Injectable({
  providedIn: 'root'
})
export class StanoviskoService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Stanovisko[]>('/api/v1/stanovisko')
  }

  add(stanovisko: Stanovisko) {    
    return this.http.post<Stanovisko>('/api/v1/stanovisko', stanovisko)
  } 

  delete(stanovisko: Stanovisko) {    
    return this.http.delete<void>(`/api/v1/stanovisko/${stanovisko.id}`)
  } 
}
