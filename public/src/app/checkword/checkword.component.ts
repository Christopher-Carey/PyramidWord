import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'


@Component({
  selector: 'app-checkword',
  templateUrl: './checkword.component.html',
  styleUrls: ['./checkword.component.css']
})
export class CheckwordComponent implements OnInit {
  EnteredWord = ''
  Inputword = ''
  IfPyWordBool;
  WordList = []
  sorted = []
  printOut = []
  WordModel = {
    word: '',
    pyword: Boolean,
    printout: []
  }
  WordFromDb;
  StartTime;
  EndTime;
  RunTime;


  constructor(private _apiService: ApiService) { }

  ngOnInit() {
    console.log(this.WordFromDb)
    this.getApisFromService()
    this.WordModel = {
      word: "",
      pyword: Boolean,
      printout: []
    }
    console.log(this.Inputword)

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
    this.WordModel = {
      word: this.Inputword,
      pyword: this.IfPyWordBool,
      printout: this.printOut
    }
    let observable = this._apiService.createApi(this.WordModel);
    observable.subscribe(results => {
      console.log("yay", results)
      this.WordModel = {
        word: this.Inputword,
        pyword: this.IfPyWordBool,
        printout: this.printOut
      }
    })
    this.getApisFromService()
    this.EndTime = performance.now();
    console.log(this.EndTime)

    this.RunTime = this.EndTime - this.StartTime

  }
  CheckWord() {
    this.StartTime = performance.now();
    console.log(this.StartTime)
    this.Inputword = this.EnteredWord.toLowerCase();

    //Check database To see if it has been checked before
    for (var i = 0; i < this.WordList.length; i++) {
      if (this.WordList[i].word == this.Inputword) {
        this.WordFromDb = this.WordList[i]
        console.log(this.WordFromDb)
        this.EndTime = performance.now();
        console.log(this.EndTime)
        this.RunTime = this.EndTime - this.StartTime
        return this.WordFromDb
      }
    }
    this.IfPyWordBool;
    this.sorted = []
    this.printOut = []
    let count = {}
    //Break string into letter count
    for (let i = 0; i < this.Inputword.length; i++) {
      if (count[this.Inputword[i]] == null) {
        count[this.Inputword[i]] = 1
      } else {
        count[this.Inputword[i]] = (count[this.Inputword[i]] + 1)
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
      // console.log(PyCount)
      // console.log(this.sorted[i][1])
      if (this.sorted[i][1] != PyCount) {
        this.IfPyWordBool = false
        let x = this.sorted[i][1]
        this.printOut.push([])
        while (x != 0) {
          this.printOut[i].push(this.sorted[i][0])
          x--
        }
        PyCount = 100
      } else if (this.sorted[i][1] = PyCount) {
        this.IfPyWordBool = true
        let x = this.sorted[i][1]
        this.printOut.push([])
        while (x != 0) {
          this.printOut[i].push(this.sorted[i][0])
          x--
        }
        PyCount++
      }
    }
    this.createApiFromService()
  }
}
