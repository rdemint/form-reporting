import { Component, ViewChild, OnInit, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	@Input() practice: string;
  
  constructor() { }

  ngOnInit() {
  }
  

}
