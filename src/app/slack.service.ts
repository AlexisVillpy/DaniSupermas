import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SlackService {
  private apiUrl = 'http://localhost:4000/sendSlackMessage'; // Cambiar la URL a tu backend

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<any> {
    const payload = { message };
    return this.http.post(this.apiUrl, payload);
  }
}
