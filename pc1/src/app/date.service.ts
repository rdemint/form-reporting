import { Injectable, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DateService implements OnInit {
	selected_month$ = new BehaviorSubject<string>(null);
  	selected_year$ = new BehaviorSubject<string>(null);

  	YEAR_OPTIONS: string[] = ["2018", "2019"];
  	MONTH_OPTIONS: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  	httpDateParams$ = new BehaviorSubject<HttpParams>(null);

  constructor() { 
  }

  ngOnInit() {
  	let default_month = (new Date().getMonth()+1).toString();
  	let default_year = (new Date().getFullYear()).toString();

  	console.log('date.service is here');
  	this.selected_month$.next(default_month);
    this.selected_year$.next(default_year);

	combineLatest(
		this.selected_year$.asObservable(),
		this.selected_month$.asObservable())
		.subscribe(
			([year, month])=> {
				let httpDateParams = new HttpParams()
					.append('year', year)
					.append('month', month);
				this.httpDateParams$.next(httpDateParams);
			})
  	}


	loadMonth() {
		return this.selected_month$.asObservable(); 
	}

	loadYear() {
		return this.selected_year$.asObservable();
	}

	loadHttpDateParams() {
		console.log(this.httpDateParams$.asObservable());
		return this.httpDateParams$.asObservable();
	}

}