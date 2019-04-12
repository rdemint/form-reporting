import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient, private authService: AuthService, route: ActivatedRoute) {
      this.getPracticeList();
 }
  getPracticeListII(){
    return this.http.get(this.practice_url, this.authService.getHttpOptions()).subscribe();
  }    

  private getPracticeList(){
  	this.http.get(this.practice_url, this.authService.getHttpOptions()).subscribe((practices) => 
      {this.practice_list.next(practices);
      });
  }    

  loadPracticeList(){
    return this.practice_list.asObservable();
  }

  getPractice(slug:string) {
    return this.http.get(this.practice_url + slug + '/')
      .subscribe((practice) => this.selected_practice.next(practice));
  }
  
  loadPractice() {
    return this.selected_practice.asObservable();
  }

  selectPractice(slug:string) {
    this.selected_practice_slug.next(slug);
    this.getPractice(slug);
    return this.loadPractice();
  }

  postPractice(practice) {
    return this.http.post<Practice>(this.practice_url  + "/", practice)
      .subscribe(()=> 
         {this.getPracticeList();
          this.loadPracticeList();
        })
  }

  deletePractice(practiceSlug) {
    return this.http.delete<string>(this.practice_url + practiceSlug + "/")
      .subscribe(()=> this.getPracticeList());
  }

  patchSummary(summary: DailySummary, practice_slug: string, summaryId) {
    return this.http.patch<DailySummary>(this.daily_summary_url + summaryId + "/", summary, this.authService.getHttpOptions())
    .subscribe(() => this.selectPractice(practice_slug))
  }

  postSummary(summary: DailySummary, practice_slug: string) {
    return this.http.post<DailySummary>(this.daily_summary_url, summary, this.authService.getHttpOptions())
      .subscribe(() => this.selectPractice(practice_slug))
  }

}
