import { Injectable, OnInit } from '@angular/core';
import { User, Practice, Entity } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Router, NavigationExtras } from '@angular/router';

import { environment } from '../../environments/environment';
import { DateService } from '../date.service';
import { EntityService } from '../entity/entity.service';
import { PracticeService } from '../practice/practice.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
	queryParams: any;
	errors: any = [];
	isAuthenticated: boolean = false;
	authHeader: any;
	month: string;
  	year: string;

  constructor(
  	private http:HttpClient, 
  	private router:Router, 
  	private dateService: DateService,
  	private practiceService: PracticeService,
  	private entityService: EntityService, 
  	private userService: UserService,
  	) {
  }

  ngOnInit() {
  	this.dateService.loadMonth().subscribe((month)=> this.month=month);
  	this.dateService.loadYear().subscribe((year)=> this.year=year);
  }

  signup(user) {  }

  login(credentials) {
  		this.http.post<any>(environment['authUrl'], credentials)
  			.subscribe(
  				(data) => {
	  				this.updateData(data);	
		  			this.isAuthenticated = true;
		  			this.navigateByUserType(data);
  				},
	  			(err) => {
	  				this.errors = err['error'];
	  			}
			);
  }

	logout() {	
		this.errors=[];
		this.isAuthenticated = false;
	}
	
	updateData(data) {
		this.getDataByType(data);
		this.userService.selectUser({
			id: data['user_id'],	
	  		email: data['email'],
	  		user_type: data['user_type'],
	  	});
		localStorage.setItem("token", data['token']);
		this.errors = [];
		this.authHeader = new HttpHeaders().set("Authorization", "Token " + localStorage['token']);
	}

	getDataByType(data) { 
		if (data['user_type'] == "admin") {
			this.entityService.getEntity(data['entity_slug']);
		}

		if (data['user_type'] == "staff") {
			this.practiceService.getPractice(data['practice_slug']);
		}
	}

	navigateByUserType(data){
		let navExtras: NavigationExtras = { queryParams: {} }
		navExtras['queryParams'] = {
 			year: '2019',
 			month: '4',
			}
 		if (data['user_type'] == "admin") {
 				navExtras['queryParams']['entity'] = data['entity_slug']
			this.router.navigate(
				['entities', data['entity_slug']], navExtras
			);
		}
		else if (data['user_type']=="manager") {
			this.router.navigate(
				['practices', data['practice_slug']], {queryParams: {year: this.year, month: this.month}}
			);
		}

		else {
			this.router.navigate(
				['practices', data['practice_slug'], 'reporting'])
		}
  	}


}



