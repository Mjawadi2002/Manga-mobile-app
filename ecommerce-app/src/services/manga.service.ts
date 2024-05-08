import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MangaService {
  private cartItems: any[] = [];
  constructor(private http: HttpClient) { }

  getMangaData(): Observable<any[]> {
    return this.http.get<any[]>('assets/articles.json');
  }  

  
  addToCart(article: any) {
    const payload = {
      name: article.name,
      price: article.price
      // Add other necessary fields
    };
    
    this.http.post('http://10.20.3.103:8000/article/add_to_cart/', payload).subscribe(response => {
      this.cartItems.push(article);
      console.log('Item added to cart');
    });
  }

  getCartItems(): Observable<any> {
    return this.http.get<any>('http://10.20.3.103:8000/article/get_cart_items/');
  }
}
