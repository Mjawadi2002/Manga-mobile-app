import { Component, Input } from '@angular/core';
import { MangaService } from 'src/services/manga.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {
  @Input() article: any;
  @Input() isCartPage: boolean | undefined;
  cartItems: any;
  constructor(private mangaService : MangaService , private http:HttpClient , private snackBar: MatSnackBar , private router : Router) { }
  addToCart(article: any) {
    this.mangaService.addToCart(article);
    console.log('Item added to cart:', article);
  }

  // fetchCartItemId(): number | undefined {
  //   const cartItemId = localStorage.getItem('cartItemId');
  //   return cartItemId ? parseInt(cartItemId, 10) : undefined;
  // }
  
  

  buyItem(name: string) {
    // const url = this.router.createUrlTree(['http://10.20.3.103:8000/article/buy_item'], { queryParams: { cartItemId: cartItemId } }).toString();
  
    this.http.post<any>(`http://10.20.3.103:8000/article/buy_item/?name=${name}`, {}).subscribe(
      (data: any) => {
        // Handle success
        console.log('Item bought:', data);
        // Display a success message
        this.snackBar.open('Item bought successfully!', 'Close', {
          duration: 2000, // Duration in milliseconds
        });
      },
      error => {
        console.error('Error buying item:', error);
      }
    );
  }
  
  
  deleteItem(cartItemId: number) {
    this.http.delete<any>(`http://10.20.3.103:8000/article/delete_item/?cartItemId=${cartItemId}`).subscribe(
      (data: any) => {
        // Handle success
        console.log('Item deleted:', data);
        // Filter out the deleted item from the cartItems array if it exists
        if (this.cartItems) {
          this.cartItems = this.cartItems.filter((item: { cartItemId: number; }) => item.cartItemId !== cartItemId);
        }
      },
      error => {
        console.error('Error deleting item:', error);
      }
    );
  }
  
  
  

}
