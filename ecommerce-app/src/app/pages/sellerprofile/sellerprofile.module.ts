import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SellerprofilePageRoutingModule } from './sellerprofile-routing.module';

import { SellerprofilePage } from './sellerprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SellerprofilePageRoutingModule
  ],
  declarations: [SellerprofilePage]
})
export class SellerprofilePageModule {}
