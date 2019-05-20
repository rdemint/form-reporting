import { Input, Component, Output, ViewChild, ChangeDetectionStrategy, ElementRef, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DailySummary, Practice, Provider } from '../../models';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-daily-summary',
  templateUrl: './daily-summary.component.html',
  styleUrls: ['./daily-summary.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DailySummaryComponent implements OnInit, OnChanges {
	@Input() practice: Practice;
	@Input() dailySummaries: DailySummary[];
	@Input() provider: Provider;
	@Input() selectedDate: Date;
  @Output() addSummaryOutput = new EventEmitter<DailySummary>();
  @Output() putSummaryOutput = new EventEmitter<DailySummary>(); 
  nullDailySummary: DailySummary = {id: null, practice: null, provider: null, visits: null, noshows: null, workdays: null, date: null, specialty: null};
  dailySummary: DailySummary;
 

  dailySummaryExists: boolean = false;
  editing: boolean = false;
  dailySummaryDisabled: boolean = false;

  // Refactor
  providerDailySummaries = {}; 
  providerSpecialtiesForm: FormControl;
// 
  constructor() { }

  ngOnInit() {  }

// 
  findSummaries() {
    this.dailySummaryExists = false;
    let specialties = this.provider.specialties;
    for (let i = 0; i < specialties.length; i++) {
      let summary = this.dailySummaries.filter((summary)=> {
           if (
             summary.practice == this.practice.name && 
             summary.provider == this.provider.id && 
             summary.date == this.selectedDate.toISOString().slice(0,10) &&
             summary.specialty == specialties[i]
             ) 
               {return true }
            else 
              { return false}
            })[0];
      this.providerDailySummaries[specialties[i]] = this.summaryOrNull(summary);
    }
  }

  summaryOrNull(summary) {
    if (summary == undefined) {
      return this.nullDailySummary;
    }

    else {
      this.dailySummaryExists = true; 
      return summary }
  }

  addSummary(dailySummary) {
    this.dailySummaryExists = true;
    this.addSummaryOutput.emit(dailySummary)}

  putSummary(dailySummary) {
    this.editing = false;
    this.putSummaryOutput.emit(dailySummary);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedDate'] || changes['dailySummaries']) {
      this.findSummaries(); 
    }
  }




}
