import { Component, OnInit } from '@angular/core';
import { User } from '../../models';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';
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
  	this.email = this.authService.email;
  	this.practiceName = this.authService.practice_name;
  	this.practiceSlug = this.authService.practice_slug;

  }

}
