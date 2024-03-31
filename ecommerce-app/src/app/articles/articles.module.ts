import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ArticleComponent } from '../article/article.component';



@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
    ArticleComponent
  ]
})
export class ArticlesModule { }
