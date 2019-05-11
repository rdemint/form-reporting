import { Injectable, OnInit } from '@angular/core';
import { EntityService } from '../entity/entity.service';
import { map, first} from 'rxjs/operators';
import { BehaviorSubject, Observable, combineLatest} from 'rxjs';
import { Provider, DailySummary, Entity } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProviderService implements OnInit {
	selected_provider = new BehaviorSubject<Provider>(null);
	providerSummaries$: Observable<DailySummary[]>;
	allDailySummaries$: Observable<DailySummary[]>;

  	constructor(private entityService: EntityService) { }

	ngOnInit() { }

	// either use and additiona ,map below the map or use this function to select the provider, and create another to return as observable.  latter seems best. 
	loadProvider(provider_full_name) { 
		return this.entityService.loadEntity().pipe(
			map((entity)=> entity.providers.filter((provider)=> provider.full_name == provider_full_name))
		);
	}

	// loadProviderSummaries(provider_full_name) {
	// 	let provider$ = this.entityService.loadEntity().pipe(
	// 		map((entity)=> entity.providers.filter(
	// 			(provider)=> provider.full_name = provider_full_name 
	// 			)),
	// 		first())
	// 	provider$.subscribe((provider)=> this.selected_provider.next(provider[0]))

	// 	this.providerSummaries$ = this.entityService.loadEntity().pipe(
	// 		map(
	// 			(entity: Entity)=> {
	// 				for (let i=0; i < entity.practices.length ; i++) {
	// 					return entity.practices[i].daily_summaries.filter(
	// 							(summary) => {if (summary.provider == this.selected_provider.getValue()) {summary}}
	// 							)
	// 				}
	// 			}	
	// 		)	

	// 	);

	// console.log(this.providerSummaries$);
	// }
	
}

