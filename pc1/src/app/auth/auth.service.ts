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
	public slug: string;
	public token: string;
	public token_expires: Date;
	public email: string;
	public errors: any = [];
	public authHeader: HttpHeaders;
	public isAuthenticated: boolean = false;
	private initial_month: string;
	private initial_year: string;

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
  					data['slug'], 
  					data['email'],
  					data['practice_name']);
  				this.isAuthenticated = true;
  				this.router.navigate(['practices', this.slug], this.queryParams)
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
	
	private updateData(token, slug, email, practice_name){
		localStorage.setItem("token", token)
		this.email = email;
		this.slug = slug;
		this.practice_name = practice_name
		this.errors = [];
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



