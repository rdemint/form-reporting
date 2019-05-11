import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit {
  entity: Entity;
  user: User;
  month: Observable<Date>;
  year: Observable<Date>;


  constructor(
  	private entityService: EntityService, 
  	private http: HttpClient, 
  	private userService: UserService,
  	private dateService: DateService,
    private route: ActivatedRoute,
    private router: Router,
    ) {}

  ngOnInit() {
  	this.userService.loadUser().pipe(first()).subscribe((user)=>this.user = user);
	  this.entityService.loadEntity().subscribe((entity)=> this.entity = entity);
  }

}
