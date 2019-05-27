import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-pagare',
  templateUrl: './pagare.component.html',
  styleUrls: ['./pagare.component.css']
})
export class PagareComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  printToCart(printSectionId: string) {
    let popupWinindow;
    // let innerContents = document.getElementById(printSectionId).innerHTML;
    let innerContents = 'fhskasdkfhll';
    popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    popupWinindow.document.open();
    popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
    popupWinindow.document.close();
  }

}
