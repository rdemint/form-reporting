import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from '../../models';
import { UserService } from '../../user/user.service';
import { ProviderService } from '../../provider/provider.service';
import { PracticeService } from '../../practice/practice.service';

import { Practice, DailySummary } from '../../models';

import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit {
  @Input() practice: Practice;
	providerForm = new FormControl();
  providerDailySummaries: DailySummary[];

  constructor(private userService: UserService, 
    private providerService: ProviderService,
    private practiceService: PracticeService
    ) { }

  ngOnInit() {  }
  

  getProviderSummaries(event) {
    this.providerDailySummaries = this.practice.daily_summaries.filter(
        (summary) => summary.provider = event.value
      );
  }


}
