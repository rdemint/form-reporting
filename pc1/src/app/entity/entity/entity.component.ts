import { Component, OnInit } from '@angular/core';
import { EntityService } from '../entity.service';
import { Practice, DailySummary, Entity } from '../../models';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit {
	entityPracticeList: Practice[] = [];
  constructor(private entityService: EntityService) { }


  ngOnInit() {
  	// this.entityService.getEntityPractices()
  	// 	.subscribe(
  	// 		(entity)=> this.entityPracticeList = entity.practices
  	// 		);
  	// console.log(this.entityPracticeList);
  }

}
