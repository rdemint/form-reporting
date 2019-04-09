import { Input, Output, Component, OnInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Practice } from '../../models';
import { PracticeService } from '../practice.service';

@Component({
  selector: 'app-select-practice',
  templateUrl: './select-practice.component.html',
  styleUrls: ['./select-practice.component.css']
})
export class SelectPracticeComponent implements OnInit {
	@Input() practices = new Observable<Practice[]>();
	@Output() outDeletePractice = new EventEmitter();
	@Output() outPostPractice = new EventEmitter();
	
  constructor( ) { }

  ngOnInit() {
  }
  postPractice(summary: Practice) {
  	this.outPostPractice.emit(summary);
  }

  deletePractice(practiceSlug: string){
  	this.outDeletePractice.emit(practiceSlug);
  }
  
}
