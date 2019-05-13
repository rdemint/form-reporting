import { Injectable } from '@angular/core';
import { User, Practice, Entity } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { DateService } from '../date.service';
import { EntityService } from '../entity/entity.service';
import { PracticeService } from '../practice/practice.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	httpOptions: {headers: HttpHeaders};
	queryParams: any;
	errors: any = [];
	authHeader: HttpHeaders;
	isAuthenticated: boolean = false;
	private initial_month: string;
	private initial_year: string;

	//refactoring
	user = new BehaviorSubject<User>(null);

  constructor(
  	private http:HttpClient, 
  	private router:Router, 
  	private dateService: DateService,
  	private practiceService: PracticeService,
  	private entityService: EntityService, 
  	private userService: UserService) {
  	this.dateService.getMonth().pipe(first())
  		.subscribe((month)=>this.initial_month=month);
  	this.dateService.getYear().pipe(first())
  		.subscribe((year)=>this.initial_year=year);
  	this.queryParams = {queryParams: { 
  		year: this.initial_year,
  		month: this.initial_month
  		  }}
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
	  		email: data['email'],
	  		user_type: data['user_type'],
	  	});
		localStorage.setItem("token", this.user['token']);
		this.errors = [];
		this.authHeader = new HttpHeaders().set("Authorization", "Token " + localStorage['token'])
		this.httpOptions = {
			headers: this.authHeader,
		};
	}

	getDataByType(data) { 
		if (data['user_type'] == "admin") {
			this.entityService.selectEntity(data['entity_slug']);
		}

		if (data['user_type'] == "staff") {
			this.practiceService.selectPractice(data['practice_slug']);
		}
	}

	navigateByUserType(data){
 		if (data['user_type'] == "admin") {
			this.router.navigate(
				['entities', data['entity_slug']], this.queryParams);
		}
		else {
			this.router.navigate(
				['practices', data['practice_slug']], this.queryParams);
		}
  	}

	getHttpOptions() {
		return this.httpOptions;
	}

}



