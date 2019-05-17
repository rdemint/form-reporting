import { Input, Component, OnInit } from '@angular/core';
import { DailySummary, Practice } from '../../models';

@Component({
  selector: 'app-daily-summary',
  templateUrl: './daily-summary.component.html',
  styleUrls: ['./daily-summary.component.css']
})
export class DailySummaryComponent implements OnInit {
	@Input() practice: Practice;
	@Input() dailySummaries: DailySummary; 

  constructor() { }

  ngOnInit() {
  }

}
