import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartPageRoutingModule } from './cart-routing.module';

import { CartPage } from './cart.page';
import { ArticlesModule } from 'src/app/articles/articles.module';
import { CartItemComponent } from 'src/app/cart-item/cart-item.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticlesModule,
    CartPageRoutingModule,
    
  
  ],
  
  declarations: [CartPage, CartItemComponent],
  schemas:[NO_ERRORS_SCHEMA]
})
export class CartPageModule {}
