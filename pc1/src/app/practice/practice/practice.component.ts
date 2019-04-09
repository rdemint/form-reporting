import { Component, OnInit } from '@angular/core';
import { User } from '../../models';
import { UserService } from '../../user/user.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit {
	email: string;
  constructor(private userService: UserService) { }

  ngOnInit() {
  	this.email = this.userService.getEmail()
  }

}
