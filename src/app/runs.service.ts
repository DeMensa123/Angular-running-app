import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Run } from './run';

@Injectable({
  providedIn: 'root',
})
export class RunsService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Run[]>('/api/v1/beh');
  }

  get(id: number) {
    return this.http.get<Run>(`/api/v1/beh/${id}`);
  }

  add(run: Run) {
    return this.http.post<Run>('/api/v1/beh', run);
  }

  edit(run: Run) {
    return this.http.put<Run>(`/api/v1/beh/${run.id}`, run);
  }

  delete(run: Run) {
    return this.http.delete<void>(`/api/v1/beh/${run.id}`);
  }
}
