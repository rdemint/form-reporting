import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Practice, DailySummary, Entity } from '../models';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntityService {
	entity_url: string = "http://127.0.0.1:8000/entities/";
	private entityName: string;
	private entitySlug: string;
	private entityPracticeList: Practice[] = [];

  constructor(private http:HttpClient, private authService:AuthService) {
  	this.entityName = authService.entity_name;
  	this.entitySlug = authService.entity_slug;
   }

   getEntityPractices() {
   	return this.http.get<Entity>(this.entity_url + this.entitySlug + '/', this.authService.getHttpOptions())
   }
}
