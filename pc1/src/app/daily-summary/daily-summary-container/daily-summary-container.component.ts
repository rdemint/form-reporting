import { Component, OnInit } from '@angular/core';
import { DailySummary, User, Practice, Provider } from '../../models';
import { DailySummaryService } from '../../daily-summary/daily-summary.service';
import { environment } from '../../../environments/environment';
import { UserService } from '../../user/user.service';
import { DateService } from '../../date.service';
import { PracticeService } from '../../practice/practice.service';

@Component({
  selector: 'app-daily-summary-form-container',
  templateUrl: './daily-summary-form-container.component.html',
  styleUrls: ['./daily-summary-form-container.component.css']
})
export class DailySummaryContainerComponent implements OnInit {
	user: User;
	practice: Practice;
	selected_practice_slug = 'carolina-health';
	providers: Provider[];
	dailySummaries: DailySummary[];

  constructor(
  	private practiceService: PracticeService,
    private dailySummaryService: DailySummaryService,
    private dateService: DateService,
    private userService: UserService) { }

  ngOnInit() {
  	this.userService.loadUser().subscribe((user)=> this.user = user);
  	this.practiceService.getPractice(this.selected_practice_slug).subscribe((practice)=> this.practice = practice);
    this.getDailySummaries();
  }
    
   getDailySummaries() {
    this.dailySummaryService.getDailySummaries({'practice': this.selected_practice_slug, 'year': this.dateService.year, 'month': this.dateService.month})
        .subscribe((dailySummaries)=> {
          this.dailySummaries = dailySummaries;
    	});
    }

}
