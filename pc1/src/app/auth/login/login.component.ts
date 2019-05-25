import { Component, OnInit,} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../../models';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService) {   }

  ngOnInit() { 
    this.loginForm = new FormGroup({
      'email': new FormControl('joe@independenthealth.com', [Validators.email, Validators.required]),
      'password': new FormControl('testpassword', Validators.required),
    });

  }

  login(){
      this.authService.login(this.loginForm.value);
  }  

 }