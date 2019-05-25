import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EntityService } from '../entity.service';
import { UserService } from '../../user/user.service';
import { DateService } from '../../date.service';
import { DailySummaryService } from '../../daily-summary/daily-summary.service';
import { DailySummary, Entity, User } from '../../models';
import { environment } from '../../../environments/environment';
import { switchMap, map, tap} from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit {
  user: User;
  entity: Entity;
  dailySummaries: DailySummary[];
  year: string;
  month: string;

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
    combineLatest(this.route.paramMap, this.route.queryParamMap)
      .subscribe(
          ([params, queryparams]) => {
            this.entityService.getEntity(params.get('entity_slug'))
              .subscribe(
                (entity)=> this.entity = entity
              );
            this.getDailySummaries({
              'entity': params.get('entity_slug'), 
              'year': queryparams.get('year'), 
              'month': queryparams.get('month')
            });
          }
        );
  }

  getDailySummaries(params) {
    this.dailySummaryService.getDailySummaries(params)
        .subscribe((dailySummaries)=> {
          this.dailySummaries = dailySummaries;
        });
  }
}

