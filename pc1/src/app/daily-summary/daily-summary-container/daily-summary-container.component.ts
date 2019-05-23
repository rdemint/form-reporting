import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { DailySummary, User, Practice, Provider } from '../../models';
import { DailySummaryService } from '../../daily-summary/daily-summary.service';
import { environment } from '../../../environments/environment';
import { UserService } from '../../user/user.service';
import { DateService } from '../../date.service';
import { PracticeService } from '../../practice/practice.service';


@Component({
  selector: 'app-daily-summary-container',
  templateUrl: './daily-summary-container.component.html',
  styleUrls: ['./daily-summary-container.component.css'],
  providers: [MatSnackBar]
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
    private userService: UserService, 
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  	this.userService.loadUser().subscribe((user)=> this.user = user);
  	this.practiceService.getPractice(this.selected_practice_slug).subscribe((practice)=> this.practice = practice);
    this.getDailySummaries();
  }
    
   getDailySummaries() {
    this.dailySummaryService.getDailySummaries({'practice': this.selected_practice_slug, 'year': this.dateService.default_year, 'month': this.dateService.default_month})
        .subscribe((dailySummaries)=> {
          this.dailySummaries = dailySummaries;
    	});
    }

    addSummary(dailySummary) {
      this.dailySummaryService.postSummary(dailySummary);
      this.dailySummaries.push(dailySummary);
      this.dailySummaries = this.dailySummaries.slice();
    }

    putSummary(dailySummary) {
      // Updates the summary in memory to a getDailySummaries API call
      // Sets the user ID to populate the submitted_by property field.  PUTS the summary to the backend
      let id = dailySummary['id'];
      let originalSummary = this.dailySummaries.filter((summary)=> summary.id == id)[0];
      let index = this.dailySummaries.indexOf(originalSummary);
      this.dailySummaries[index] = dailySummary;
      this.dailySummaries = this.dailySummaries.slice();

      dailySummary['submitted_by'] = this.user.id;
      this.dailySummaryService.putSummary(dailySummary, id);
    }

}
