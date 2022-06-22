import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stanica } from './stanica';

@Injectable({
  providedIn: 'root'
})
export class StanicaService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Stanica[]>('/api/v1/stanica')
  }  
}
