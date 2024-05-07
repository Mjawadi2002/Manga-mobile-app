import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private apiUrl = 'http://127.0.0.1:8000/article'; // Replace 'your-api-url' with your actual API URL

  constructor(private http: HttpClient) { }

  // Add an article
  addArticle(articleData: any): void {
    this.http.post<any>(`${this.apiUrl}/add_article`, articleData)
      .subscribe(
        response => {
          console.log('Article added successfully:', response);
          // Optionally, perform any other actions upon success
        },
        error => {
          console.error('An error occurred while adding article:', error);
          // Optionally, perform any error handling or display error messages
        }
      );
  }

  // Delete an article
  deleteArticle(articleId: number): void {
    this.http.post<any>(`${this.apiUrl}/delete_article`, { id: articleId })
      .subscribe(
        response => {
          console.log('Article deleted successfully:', response);
          // Optionally, perform any other actions upon success
        },
        error => {
          console.error('An error occurred while deleting article:', error);
          // Optionally, perform any error handling or display error messages
        }
      );
  }

  // Edit an article
  editArticle(articleData: any): void {
    this.http.post<any>(`${this.apiUrl}/edit_article`, articleData)
      .subscribe(
        response => {
          console.log('Article edited successfully:', response);
          // Optionally, perform any other actions upon success
        },
        error => {
          console.error('An error occurred while editing article:', error);
          // Optionally, perform any error handling or display error messages
        }
      );
  }
}
