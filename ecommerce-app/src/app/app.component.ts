import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})


export class AppComponent implements OnInit {
  client: string = 'connected';
  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.showStorageContent();
  }

}