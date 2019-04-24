import { Injectable } from '@angular/core';
import { User } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { DateService } from '../date.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	private authUrl: string = "http://127.0.0.1:8000/token/";
	private authRefreshUrl: string ="http://127.0.0.1:8000/token/refresh/";
	private newUserUrl: string = "http://127.0.0.1:8000/users";
	private httpOptions: any;
	
	queryParams: any;
	public practice_name: string;
	public practice_slug: string;
	public entity_name: string;
	public entity_slug: string;
	public token: string;
	public token_expires: Date;
	public email: string;
	public errors: any = [];
	public authHeader: HttpHeaders;
	public isAuthenticated: boolean = false;
	private initial_month: string;
	private initial_year: string;
	private user_type; string;

  constructor(private http:HttpClient, private router:Router, private dateService: DateService) {
  	this.dateService.getMonth().subscribe((month)=>this.initial_month=month);
  	this.dateService.getYear().subscribe((year)=>this.initial_year=year);
  	this.queryParams = {queryParams: { 
  		year: this.initial_year,
  		month: this.initial_month
  		  }}
  }

  signup(user) {  }

  login(user) {
  		this.http.post(this.authUrl, user)
  			.subscribe(
  				(data) => {
	  				this.updateData(
	  					data['token'], 
	  					data['practice_slug'],
	  					data['entity_slug'], 
	  					data['email'],
	  					data['practice_name'],
	  					data['entity_name'],
						data['user_type'],
	  					);	
		  				this.isAuthenticated = true;
		  				if (this.user_type == "admin") {
		  					this.router.navigate(
		  						['entities', this.entity_slug],
		  						this.queryParams);
		  				}
		  				else {
							this.router.navigate(
								['practices', this.practice_slug], 
								this.queryParams);
		  				}
  				},
	  			(err) => {
	  				this.errors = err['error'];
	  			}
			);
  }
 
	logout() {
		this.token = '';
		this.token_expires = null;
		this.errors=[];
		this.isAuthenticated = false;
	}
	
	private updateData(
				token, 
				practice_slug, 
				entity_slug, 
				email, 
				practice_name, 
				entity_name,
				user_type) {
		localStorage.setItem("token", token);
		this.email = email;
		this.practice_slug = practice_slug;
		this.entity_slug = entity_slug;
		this.practice_name = practice_name;
		this.entity_name = entity_name;
		this.errors = [];
		this.user_type = user_type
		this.authHeader = new HttpHeaders().set("Authorization", "Token " + localStorage['token'])
		this.httpOptions = {
			headers: this.authHeader,
		};
	}

	getHttpOptions() {
		return this.httpOptions;
	}

	getEmail() {
		return this.email;
	}

}



