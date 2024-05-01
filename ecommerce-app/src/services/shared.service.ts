import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Observable, forkJoin, from, observable, throwError } from 'rxjs';

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

  async initStorage(): Promise<void> {
    // Initialize Ionic Storage if it hasn't been initialized yet
    await this.storage.create();
  }

  async getToken(): Promise<string> {
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

  async isLoggedIn(): Promise<boolean> {
    return await this.getToken().then(token => !!token);
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
    return new Observable(observer => {
      // Remove token from local storage
      this.storage.remove(this.tokenKey).then(() => {
        // Notify observers that logout was successful
        observer.next();
        observer.complete();
      }).catch(error => {
        observer.error(error); // Notify observers if an error occurs
      });
    });
  }

  getUser(): Observable<any> {
    return new Observable(observer => {
      this.storage.get('token').then(token => {
        if (token) {
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
          this.http.get('http://127.0.0.1:8000/accounts/getprofile', { headers }).subscribe(
            (response) => {
              observer.next(response); // Emit the response
              observer.complete(); // Complete the observable
            },
            (error) => {
              observer.error('Error fetching user profile'); // Emit an error
            }
          );
        } else {
          observer.error('Token not found'); // Emit an error if token is not found
        }
      });
    });
  }

  async showStorageContent() {
    try {
      await this.storage.create();
      const keys = await this.storage.keys();
      const content: Record<string, any> = {}; // Define type of content
      for (const key of keys) {
        const value = await this.storage.get(key);
        content[key] = value;
      }
      console.log('Ionic Storage Content:', content);
    } catch (error) {
      console.error('Error retrieving Ionic Storage content:', error);
    }
  }
  

 


}
