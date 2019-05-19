import { Component, OnInit, Input } from '@angular/core';
import { Provider, DailySummary } from '../../models';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {
	@Input() provider: Provider;
	@Input() dailySummaries: DailySummary[]

  constructor() { }

  ngOnInit() {
  	this.dailySummaries = this.dailySummaries.filter((summary)=> summary.provider == this.provider.id)
  }

}
