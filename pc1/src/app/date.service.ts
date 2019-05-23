import { Injectable, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DateService implements OnInit {
  default_month = (new Date().getMonth()+1).toString();
 	default_year = new Date().getFullYear().toString();

  	YEAR_OPTIONS: string[] = ["2018", "2019"];
  	MONTH_OPTIONS: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

  constructor() { }

  ngOnInit() { }
}