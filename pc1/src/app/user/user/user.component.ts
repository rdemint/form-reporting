import { Component, OnInit,} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../../models';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private userService: UserService) {   }

  ngOnInit() { 
    this.loginForm = new FormGroup({
      'email': new FormControl('thor@sonandsonhealth.com', [Validators.email, Validators.required]),
      'password': new FormControl('testpassword', Validators.required),
    });

  }

  login(){
      this.userService.login(this.loginForm.value);
  }  

 }