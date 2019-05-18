import { Component, OnInit, ElementRef, Input, Output, ViewChild, EventEmitter, HostListener } from '@angular/core';
import { NgForm, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Practice, DailySummary, Specialty } from '../../models'

@Component({
  selector: 'app-daily-summary-form',
  templateUrl: './daily-summary-form.component.html',
  styleUrls: ['./daily-summary-form.component.css']
})
export class DailySummaryFormComponent implements OnInit {
	@Input() specialties: Specialty[];
  summaryForm: FormGroup;
  selected: any;

  constructor() { }

  ngOnInit() { 
  	this.summaryForm = new FormGroup({
      'specialty': new FormControl(null),
  		'visits': new FormControl(null),
  		'workdays': new FormControl(null),
  		'noshows': new FormControl(null)
  	});
    this.selected = this.specialties[0];
  }

  onSubmit() {
  }
}
