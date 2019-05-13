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
  summaries$ = new BehaviorSubject<DailySummary[]>(null);
  entity$ = new BehaviorSubject<Entity>(null);



  constructor(private http:HttpClient, private dateService: DateService) {  }

  ngOnInit() {   }

  getEntitybyPractices(slug) {
     this.http.get<Entity>(environment['entity_url'] + slug + '/practices')
           .subscribe(
           (entity)=> { this.entity$.next(entity[0]);
         });
     }

   getEntitybyProviders(slug) {
      this.http.get<Entity>(environment['entity_url'] + slug + '/providers').pipe(
     first()).
       subscribe(
       (entity)=> {
         this.entity$.next(entity[0]);
       }
     );
   }

   loadEntity(){
     return this.entity$.asObservable();
   }
 }
