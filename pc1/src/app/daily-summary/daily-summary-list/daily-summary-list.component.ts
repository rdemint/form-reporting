import { Input, Output, EventEmitter, Component, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DailySummary, Practice } from '../../models';

@Component({
  selector: 'app-daily-summary-list',
  templateUrl: './daily-summary-list.component.html',
  styleUrls: ['./daily-summary-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DailySummaryListComponent implements OnInit, OnChanges {
	@Input() practice: Practice;
	@Input() dailySummaries: DailySummary;
  @Output() addSummaryOutput = new EventEmitter<DailySummary>(); 
  @Output() putSummaryOutput = new EventEmitter<DailySummary>();

	selectedDateForm: FormControl;
  selectedDate: Date;
	today = new Date();
  
  constructor() { }

  ngOnInit() {
    console.log(this.practice.providers)
    this.selectedDate = this.setDate();
    this.selectedDateForm = new FormControl(this.today);
    this.selectedDateForm.valueChanges.subscribe((date)=> this.selectedDate = date);
    }

  dateFilter = (date: Date): boolean => {
  	const day = date.getDay()
    const month = date.getMonth()
  	return day !==0 && day !==6  && date.getDate() <= this.today.getDate() && month == this.today.getMonth();
  }

  addSummary(dailySummary) {this.addSummaryOutput.emit(dailySummary)}
  
  putSummary(dailySummary) {this.putSummaryOutput.emit(dailySummary)}

  setDate(){

    // This function ultimately determines the default date showed in the daily-summary-form
    //  It ensures that the default date is not Saturday or Sunday
    // If not either, it defaults the selectedDate to the current date.  
    let today = new Date();
    let day = today.getDay();
    if ( day == 0) {
      // Today is sunday
         let friday = new Date(today.setDate(today.getDate()-2));
         return friday;
      }
    
    else if (day == 6) {
      // Today is saturday
      let friday = new Date(today.setDate(today.getDate()-1));
      return friday;
    }

    else {
       return today;
      }
    }

   ngOnChanges(changes: SimpleChanges) {
  }

}
