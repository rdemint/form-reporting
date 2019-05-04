import { Component, OnInit } from '@angular/core';
import { User } from '../../models';
import { UserService } from '../../user/user.service';
import { PracticeService } from '../../practice/practice.service';
import { Practice } from '../../models';

import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit {
	email: string;
	practice$: Observable<Practice>;
	
  constructor(private userService: UserService, private practiceService: PracticeService) { }

  ngOnInit() {
  	this.userService.loadUser().pipe(first())
      .subscribe(
        (user)=>{
          this.email = user.email
        }
      );
    this.practice$ = this.practiceService.loadPractice().pipe(first())
       // .subscribe(
       // // (practice)=> {
       //   this.practice = practice
       // })      
    ;
  }

}
