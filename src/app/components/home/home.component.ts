import {Component, OnInit} from '@angular/core';
import {UtilsService} from '../../services/utils/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public utilsService: UtilsService) {
  }

  ngOnInit() {
  }

}
