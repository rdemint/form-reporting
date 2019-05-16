import { Input, Component, OnInit } from '@angular/core';
import { Provider, DailySummary } from '../../models';

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.css']
})
export class ProviderListComponent implements OnInit {
	@Input() providers: Provider[]
	@Input() dailySummaries: DailySummary[];
	
  constructor() { }

  ngOnInit() {
  }

}
