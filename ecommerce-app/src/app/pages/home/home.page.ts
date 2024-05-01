import { Component, OnInit } from '@angular/core';
import { MangaService } from '../../../services/manga.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  mangaList: any[] = [];


  constructor(private mangaService: MangaService) { }

  ngOnInit(): void {
    this.getMangaData();
  }

  getMangaData() {
    this.mangaService.getMangaData().subscribe(data => {
      this.mangaList = data;
    });
  }
}
