import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Practice, DailySummary } from '../../models';
@Component({
  selector: 'app-practice-list',
  templateUrl: './practice-list.component.html',
  styleUrls: ['./practice-list.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PracticeListComponent implements OnInit {
	@Input() practices: Practice[];
	@Input() dailySummaries: DailySummary[];
	
  constructor() { }

  ngOnInit() {
    console.log(this.dailySummaries);
  }

}
