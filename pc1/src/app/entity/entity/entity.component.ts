import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EntityService } from '../entity.service';
import { UserService } from '../../user/user.service';
import { DateService } from '../../date.service';
import { DailySummaryService } from '../../daily-summary/daily-summary.service';
import { DailySummary, Entity, User } from '../../models';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit {
  user: User;
  entity: Entity;
  dailySummaries: DailySummary[];

  selected_entity_slug = 'tri-state-inc'
  year = '2019';
  month = '4';

  constructor(
  	private entityService: EntityService,
    private dailySummaryService: DailySummaryService,
    private dateService: DateService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit() {
  	this.userService.loadUser().subscribe((user)=> this.user = user);
	  this.entityService.getEntity(this.selected_entity_slug).subscribe((entity)=> {
      this.entity = entity;
      this.getDailySummaries();
      });
  }

  getDailySummaries() {
    this.dailySummaryService.getDailySummaries({'entity': this.entity.slug, 'year': this.year, 'month': this.month})
        .subscribe((dailySummaries)=> {
          this.dailySummaries = dailySummaries;
        });
  }
}

