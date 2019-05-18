import { Component, OnInit, ElementRef, Input, Output, ViewChild, EventEmitter, HostListener } from '@angular/core';
import { NgForm, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Practice, DailySummary, Specialty, Provider } from '../../models'
import { DailySummaryService} from '../daily-summary.service';

@Component({
  selector: 'app-daily-summary-form',
  templateUrl: './daily-summary-form.component.html',
  styleUrls: ['./daily-summary-form.component.css']
})
export class DailySummaryFormComponent implements OnInit {
	@Input() provider: Provider;
  @Input() practice: Practice;
  @Input() selectedDate: Date;

  summaryForm: FormGroup;
  

  constructor(private dailySummaryService: DailySummaryService) { }

  ngOnInit() { 
      this.selectedDate = new Date();
      this.summaryForm = new FormGroup({
      'practice': new FormControl(this.practice.name),
      'specialty': new FormControl(this.provider.specialties[0]),
  		'date': new FormControl(this.selectedDate.toISOString().slice(0,10)),
      'visits': new FormControl(null),
  		'workdays': new FormControl(null),
  		'noshows': new FormControl(null),
      'provider': new FormControl(this.provider.id),
      
  	});

  }

  onSubmit() {
    this.dailySummaryService.postSummary(this.summaryForm.value);
  }
}
