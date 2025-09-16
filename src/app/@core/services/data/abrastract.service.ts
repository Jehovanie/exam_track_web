import { inject } from '@angular/core';
import { environment } from '../../../../environements/environement';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export abstract class AbstractService {
  private baseUrl = environment.SERVER_URL;

  private http: HttpClient = inject(HttpClient);

  private getToken(): string {
    return localStorage.getItem('authToken') || '';
  }

  public GET<T>(endpoint: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json',
    });
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, { headers });
  }

  public POST<T>(endpoint: string, body: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json',
    });

    return this.http.post<T>(`${this.baseUrl}${endpoint}`, body, { headers });
  }
}
