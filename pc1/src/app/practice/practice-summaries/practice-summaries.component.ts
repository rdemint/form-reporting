import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Practice, DailySummary } from '../../models';
import { PracticeService } from '../practice.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-practice-summaries',
  templateUrl: './practice-summaries.component.html',
  styleUrls: ['./practice-summaries.component.css']
})
export class PracticeSummariesComponent implements OnInit {
  @Input() practiceSlug: string;
  daily_summaries: DailySummary[];
  show_practice_detail: boolean=false;
  show_form: boolean=false;

  constructor(
  	private route: ActivatedRoute,
  	private router: Router,
  	private practiceService: PracticeService
  ) {
     this.route.paramMap.pipe(
       switchMap((params)=> this.practiceService.getPracticeSummaries(params.get('practiceSlug'))))
         .subscribe((summaries) => this.daily_summaries = summaries);
   }
  ngOnInit() {}

  navPracticeDetail(summaryId: string){
    this.router.navigate(['summaryId']);
  }

  toggleForm(){
    this.show_form = !this.show_form;
  }

  updateSummary(summary, summaryId) {
    console.log(summary);
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
