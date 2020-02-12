import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'


@Component({
  selector: 'app-checkword',
  templateUrl: './checkword.component.html',
  styleUrls: ['./checkword.component.css']
})
export class CheckwordComponent implements OnInit {
  PyWord = ''
  test;
  WordList =[]
  sorted = []
  printOut = []
  Word={
    word: '',
    pyword: Boolean
  }

  constructor(private _apiService: ApiService) { }

  ngOnInit() {
    this.getApisFromService()
    this.Word ={
      word: '',
      pyword: Boolean
    }
    console.log(this.PyWord)

  }

  getApisFromService(){
    let observable = this._apiService.getApis();
    observable.subscribe(results => {
      console.log("yay",results)
      this.WordList = results['results']
      this._apiService.getApis()
    })
  }
  ApiFromService(id){
    let observable = this._apiService.getApi(id);
    observable.subscribe(results => {
      console.log("yay",results)
      this.WordList = results['results']
      this._apiService.getApi(id)
    })
  }
  createApiFromService(){
    let observable = this._apiService.createApi(this.Word);
    observable.subscribe(results => {
      console.log("yay",results)
      this.Word={
        word:'',
        pyword:this.test
      }
      this.getApisFromService()
    })
  }





  getWords(){
    let observable = this._apiService.getApis();
    observable.subscribe(results => {
      console.log("yay",results)
      this.WordList = results['results']
      this._apiService.getApis()
    })
  }


  CheckWord() {
    this.test;
    this.sorted = []
    this.printOut = []
    let count = {}
    //Break string into letter count
    for (let i = 0; i < this.PyWord.length; i++) {
      if (count[this.PyWord[i]] == null) {
        count[this.PyWord[i]] = 1
      } else {
        count[this.PyWord[i]] = (count[this.PyWord[i]] + 1)
      }
    }
    //Make Array and sort it
    for (let x in count) {
      this.sorted.push([x, count[x]])
    }
    this.sorted.sort(function (a, b) { return (a[1] - b[1]) })
    //Go through array to see if it forms a pyramid
    let PyCount = 1
    for (let i = 0; i < this.sorted.length; i++) {
      if (this.sorted[i][1] != PyCount) {
        this.test = false
        let x = this.sorted[i][1]
        this.printOut.push([])
        while (x != 0) {
          this.printOut[i].push(this.sorted[i][0])
          x--
        }
        return false
      } else if (this.sorted[i][1] = PyCount) {
        this.test = true
        let x = this.sorted[i][1]
        this.printOut.push([])
        while (x != 0) {
          this.printOut[i].push(this.sorted[i][0])
          x--
        }
        PyCount++
      }
    }
  }
}
