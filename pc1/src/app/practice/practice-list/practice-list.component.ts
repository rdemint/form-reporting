import { Component, OnInit, Input } from '@angular/core';
import { Practice, DailySummary } from '../../models';
@Component({
  selector: 'app-practice-list',
  templateUrl: './practice-list.component.html',
  styleUrls: ['./practice-list.component.css']
})
export class PracticeListComponent implements OnInit {
	@Input() practices: Practice[];
  constructor() { }

  ngOnInit() {
  }

}
