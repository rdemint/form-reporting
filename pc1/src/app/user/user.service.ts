import { Injectable } from '@angular/core';
import { User } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

	httpOptions: any;
	private authUrl: string = "http://127.0.0.1:8000/token/";
	private authRefreshUrl: string ="http://127.0.0.1:8000/token/refresh/";
	private newUserUrl: string = "http://127.0.0.1:8000/users";
	public slug: string;
	public token: string;
	public token_expires: Date;
	public email: string;
	public errors: any = [];
	private authHeader: HttpHeaders;

  constructor(private http:HttpClient, private router:Router) { 
  	this.getHttpOptions()
  }

  signup(user) {  }

  login(user) {
  		this.http.post(this.authUrl, user)
  			.subscribe(
  				(data) => {

  				this.updateData(data['token'], data['slug'], data['email']);
  				this.router.navigate(['practices', this.slug])
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
	}
	
	private updateData(token, slug, email){
		this.token = token;
		this.email = email;
		this.slug = slug;
		this.errors = [];
		let authHeader = new HttpHeaders().set("Authorization", "Token " + token)
		this.httpOptions = {
			headers: authHeader,
		};
	}

		// decode the token to read the username and expiration date
		// JWT tokens are split up by the . symbol
		// window.atob() and JSON.parse are built in JS methods
		// const token_parts = this.token.split(/\./);
		// const token_decoded = JSON.parse(window.atob(token_parts[1]));
		// this.token_expires = new Date(token_decoded.exp)
		// this.username = token_decoded.username; 

	getHttpOptions() {
		return this.httpOptions;
	}

	getEmail() {
		return this.email;
	}

	refreshToken() { }
}