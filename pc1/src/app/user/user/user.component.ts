import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { User } from '../../models';
import { Observable} from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
	user: User;
  
  constructor(private userService: UserService) { }

  ngOnInit() {
  	this.userService.loadUser().subscribe((user)=> this.user = user);
  }

}
