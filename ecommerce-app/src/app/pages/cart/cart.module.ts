import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartPageRoutingModule } from './cart-routing.module';

import { CartPage } from './cart.page';
import { ArticlesModule } from 'src/app/articles/articles.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticlesModule,
    CartPageRoutingModule,
    
  
  ],
  declarations: [CartPage]
})
export class CartPageModule {}
