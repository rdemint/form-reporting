import { Injectable, OnInit } from '@angular/core';
import { Entity } from '../models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EntityService implements OnInit {
	year = '2019';
	month = '4';
	selected_entity_slug = 'tri-state-inc';
	entity: Entity;
	entity$ = new BehaviorSubject<Entity>(null);

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  getEntity() {
		let httpParams = new HttpParams()
			.append('entity', this.selected_entity_slug);
		this.http.get<Entity>(environment['entity_url'] + this.selected_entity_slug + '/', {params: httpParams} )
			.subscribe((entity)=> this.entity = entity);
  }

  loadEntity(){
  	return this.entity;
  }
}
