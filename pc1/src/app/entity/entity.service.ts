import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { DateService } from '../date.service';

import { environment } from '../../environments/environment';
import { Practice, DailySummary, Entity } from '../models';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, take, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EntityService implements OnInit {
  practice_list: Practice[] = [];
  summaries$ = new BehaviorSubject<DailySummary[]>(null);
  entity$ = new BehaviorSubject<Entity>(null);
  params: HttpParams;
  params2: HttpParams;

  constructor(private http:HttpClient, private dateService: DateService) {  }

  ngOnInit() { 
    this.dateService.getHttpParams().subscribe((httpparams)=>this.params = httpparams);
    this.params2 = new HttpParams()
      .append('year', this.dateService.selected_year$.getValue())
      .append('month', this.dateService.selected_month$.getValue())
  }

  selectEntity(slug) {
    console.log(this.params2)
     this.http.get<Entity>(environment['entity_url'] + slug + '/', {params: this.params2}).pipe(
         first()).
           subscribe(
           (entity)=> {
             this.entity$.next(entity);
           }
         );
     }

   loadEntity(): Observable<Entity> {
     return this.entity$.asObservable();
   }
 }
