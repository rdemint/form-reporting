import { Injectable } from '@angular/core';
import { User, Practice, Entity } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DateService } from '../date.service';
import { EntityService } from '../entity/entity.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	private authUrl: string = "http://127.0.0.1:8000/token/";
	private authRefreshUrl: string ="http://127.0.0.1:8000/token/refresh/";
	private newUserUrl: string = "http://127.0.0.1:8000/users";
	httpOptions: {headers: HttpHeaders};
	
	queryParams: any;
	public errors: any = [];
	public authHeader: HttpHeaders;
	public isAuthenticated: boolean = false;
	private initial_month: string;
	private initial_year: string;

	//refactoring
	user = new BehaviorSubject<User>(null);
	practice = new BehaviorSubject<Practice>(null);
	entity = new BehaviorSubject<Entity>(null);

  constructor(
  	private http:HttpClient, 
  	private router:Router, 
  	private dateService: DateService,
  	private entityService: EntityService) {
  	this.dateService.getMonth().subscribe((month)=>this.initial_month=month);
  	this.dateService.getYear().subscribe((year)=>this.initial_year=year);
  	this.queryParams = {queryParams: { 
  		year: this.initial_year,
  		month: this.initial_month
  		  }}
  }

  signup(user) {  }

  login(user) {
  		this.http.post<any>(this.authUrl, user)
  			.subscribe(
  				(data) => {
	  				this.updateData(data);	
		  			this.isAuthenticated = true;
		  			if (data['user_type'] == "admin") {
		  				this.router.navigate(
		  					['entities', data['entity_slug']],
		  					this.queryParams);
		  			}
		  			else {
						this.router.navigate(
							['practices', data['practice_slug']], 
							this.queryParams);
		  			}
  				},
	  			(err) => {
	  				this.errors = err['error'];
	  			}
			);
  }

  navigateByUserType(){  }
 
	logout() {	
		this.errors=[];
		this.isAuthenticated = false;
	}
	
	updateData(data) {
		this.user.next({	
			token: data['token'], 
	  		email: data['email'],
	  		user_type: data['user_type'],
	  	});
		this.practice.next({
			name: data['practice_name'],
			slug: data['practice_slug']
		});
		this.entityService.selectEntity(data['entity_slug']);
		localStorage.setItem("token", this.user['token']);
		this.errors = [];
		this.authHeader = new HttpHeaders().set("Authorization", "Token " + localStorage['token'])
		this.httpOptions = {
			headers: this.authHeader,
		};
	}

	getUser() {
		return this.user.asObservable();
	}

	getPractice() {
		return this.practice.asObservable();
	}

	getEntity() {
		return this.entity.asObservable();
	}

	getHttpOptions() {
		return this.httpOptions;
	}

}



