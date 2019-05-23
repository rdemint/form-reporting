import { Component, OnInit } from '@angular/core';
import { DailySummary, User, Practice } from '../../models';
import { DailySummaryService } from '../../daily-summary/daily-summary.service';
import { environment } from '../../../environments/environment';
import { UserService } from '../../user/user.service';
import { DateService } from '../../date.service';
import { PracticeService } from '../../practice/practice.service';

@Component({
  selector: 'app-practice-container',
  templateUrl: './practice-container.component.html',
  styleUrls: ['./practice-container.component.css']
})
export class PracticeContainerComponent implements OnInit {
  	user: User;
  	practice: Practice;
  	selected_practice_slug: 'carolina-health';
  	dailySummaries: DailySummary[];

  constructor(
    private practiceService: PracticeService,
    private dailySummaryService: DailySummaryService,
    private dateService: DateService,
    private userService: UserService,
  	) { }

  ngOnInit() {
  	this.userService.loadUser().subscribe((user)=> this.user = user);
  	this.practiceService.getPractice(this.selected_practice_slug).subscribe((practice)=> {
    this.practice = practice;
    this.getDailySummaries();
   });
  }

  getDailySummaries() {
    this.dailySummaryService.getDailySummaries({'practice': this.practice.slug, 'year': this.dateService.default_year, 'month': this.dateService.default_month})
        .subscribe((dailySummaries)=> {
          this.dailySummaries = dailySummaries;
        });
  } 

}
