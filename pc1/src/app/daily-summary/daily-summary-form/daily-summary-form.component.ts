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
  @Input() dailySummaryDisabled: boolean;
  @Input() editing: boolean;
  @Output() addSummaryOutput = new EventEmitter<DailySummary>();
  @Output() putSummaryOutput = new EventEmitter<DailySummary>();
  @Output() editingOutput = new EventEmitter<boolean>();

  summaryForm: FormGroup;

  

  constructor(private dailySummaryService: DailySummaryService) { }

  ngOnInit() {
  }

  createForm() {
      this.summaryForm = new FormGroup({
      'id': new FormControl(this.dailySummary.id),
      'practice': new FormControl(this.practice.name),
      'specialty': new FormControl(this.provider.specialties[0]),
      'date': new FormControl(this.selectedDate.toISOString().slice(0,10)),
      'visits': new FormControl({value: this.dailySummary.visits, disabled: this.dailySummaryDisabled}),
      'workdays': new FormControl({value: this.dailySummary.workdays, disabled: this.dailySummaryDisabled}),
      'noshows': new FormControl({value: this.dailySummary.noshows, disabled: this.dailySummaryDisabled}),
      'provider': new FormControl({value: this.provider.id, disabled: this.dailySummaryDisabled}),
    }); 
     console.log('creating new form');
  }

  enableEditing(){
    this.editingOutput.emit(true);
  }

  disableEditing() {
    this.editingOutput.emit(false);
  }

  cancelEdit() {
    this.createForm();
    this.editingOutput.emit(false);
  }

  onSubmit() {
    this.addSummaryOutput.emit(this.summaryForm.value);
  }

  putSummary() {
    this.putSummaryOutput.emit(this.summaryForm.value);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if( changes['selectedDate'] || changes['dailySummary'] || changes['dailySummaryDisabled']){
      this.createForm();
    }
  }
}
