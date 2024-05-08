import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MangaService } from 'src/services/manga.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartItems: any[] = [];

  constructor(private http: HttpClient , private mangaService : MangaService) { }

  ngOnInit() {
    this.getCartItems();
  }

  getCartItems() {
    this.mangaService.getCartItems().subscribe(
      (data: any) => {
        console.log(data); // Log the response to inspect its structure
        this.cartItems = data.cart_items; // Update according to the actual structure
      },
      error => {
        console.error('Error fetching cart items:', error);
      }
    );
  }
  
}
