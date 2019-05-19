import { Input, Component, Output, ViewChild, ElementRef, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DailySummary, Practice, Provider } from '../../models';

@Component({
  selector: 'app-daily-summary',
  templateUrl: './daily-summary.component.html',
  styleUrls: ['./daily-summary.component.css']
})
export class DailySummaryComponent implements OnInit, OnChanges {
	@Input() practice: Practice;
	@Input() dailySummaries: DailySummary[];
	@Input() provider: Provider;
	@Input() selectedDate: Date;
  @Output() addSummaryOutput = new EventEmitter<DailySummary>();
  @Output() putSummaryOutput = new EventEmitter<DailySummary>(); 
  dailySummary: DailySummary;
  dailySummaryExists: boolean = true;
  editing: boolean = false;
  dailySummaryDisabled: boolean = false;

  constructor() { }

  ngOnInit() { 
  }



  findSummary(): void {
    // Responsible for finding the DailySummary object to that will be used to populate form fields.  
    // Sets default object if none is found so the form doesn't throw undefined errors.
        this.dailySummary = this.dailySummaries.find(
          (summary)=> {
            if (summary.practice == this.practice.name && summary.provider == this.provider.id && summary.date == this.selectedDate.toISOString().slice(0,10)) {
              return true
            }
          }
        );
        if (this.dailySummary == undefined)
          {
            this.dailySummary = {id: null, practice: null, provider: null, visits: null, noshows: null, workdays: null, date: null, specialty: null};
        }
  }


  summaryIsDisabled (): void {
    if (this.dailySummaryExists == true && this.editing == true) {
      this.dailySummaryDisabled = false;
    }
    else if (this.dailySummaryExists == true && this.editing == false) {
      this.dailySummaryDisabled  = true;
    }
    else if (this.dailySummaryExists== false) {
      this.dailySummaryDisabled = false;
    }
  }

  summaryExists(): void {
    if (this.dailySummary['date'] == null) {
      this.dailySummaryExists = false;
    }

    else {
      this.dailySummaryExists = true;
    }
  }

  addSummary(dailySummary) {
    this.dailySummaryExists = true;
    this.addSummaryOutput.emit(dailySummary)}

  putSummary(dailySummary) {
    this.editing = false;
    this.summaryIsDisabled();
    this.putSummaryOutput.emit(dailySummary);
  }

  setEditing(bool) {
    this.editing = bool;
    this.summaryIsDisabled();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedDate']) {
      this.editing = false;
      this.findSummary(); 
      this.summaryExists();
      this.summaryIsDisabled();
    }

    if(changes['dailySummaries']) {
      this.findSummary();
      this.summaryExists();
      this.summaryIsDisabled();
    }
  }




}
