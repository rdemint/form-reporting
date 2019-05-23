import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { environment } from '../../environments/environment';
import { Practice, DailySummary } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PracticeService implements OnInit {

  constructor(
      private http: HttpClient)
   { }

  ngOnInit(){  }

  getPractice(slug:string) {
    return this.http.get<Practice>(
        environment['practice_url'] + slug + '/')
  }
  

}
