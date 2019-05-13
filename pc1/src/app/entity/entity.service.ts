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
  dailySummaries$ = new BehaviorSubject<DailySummary[]>(null);
  entity$ = new BehaviorSubject<Entity>(null);
  params: HttpParams;
  params2: HttpParams;

  constructor(private http:HttpClient, private dateService: DateService) {  }

  ngOnInit() {}

  selectEntity(slug) {
    this.http.get<Entity>(environment['entity_url'] + slug).subscribe((entity)=> this.selectedEntity.next(entity));
  }

  getEntity() {}

  loadEntity() {
    return this.entity$.asObservable();
  }

  getDailySummaries() {}

  loadDailySummaries() {
    return this.dailySummaries$.asObservable();
  }

 }
