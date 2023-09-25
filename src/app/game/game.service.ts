import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }
  private gameUrl = 'http://localhost:8085/game/add';



  post(data: any[]): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.gameUrl}`;

    return this.http.post<any>(url, data, { headers });
  }
}
