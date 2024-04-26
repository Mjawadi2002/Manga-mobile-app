import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Observable, from, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private apiUrl = 'http://127.0.0.1:8000/';
  private tokenKey = 'token';
  
  constructor(
    private http: HttpClient,
    private storage: Storage
  ) { 
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
  }

  async getToken(): Promise<string | null> {
    await this.initStorage(); // Ensure storage is initialized
    return await this.storage.get(this.tokenKey);
  }
  signUp(userData: any): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/accounts/signup', userData);
  }

  
  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>('http://127.0.0.1:8000/accounts/login', body).pipe(
      tap((res: any) => {
        if (res.token) {
          this.storage.set(this.tokenKey, res.token).catch(error => console.error('Error storing token:', error));
        }
      }),
      catchError(this.handleError)
    );
  }
  
  isLoggedIn(): Promise<boolean> {
    return this.getToken().then(token => !!token);
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.error('Error object:', error);
    let errorMessage = 'Something bad happened; please try again later.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else if (error.status === 401) {
      errorMessage = 'Unauthorized. Please login again.';
      this.storage.remove(this.tokenKey).catch(error => console.error('Error removing token:', error));
    } else {
      errorMessage = `Backend returned code ${error.status}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  logout(): Observable<any> {
    return from(this.getToken()).pipe(
      switchMap(token => {
        if (!token) {
          return throwError('Token not found');
        }
        
        console.log('Token before logout:', token);
  
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
  
        return this.http.post<any>('http://127.0.0.1:8000/accounts/logout', {}, { headers }).pipe(
          switchMap(() => {
            // Remove the token from storage upon successful logout
            return from(this.storage.remove(this.tokenKey));
          }),
          catchError(this.handleError)
        );
      })
    );
  }
  
}
