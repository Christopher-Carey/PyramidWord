import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'


@Component({
  selector: 'app-wordlist',
  templateUrl: './wordlist.component.html',
  styleUrls: ['./wordlist.component.css']
})
export class WordlistComponent implements OnInit {
  WordList=[]

  constructor(private _apiService: ApiService) { }

  ngOnInit() {
    this.getApisFromService()
  }
  getApisFromService(){
    let observable = this._apiService.getApis();
    observable.subscribe(results => {
      console.log("yay",results)
      this.WordList = results['results']
      this._apiService.getApis()
    })
  }

}
