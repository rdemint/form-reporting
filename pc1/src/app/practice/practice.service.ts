import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Practice, DailySummary } from '../models';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PracticeService {
	private practice_list = new BehaviorSubject<any>([]);
  private selected_practice = new BehaviorSubject<any>(null);
  private selected_practice_slug = new BehaviorSubject<string>(null);
	private practice_detail = new BehaviorSubject<Practice>(null);
  private daily_summary_list = new BehaviorSubject<DailySummary[]>([]);

	root_url: string = 'http://127.0.0.1:8000/';
	practice_url: string = 'http://127.0.0.1:8000/practices/'; 
  daily_summary_url: string ='http://127.0.0.1:8000/daily_summaries/';
  httpOptions: any;
  httpParams = new HttpParams();

  constructor(private http: HttpClient, private authService: AuthService) { 
  }

  loadPracticeList(){
    return this.practice_list.asObservable();
  }

  getPractice(slug:string) {
    return this.http.get(this.practice_url + slug + '/')
      .subscribe((practice) => this.selected_practice.next(practice));
  }

  getPracticeSummaries(slug:string, year, month) {
    let httpparams: HttpParams = new HttpParams().append('year', year).append('month', month);
    this.selected_practice_slug.next(slug);
    return this.http.get<DailySummary[]>(
      this.practice_url + slug + '/daily_summaries/', 
      {params: httpparams}
    )
  }
  
  loadPractice() {
    return this.selected_practice.asObservable();
  }

  selectPractice(slug:string) {
    this.selected_practice_slug.next(slug);
    this.getPractice(slug);
    return this.loadPractice();
  }

  patchSummary(summary: DailySummary, practice_slug: string, summaryId) {
    return this.http.patch<DailySummary>(this.daily_summary_url + summaryId + "/", summary, this.authService.getHttpOptions())
  }

  postSummary(summary: DailySummary, practice_slug: string) {
    return this.http.post<DailySummary>(this.daily_summary_url, summary, this.authService.getHttpOptions())
  }

}
