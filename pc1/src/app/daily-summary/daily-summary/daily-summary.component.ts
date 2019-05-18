import { Input, Component, OnInit } from '@angular/core';
import { DailySummary, Practice, Provider } from '../../models';

@Component({
  selector: 'app-daily-summary',
  templateUrl: './daily-summary.component.html',
  styleUrls: ['./daily-summary.component.css']
})
export class DailySummaryComponent implements OnInit {
	@Input() practice: Practice;
	@Input() dailySummaries: DailySummary;
	@Input() provider: Provider;
	@Input() selectedDate: Date;

  constructor() { }

  ngOnInit() {
  }


}
