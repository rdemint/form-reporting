import { Component, OnInit, ElementRef, Input, Output, ViewChild, EventEmitter, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Practice, DailySummary } from '../../models'

@Component({
  selector: 'app-daily-summary-form',
  templateUrl: './daily-summary-form.component.html',
  styleUrls: ['./daily-summary-form.component.css']
})
export class DailySummaryFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {  }

}
