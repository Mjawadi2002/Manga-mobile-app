import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellerprofilePage } from './sellerprofile.page';

const routes: Routes = [
  {
    path: '',
    component: SellerprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerprofilePageRoutingModule {}
