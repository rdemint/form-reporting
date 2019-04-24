import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {
	selected_month = new BehaviorSubject<string>(null);
  	selected_year = new BehaviorSubject<string>(null);
  	month = (new Date().getMonth()+1).toString();
  	year = new Date().getFullYear().toString();

  constructor() {
  	this.selected_month.next(this.month);
    this.selected_year.next(this.year);
    }


	getMonth() {
		return this.selected_month.asObservable(); 
	}

	getYear() {
		return this.selected_year.asObservable();
	}

	getQueryDateParams() {
		return { queryParams: {
			year: this.selected_year,
			month: this.selected_month
		}}
	}

}