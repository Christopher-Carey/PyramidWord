import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkword',
  templateUrl: './checkword.component.html',
  styleUrls: ['./checkword.component.css']
})
export class CheckwordComponent implements OnInit {
  test = true
  PyWord = ''

  constructor() { }

  ngOnInit() {
    console.log(this.PyWord)

  }
  CheckWord(){
    console.log(this.PyWord)


  }

}
