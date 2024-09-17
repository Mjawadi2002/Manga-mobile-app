import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/services/article.service';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.page.html',
  styleUrls: ['./seller.page.scss'],
})
export class SellerPage implements OnInit {
  userData : any;
  constructor(private articleService: ArticleService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.getUser()
  }

  addArticle(articleData: any): any {
    // Call the addArticle method from the ArticleService
    this.articleService.addArticle(articleData)
      
        
      
  }

  deleteArticle(articleId: number): void {
    // Call the deleteArticle method from the ArticleService
    this.articleService.deleteArticle(articleId)
      
  }

  editArticle(articleData: any): void {
    // Call the editArticle method from the ArticleService
    this.articleService.editArticle(articleData)
      
  }

  // Other methods related to seller-specific functionalities can be added here
}
