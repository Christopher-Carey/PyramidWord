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
  test2;
  WordList = []
  sorted = []
  printOut = []
  Word = {
    word: '',
    pyword: Boolean,
    printout: []
  }
  DbWord;


  constructor(private _apiService: ApiService) { }

  ngOnInit() {
    console.log(this.DbWord)
    this.getApisFromService()
    this.Word = {
      word: "",
      pyword: Boolean,
      printout: []
    }
    console.log(this.PyWord)

  }
  getApisFromService() {
    let observable = this._apiService.getApis();
    observable.subscribe(results => {
      console.log("yay", results)
      this.WordList = results['results']
      this._apiService.getApis()
    })
  }

  createApiFromService() {
    this.Word = {
      word: this.PyWord,
      pyword: this.test,
      printout: this.printOut
    }
    let observable = this._apiService.createApi(this.Word);
    observable.subscribe(results => {
      console.log("yay", results)
      this.Word = {
        word: this.PyWord,
        pyword: this.test,
        printout: this.printOut
      }
      // this.getApisFromService()
    })
  }
  CheckWord() {
    //Check database To see if it has been checked before
    for (var i = 0; i < this.WordList.length; i++) {
      if (this.WordList[i].word == this.PyWord) {
        this.DbWord = this.WordList[i]
        console.log(this.DbWord)
        return this.DbWord
      }
    }
    this.test;
    this.test2;
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
        this.test2 = false
        let x = this.sorted[i][1]
        this.printOut.push([])
        while (x != 0) {
          this.printOut[i].push(this.sorted[i][0])
          x--
        }
        // return false
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
    if(this.test2 == false){
      this.test = false
    }
    this.createApiFromService()
  }
}
