import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { EntityService } from '../entity.service';
import { UserService } from '../../user/user.service';
import { DateService } from '../../date.service';
import { Practice, DailySummary, Entity, User, Provider } from '../../models';
import { Observable, combineLatest } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  // changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit {
  entity: any;
  entity2: any;
  entity$: Observable<Entity>;

  constructor(
  	private entityService: EntityService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
    ) {}

  ngOnInit() {
    this.entityService.loadEntity().subscribe((entity)=> this.entity = entity);
    this.entity$ = this.entityService.loadEntity();
    console.log(this.entity$);
   }

 }

