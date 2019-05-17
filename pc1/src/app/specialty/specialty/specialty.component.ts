import { Input, Component, OnInit } from '@angular/core';
import { Specialty, DailySummary } from '../../models';

@Component({
  selector: 'app-specialty',
  templateUrl: './specialty.component.html',
  styleUrls: ['./specialty.component.css']
})
export class SpecialtyComponent implements OnInit {
	@Input() specialty: Specialty;
	@Input() dailySummaries: DailySummary[];
  constructor() { }

  ngOnInit() {
  	this.dailySummaries = this.dailySummaries.filter((summary)=> summary.specialty == this.specialty.name)
  }

}
