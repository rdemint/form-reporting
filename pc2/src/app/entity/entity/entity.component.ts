import { Component, OnInit, Input } from '@angular/core';
import { Entity, Practice, Provider, Specialty, DailySummary } from '../../models';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit {
	@Input() entity: Entity; 
	@Input() dailySummaries: DailySummary[];
	@Input() entityFilter: string;
	filteredSummaries: DailySummary[];
	filteredEntity: Provider[] | Practice[];
	filterMap = {
		'practices': 'practice',
		'providers': 'provider',
	}

  constructor() {
 }

  ngOnInit() {
  		let summaryKey = this.filterMap[this.entityFilter];
      console.log(this.dailySummaries);
  		this.filteredEntity = this.dailySummaries[this.entityFilter]
  }

}
