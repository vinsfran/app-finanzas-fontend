import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-content-header',
  templateUrl: './content-header.component.html',
  styleUrls: ['./content-header.component.css']
})
export class ContentHeaderComponent implements OnInit {

  @Input() titulo: string;
  @Input() lista: string[];


  constructor() {
  }

  ngOnInit() {

  }

}
