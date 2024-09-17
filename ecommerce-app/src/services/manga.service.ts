import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MangaService {

  constructor(private http: HttpClient) { }

  getMangaData(): Observable<any[]> {
    return this.http.get<any[]>('assets/articles.json');
  }  
}
