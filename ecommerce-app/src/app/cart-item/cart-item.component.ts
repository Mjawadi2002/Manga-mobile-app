import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent {
  @Input() mangaList: any[] = [];

  constructor(private http: HttpClient) { }

  buyItem(cartItemId: number) {
    this.http.post<any>('http://192.168.56.1/article/buy_item/' + cartItemId, {}).subscribe(
      (data: any) => {
        // Handle success
        console.log('Item bought:', data);
      },
      error => {
        console.error('Error buying item:', error);
      }
    );
  }

  deleteItem(cartItemId: number) {
    this.http.post<any>('http://192.168.56.1/article/delete_item/' + cartItemId, {}).subscribe(
      (data: any) => {
        // Handle success
        console.log('Item deleted:', data);
      },
      error => {
        console.error('Error deleting item:', error);
      }
    );
  }
  getCartItems() {
    this.http.get<any>('http://192.168.56.1/article/get_cart_items/').subscribe(
      (data: any) => {
        console.log(data); // Log the response to inspect its structure
        this.mangaList = data.cartItems; // Update according to the actual structure
      },
      error => {
        console.error('Error fetching cart items:', error);
      }
    );
  }
}
