import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EntityService } from '../../entity/entity.service';
import { Entity, Specialty, Provider, Practice, DailySummary } from '../../models';


@Component({
  selector: 'app-entity-container',
  templateUrl: './entity-container.component.html',
  styleUrls: ['./entity-container.component.css']
})
export class EntityContainerComponent implements OnInit {

	private entity_subject$ = new BehaviorSubject<Entity>(null);
	entity$: Observable<Entity> = this.entity_subject$.asObservable();
	entityFilter = 'practices';


	entity: Entity;
	providers: Provider[];
	practices: Practice[];
	specialties: Specialty[];
	dailySummaries: DailySummary[];

	constructor(private entityService:EntityService) {
		this.getEntity();
	}

	ngOnInit() { }

	getEntity() {
		this.entityService.loadEntity().subscribe((entity)=> {
			this.entity = entity;
			this.getDailySummaries(entity.slug)
			this.practices = this.entity.practices;
			this.providers = this.entity.providers;
			this.specialties = this.entity.specialties;
		})
			
  }

  	getDailySummaries(slug) {
  		let httpParams = new HttpParams()
  			.append('year', this.year)
  			.append('month', this.month);
  		this.http.get<DailySummary[]>(environment['daily_summary_url'], {params: httpParams})
  			.subscribe((dailySummaries)=> this.dailySummaries = dailySummaries);
  	}


}
