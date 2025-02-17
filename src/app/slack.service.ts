
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SlackService {
  constructor(private http: HttpClient) {}

  notify(message: string) {
    return this.http.post('/api/slack-notify', { message });
  }
}