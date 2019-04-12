import { Injectable } from '@angular/core';
import { User } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	private authUrl: string = "http://127.0.0.1:8000/token/";
	private authRefreshUrl: string ="http://127.0.0.1:8000/token/refresh/";
	private newUserUrl: string = "http://127.0.0.1:8000/users";
	private httpOptions: any;

	public slug: string;
	public token: string;
	public token_expires: Date;
	public email: string;
	public errors: any = [];
	public authHeader: HttpHeaders;
	public isAuthenticated: boolean = false;

  constructor(private http:HttpClient, private router:Router) {}

  signup(user) {  }

  login(user) {
  		this.http.post(this.authUrl, user)
  			.subscribe(
  				(data) => {

  				this.updateData(data['token'], data['slug'], data['email']);
  				this.isAuthenticated = true;
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
		this.isAuthenticated = false;
	}
	
	private updateData(token, slug, email){
		this.token = token;
		this.email = email;
		this.slug = slug;
		this.errors = [];
		this.authHeader = new HttpHeaders().set("Authorization", "Token " + token)
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



