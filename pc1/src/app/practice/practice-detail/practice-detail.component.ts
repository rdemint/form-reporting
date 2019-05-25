import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DailySummary, Practice } from '../../models';

@Component({
  selector: 'app-practice-detail',
  templateUrl: './practice-detail.component.html',
  styleUrls: ['./practice-detail.component.css']
})
export class PracticeDetailComponent implements OnInit {
	@Input() practice: Practice;
	@Input() dailySummaries: DailySummary[];
	@Input() pyDailySummaries: DailySummary[];
	chart1Labels = ['visits'];

  constructor(private router: Router) { }

  ngOnInit() {
  }

navToReporting() {
  	this.router.navigate(['practices', this.practice.slug, 'reporting'], {preserveQueryParams: true})
  }

}
