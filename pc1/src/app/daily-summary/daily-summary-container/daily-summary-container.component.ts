import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DailySummary, User, Practice } from '../../models';
import { DailySummaryService } from '../../daily-summary/daily-summary.service';
import { environment } from '../../../environments/environment';
import { UserService } from '../../user/user.service';
import { DateService } from '../../date.service';
import { PracticeService } from '../../practice/practice.service';
import { combineLatest, Observable } from 'rxjs';

@Component({
  selector: 'app-practice-container',
  templateUrl: './daily-summary-container.component.html',
  styleUrls: ['./daily-summary-container.component.css']
})
export class DailySummaryContainerComponent implements OnInit {
    user: User;
    practice: Practice;
    dailySummaries: DailySummary[];

  constructor(
    private practiceService: PracticeService,
    private dailySummaryService: DailySummaryService,
    private dateService: DateService,
    private userService: UserService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    // this container has the same functionality as practice-container
    // the two could be merged with a behaviorsubject service combination
    // (on the to-do list)
    this.userService.loadUser().subscribe((user)=> this.user = user);
    combineLatest(this.route.paramMap, this.route.queryParamMap)
      .subscribe(
          ([params, queryparams]) => {
            this.practiceService.getPractice(params.get('practice_slug'))
              .subscribe(
                (practice)=> this.practice = practice
              );
            this.getDailySummaries({
              'practice': params.get('practice_slug'), 
              'year': queryparams.get('year'), 
              'month': queryparams.get('month')
            });
          }
        );
   }

  getDailySummaries(params) {
    this.dailySummaryService.getDailySummaries(params)
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
