import { Component, OnInit, ElementRef, Input, Output, ViewChild, EventEmitter, HostListener} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Practice, DailySummary } from '../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
	@Input() practice;
  @Input() summaryId: number = null; 
  @Input() date: string = "";
	@Input() visits: number = null;
  @Input() workdays: number = null;
  @Input() noshows: number = null;
  @Input() resetForm: boolean = false;
  @Output() outSummary = new EventEmitter();
  @Input() submitText: string = "Submit";
    
  constructor() { }

  ngOnInit() {  }

  onSubmit(form: NgForm){
    if (form.valid) {
      var summary = {
        date: form.value.date,
        visits: form.value.visits,
        workdays: form.value.workdays,
        noshows: form.value.noshows,
       };
      this.outSummary.emit(summary);
      if (this.resetForm) {
        form.reset();    
      }
      
    }
  }
}
