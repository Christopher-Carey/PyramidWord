import { Component, OnInit } from '@angular/core';
import { createWorker } from 'tesseract.js';
import { CheckwordComponent } from '../checkword/checkword.component';
import { ApiService } from '../api.service'




@Component({
  selector: 'app-readimage',
  templateUrl: './readimage.component.html',
  styleUrls: ['./readimage.component.css']
})
export class ReadimageComponent implements OnInit {
  TextOutput;
  File;
  TextArry;
  Inputword = ''
  EnteredWord= ''
  IfPyWordBool;
  sorted = []
  printOut = []
  WordModel = {
    word: '',
    pyword: Boolean,
    printout: []
  }
  spinner = false;
  WordList = []

  constructor(
    private checkword:CheckwordComponent,
    private _apiService: ApiService
  ) { }

  ngOnInit() {
    this.WordModel = {
      word: '',
      pyword: Boolean,
      printout: []
    }


  }

  Upload(event){
    this.File = event.target.files[0]
    console.log(event)
  }


  test() {
    this.spinner = true
    const worker = createWorker({
      logger: m => console.log(m)
    });

    (async () => {
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data: { text } } = await worker.recognize(this.File);
      this.TextOutput = text
      this.TextArry = text.split(" ")
      console.log(this.TextArry)

      console.log(text);
      await worker.terminate();
      this.spinner = false

    })();

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
      this.WordList.push(results)
      console.log("this",this.WordList)
      // this.WordModel = {
      //   word: this.Inputword,
      //   pyword: this.IfPyWordBool,
      //   printout: this.printOut
      // }
    })
    // this.getApisFromService()
    // this.EndTime = performance.now();
    // console.log(this.EndTime)

    // this.RunTime = this.EndTime - this.StartTime

  }
  CheckWord() {
    // this.StartTime = performance.now();
    // console.log(this.StartTime)
    for(let i = 0; i < this.TextArry.length;i++){
        this.EnteredWord = this.TextArry[i]
        this.Inputword = this.EnteredWord.toLowerCase();
    
        //Check database To see if it has been checked before
    
        // for (var i = 0; i < this.WordList.length; i++) {
        //   if (this.WordList[i].word == this.Inputword) {
        //     this.WordFromDb = this.WordList[i]
        //     console.log(this.WordFromDb)
        //     // this.EndTime = performance.now();
        //     // console.log(this.EndTime)
        //     // this.RunTime = this.EndTime - this.StartTime
        //     return this.WordFromDb
        //   }
        // }
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
}
