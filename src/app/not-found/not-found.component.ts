import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent implements OnInit {

  constructor(private title: Title) { 
    this.title.setTitle('Page Not Found');
  }

  ngOnInit() {
  }

}
