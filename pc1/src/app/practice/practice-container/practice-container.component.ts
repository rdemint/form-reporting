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
  templateUrl: './practice-container.component.html',
  styleUrls: ['./practice-container.component.css']
})
export class PracticeContainerComponent implements OnInit {
  	user: User;
  	practice: Practice;
  	dailySummaries: DailySummary[];
    pyDailySummaries: DailySummary[];

  constructor(
    private practiceService: PracticeService,
    private dailySummaryService: DailySummaryService,
    private dateService: DateService,
    private userService: UserService,
    private route: ActivatedRoute,
  	) { }

  ngOnInit() {
  	    this.userService.loadUser().subscribe((user)=> this.user = user);
    combineLatest(this.route.paramMap, this.route.queryParamMap)
      .subscribe(
          ([params, queryparams]) => {
            this.practiceService.getPractice(params.get('practice_slug'))
              .subscribe(
                (practice)=> this.practice = practice
              );

             let getParams = {
              'practice': params.get('practice_slug'), 
              'year': queryparams.get('year'), 
              'month': queryparams.get('month')
            };
            this.getDailySummaries(getParams);
            this.getPYDailySummaries(getParams);
          }
        );
   }

  getDailySummaries(params) {
    this.dailySummaryService.getDailySummaries(params)
        .subscribe((dailySummaries)=> {
          this.dailySummaries = dailySummaries;
        });
  } 

  getPYDailySummaries(params) {
    this.dailySummaryService.getPYDailySummaries(params)
      .subscribe((pyDailySummaries)=> this.pyDailySummaries = pyDailySummaries)
  }

  setPreviousYear(yearString) {
    let previousYear = +yearString-1;
    return previousYear.toString();
  }

}
