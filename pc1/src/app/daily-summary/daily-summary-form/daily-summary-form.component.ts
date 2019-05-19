import { Component, OnInit, Input, Output, ViewChild, OnChanges, SimpleChanges, EventEmitter} from '@angular/core';
import { NgForm, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Practice, DailySummary, Specialty, Provider } from '../../models'
import { DailySummaryService} from '../daily-summary.service';

@Component({
  selector: 'app-daily-summary-form',
  templateUrl: './daily-summary-form.component.html',
  styleUrls: ['./daily-summary-form.component.css']
})
export class DailySummaryFormComponent implements OnInit, OnChanges {
	@Input() provider: Provider;
  @Input() practice: Practice;
  @Input() selectedDate: Date;
  @Input() dailySummary: DailySummary;
  @Input() dailySummaryExists: boolean;
  @Output() addSummaryOutput = new EventEmitter<DailySummary>();
  summaryForm: FormGroup;

  

  constructor(private dailySummaryService: DailySummaryService) { }

  ngOnInit() {
    this.createForm();
    
  }

  createForm() {
      this.summaryForm = new FormGroup({
      'practice': new FormControl(this.practice.name),
      'specialty': new FormControl(this.provider.specialties[0]),
      'date': new FormControl(this.selectedDate.toISOString().slice(0,10)),
      'visits': new FormControl(this.dailySummary.visits),
      'workdays': new FormControl(this.dailySummary.workdays),
      'noshows': new FormControl(this.dailySummary.noshows),
      'provider': new FormControl(this.provider.id),
      
    });
      if (this.dailySummaryExists) {
        this.summaryForm.disable();

      }
  }

  onSubmit() {
    this.dailySummaryService.postSummary(this.summaryForm.value);
    this.addSummaryOutput.emit(this.summaryForm.value);
  }

  ngOnChanges(changes: SimpleChanges) {
    if( changes['selectedDate']){
      this.createForm();
    }
  }
}
