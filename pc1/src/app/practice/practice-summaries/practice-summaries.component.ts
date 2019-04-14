import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Practice, DailySummary } from '../../models';
import { PracticeService } from '../practice.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MatExpansionModule} from '@angular/material/expansion';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-practice-summaries',
  templateUrl: './practice-summaries.component.html',
  styleUrls: ['./practice-summaries.component.css']
})
export class PracticeSummariesComponent implements OnInit {
  @Input() practiceSlug: string;
  daily_summaries: DailySummary[] = null;
  show_practice_detail: boolean=false;
  show_form: boolean=false;
  show_bar: boolean=true;
  today = new Date();
  selected_month: Observable<string>;
  selected_year: Observable<string>;
  year_options: any = ["2018", "2019"];
  month_options: any = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]

  constructor(
  	private route: ActivatedRoute,
  	private router: Router,
  	private practiceService: PracticeService) {}
 
  ngOnInit() {
     this.route.queryParams.subscribe(
       (params)=>{
         this.selected_year = params['year'];
         this.selected_month = params['month'];
       }
     );
     
     this.route.paramMap.pipe(
       switchMap((params)=> this.practiceService.getPracticeSummaries(params.get('practiceSlug'), this.selected_year, this.selected_month)))
         .subscribe((summaries) => {
           this.show_bar = false;

           this.daily_summaries = summaries;
         });
  }

  selectNewYear(year) {
    this.daily_summaries = null;
    this.show_bar = true;
    this.route.paramMap.pipe(
    switchMap((params)=>this.practiceService.getPracticeSummaries(params.get('practiceSlug'), year.value, this.selected_month)))
      .subscribe((summaries) => {
        this.daily_summaries = summaries;
        this.show_bar = false;
       })
  }

  selectNewMonth(month){
    this.daily_summaries = null;
    this.show_bar = true;
    this.route.paramMap.pipe(
    switchMap((params)=>this.practiceService.getPracticeSummaries(params.get('practiceSlug'), this.selected_year, month.value)))
      .subscribe((summaries) => {
        this.daily_summaries = summaries;
        this.show_bar = false;
       })
  }

  toggleForm(){
    this.show_form = !this.show_form;
  }

  updateSummary(summary, summaryId) {
   this.practiceService.patchSummary(summary, this.practiceSlug, summaryId);
  }

  createSummary(summary) {
    for (let i=0; i < this.daily_summaries.length; i++) {
      if (this.daily_summaries[i].date == summary.date) {
       window.alert("A summary with this date already exists.  Edit the summary or choose a new date.")
      }
    }
    summary['practice'] = this.daily_summaries[0].practice;
    this.practiceService.postSummary(summary, this.practiceSlug);
    this.practiceService.selectPractice(this.practiceSlug);
  }
}
