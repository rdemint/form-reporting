import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Practice, DailySummary } from '../models';
import { AuthService } from '../auth/auth.service';
import { DateService } from '../date.service';

@Injectable({
  providedIn: 'root'
})
export class PracticeService implements OnInit {
	private practice_list = new BehaviorSubject<any>([]);
  private selected_practice = new BehaviorSubject<any>(null);
  private selected_practice_slug = new BehaviorSubject<string>(null);
	private practice_detail = new BehaviorSubject<Practice>(null);
  private daily_summaries = new BehaviorSubject<DailySummary[]>([]);

	root_url: string = 'http://127.0.0.1:8000/';
	practice_url: string = 'http://127.0.0.1:8000/practices/'; 
  daily_summary_url: string ='http://127.0.0.1:8000/daily_summaries/';
  httpOptions: any;
  httpparams: HttpParams

  constructor(
      private http: HttpClient,
      private authService: AuthService,
      private dateService: DateService)
   { }

  ngOnInit(){
    //this.dateService.httpParams.subscribe((params)=> this.httpparams = params)
    // I am worried about race conditions...http being called before observer 
    // is updated from date service .next call
  }

  getPractice(slug:string, year, month) {
    this.selected_practice_slug.next(slug);
    return this.http.get(
        this.practice_url + slug + '/', 
        {params: {year: year, month: month}})
          .subscribe(
            (practice) => this.selected_practice.next(practice)
          );
  }

  getDailySummaries(slug:string, year: string, month: string) {
    this.http.get<DailySummary[]>(
      this.practice_url + slug + '/daily_summaries/', 
      {params: {year: year, month: month}}
    )
      .subscribe(summaries => this.daily_summaries.next(summaries))
  }

  loadDailySummaries() {
    return this.daily_summaries.asObservable();
  }
  
  loadPractice() {
    return this.selected_practice.asObservable();
  }

  selectPractice(slug:string, year, month) {
    this.selected_practice_slug.next(slug);
    this.getPractice(slug, year, month);
    return this.loadPractice();
  }

  patchSummary(summary: DailySummary, practice_slug: string, summaryId) {
    return this.http.patch<DailySummary>(this.daily_summary_url + summaryId + "/", summary)
  }

  postSummary(summary: DailySummary, practice_slug: string) {
    return this.http.post<DailySummary>(this.daily_summary_url, summary)
  }

}
