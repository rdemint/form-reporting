import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Practice, DailySummary } from '../models';
import { AuthService } from '../auth/auth.service';
import { DateService } from '../date.service';

@Injectable({
  providedIn: 'root'
})
export class PracticeService implements OnInit {
  private selected_practice = new BehaviorSubject<Practice>(null);

  httpOptions: any;
  httpparams: HttpParams;

  constructor(
      private http: HttpClient,
      private dateService: DateService)
   { }

  ngOnInit(){
    this.dateService.getHttpParams().subscribe((params)=> this.httpparams = params);
  }

  selectPractice(slug:string) {
    this.getPractice(slug);
  }

  getPractice(slug:string) {
    return this.http.get<Practice>(
        environment['practice_url'] + slug + '/', 
        {params: this.httpparams})
          .subscribe(
            (practice) => this.selected_practice.next(practice)
          );
  }
  
  loadPractice() {
    return this.selected_practice.asObservable();
  }

  patchSummary(summary: DailySummary, practice_slug: string, summaryId) {
    return this.http.patch<DailySummary>(environment['daily_summary_url'] + summaryId + "/", summary)
  }

  postSummary(summary: DailySummary, practice_slug: string) {
    return this.http.post<DailySummary>(environment['daily_summary_url'], summary)
  }

}
