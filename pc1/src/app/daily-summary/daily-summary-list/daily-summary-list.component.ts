import { Input, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DailySummary, Practice } from '../../models';

@Component({
  selector: 'app-daily-summary-list',
  templateUrl: './daily-summary-list.component.html',
  styleUrls: ['./daily-summary-list.component.css']
})
export class DailySummaryListComponent implements OnInit {
	@Input() practice: Practice;
	@Input() dailySummaries: DailySummary;
	date = new FormControl(new Date());
	selectedDate = new Date();
  
  constructor() { }

  ngOnInit() {
    }

  dateFilter = (date: Date): boolean => {
  	const day = date.getDay()
    const month = date.getMonth()
  	return day !==0 && day !==6  && date.getDate() <= this.selectedDate.getDate() && month == this.selectedDate.getMonth();
  }

}
