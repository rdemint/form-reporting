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
  constructor(private authService: AuthService) { }

  ngOnInit() {
  	this.email = this.authService.getEmail()
  }

}
