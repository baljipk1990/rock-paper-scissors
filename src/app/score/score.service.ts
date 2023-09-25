import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor( private http:HttpClient) { }
  getAll(){
    return this.http.get('http://localhost:8085/game');
  }
}
