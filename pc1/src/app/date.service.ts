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
  	default_month = (new Date().getMonth()+1).toString();
  	default_year = new Date().getFullYear().toString();
  	YEAR_OPTIONS: string[] = ["2018", "2019"];
  	MONTH_OPTIONS: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  	httpParams: Observable<HttpParams>;

  constructor() { }

  ngOnInit() {
  	this.selected_month$.next(this.default_month);
    this.selected_year$.next(this.default_year);
	this.httpParams = combineLatest(
		this.selected_year$.asObservable(),
		this.selected_month$.asObservable())
		.pipe(
			map(([year, month])=> {
				return new HttpParams()
					.append('year', year)
					.append('month', month)
			})
		);
  }


	getMonth() {
		return this.selected_month$.asObservable(); 
	}

	getYear() {
		return this.selected_year$.asObservable();
	}

	getHttpParams() {
		return this.httpParams;
	}

}