import { Component, OnInit } from '@angular/core';
import { User } from '../../models';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit {
	email: string;
	practiceName: string;
	practiceSlug: string;
	
  constructor(private authService: AuthService) { }

  ngOnInit() {
  	this.authService.getUser().pipe(first())
      .subscribe(
        (user)=>{
          this.practiceName = user.email
        }
      );
    this.authService.getPractice().pipe(first())
       .subscribe(
       (practice)=> {
         this.practiceName = practice.name;
         this.practiceSlug = practice.slug;
       }       
    );
  }

}
