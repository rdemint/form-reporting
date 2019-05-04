import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
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
  entity$ = new Observable<Entity>();
  email: string;
  email$: Observable<string>;
  practice_summaries$: Observable<Practice[]>;
  entity: Entity;
  month: number;
  year: number;

  constructor(
  	private entityService: EntityService, 
  	private http: HttpClient, 
  	private authService: AuthService,
  	private dateService: DateService,
    private route: ActivatedRoute,
    private router: Router,
    ) {}

  ngOnInit() {
  	this.email$ = this.authService.getUser().pipe(
  		first(),
      map((user)=> user.email));
	  this.entity$ = this.entityService.loadEntity();
    this.entity$.subscribe((entity)=>this.entity = entity)
    this.entity$.pipe(
      map((entity)=>{
        for (let i=0; i < entity.practices.length; i++) {
          entity.practices[0]['daily_summaries'] = this.entityService.getSummaries(
                                                          entity.practices[i].slug, this.month, this.year))
        }
        //modify the API to automatically check for query params to get the summaries for the latest month. 
    	// this.practice_summaries$ = combineLatest(
    	// 	this.entity$, this.dateService.selected_year$, this.dateService.selected_month$)
    	// 	.pipe(map(
    	// 			([entity, year, month])=> {
    	// 				let summaries = [];
    	// 				for (let i=0; i < entity.practices.length; i++){
     //                 		this.entityService.getPractice(entity.practices[i].slug, year, month)
     //                   			.subscribe((practice)=> summaries.push(practice))
     //               		}
     //               	return summaries;
    	// 			}
    	// 	));
    	
  }



}
