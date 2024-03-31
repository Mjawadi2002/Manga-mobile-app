import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ArticleComponent } from 'src/app/article/article.component';
import { PromotionsComponent } from 'src/app/promotions/promotions.component';
import { FooterComponent } from 'src/app/footer/footer.component';
import { InfoComponent } from 'src/app/info/info.component';
import { ArticlesModule } from 'src/app/articles/articles.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticlesModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage,PromotionsComponent,InfoComponent]
})
export class HomePageModule {}
