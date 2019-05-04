import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { DateService } from '../date.service';
import { Practice, DailySummary, Entity } from '../models';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, take, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EntityService implements OnInit {
	private entity_url: string = "http://127.0.0.1:8000/entities/";
  practice_list: Practice[] = [];
  summaries$ = new BehaviorSubject<DailySummary[]>(null);
  entity$ = new BehaviorSubject<Entity>(null);


  constructor(private http:HttpClient, private dateService: DateService) {  }

  ngOnInit() {  }
   selectEntity(slug) {
     this.http.get<Entity>(this.entity_url + slug + '/').pipe(
         first()).
           subscribe(
           (entity)=> {
             this.entity$.next(entity);
           }
         );
     }

   loadEntity(){
     return this.entity$.asObservable();
   }

   getSummaries() {
     this.http.get<Summary[]>(this.entity_summary_url + slug + '/').subscribe(
         (summaries)=>
       );
   }

   // getAllPractices(year, month) {
   //   this.entity$.pipe(
   //       map(
   //           (entity)=> {
   //             for (let i=0; i < entity.practices.length; i++){
   //               this.getPractice(entity.practices[i].slug, year, month)
   //                 .subscribe((practice)=> this.practice_list.push(practice))
   //             }
   //           }
   //         )
   //     );
   // }

   // getPractice(slug, year, month) {
   //   return this.http.get<Practice>(this.practice_url + slug + '/', {params: {year: year, month: month}})
   // }



   // Shouldn't need this since I added one months of summaries to
   // the Practice on the backend (Detail View)
   // getPracticeSummaries(entity) {
   //   //let httpparams: HttpParams = new HttpParams().append('year', this.dateService.year).append('month', this.dateService.month);
   //   let practice_summaries = []
   //   for (let i=0; i< entity.practices.length; i++) {
   //       entity.practices[i];
   //       this.http.get<DailySummary[]>(
   //          this.practice_url + entity.practices[i] + '/daily_summaries/', 
   //          {params: httpparams}).subscribe((summaries)=> practice_summaries.push(summaries));
   //     }
   //   this.practice_summaries$.next(practice_summaries)
   //   }

   loadPracticeSummaries() {
     return this.practice_summaries$.asObservable();
   }
}
