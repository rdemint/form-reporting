import { Component, OnInit, ElementRef, Input, Output, ViewChild, EventEmitter, HostListener} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Practice, DailySummary } from '../../models';
import { Observable } from 'rxjs';
import { PracticeService } from '../../practice/practice.service';
import { MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-practice-form',
  templateUrl: './practice-form.component.html',
  styleUrls: ['./practice-form.component.css']
})
export class PracticeFormComponent implements OnInit {
	@Input() name: string;
	@Input() slug: string;
	outPractice = new EventEmitter<Practice>();

  constructor(private practiceService: PracticeService) { }

  ngOnInit() { }

  onSubmit(form: NgForm) {
  	var practice: Practice = {
  		name: form.value.name,
  		slug: form.value.slug
    };
    this.practiceService.postPractice(practice);
    form.reset();
  	}

  }
