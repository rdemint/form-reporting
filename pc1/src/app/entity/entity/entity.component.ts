import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntityService } from '../entity.service';
import { AuthService } from '../../auth/auth.service';
import { DateService } from '../../date.service';
import { Practice, DailySummary, Entity } from '../../models';
import { Observable, combineLatest } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit {
  entity$: Observable<Entity>;
  //entity: Entity;
  email$: Observable<string>;
  practice_summaries$: Observable<Practice[]>;

  constructor(
  	private entityService: EntityService, 
  	private http: HttpClient, 
  	private authService: AuthService,
  	private dateService: DateService) { }

  ngOnInit() {
  	this.email$ = this.authService.getUser().pipe(
  		map((user)=> user.email));
	this.entity$ = this.entityService.loadEntity();
	this.practice_summaries$ = combineLatest(
		this.entity$, this.dateService.selected_year$, this.dateService.selected_month$)
		.pipe(map(
				([entity, year, month])=> {
					let summaries = [];
					for (let i=0; i < entity.practices.length; i++){
                 		this.entityService.getPractice(entity.practices[i].slug, year, month)
                   			.subscribe((practice)=> summaries.push(practice))
               		}
               	return summaries;
				}
		));
	console.log(this.entity$);
	console.log(this.practice_summaries$);
	console.log(this.entityService.getPractice('carolina-health', '2019', '4' ).subscribe(console.log));
  	// this.entityService.getEntity().subscribe(entity=> {
  	// 	this.entity = entity;
  	// 	});
  	// why does subscribing work, but using asyn doesn't?
  }



}
