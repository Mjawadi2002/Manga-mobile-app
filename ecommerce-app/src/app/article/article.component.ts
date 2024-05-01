import { Component, Input } from '@angular/core';
import { Article } from '../article.model';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {

  @Input() article!: Article;
  cartData: any[] = []; // Initialize an empty array to store cart data

  constructor(private articleService: ArticleService) { }

  addToCart(articleId: number): void {
    this.articleService.addToCart(articleId).subscribe(
      response => {
        console.log('Article added to cart successfully');
        // Push the added article to the cartData array
        this.cartData.push(response); // Assuming response contains the added article data
      },
      error => {
        console.error('Error adding article to cart:', error);
      }
    );
  }

}
