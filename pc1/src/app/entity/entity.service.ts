import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment';
import { Entity } from '../models';

@Injectable({
  providedIn: 'root'
})
export class EntityService implements OnInit {
 
  constructor(
    private http:HttpClient,
   ) {    }

  ngOnInit() {  }

  getEntity(slug) {
    return this.http.get<Entity>(environment['entity_url'] + slug + '/');
  }

 }
