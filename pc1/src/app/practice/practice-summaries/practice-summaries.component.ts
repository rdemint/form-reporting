import { Component, OnInit } from '@angular/core';
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
	practice: Practice;
  summary_list: DailySummary[];
  show_practice_detail: boolean=false;
  show_form: boolean=false;

  constructor(
  	private route: ActivatedRoute,
  	private router: Router,
  	private practiceService: PracticeService
  ) {
     this.route.paramMap.pipe(
       switchMap((params)=> this.practiceService.selectPractice(params.get('practiceSlug'))))
         .subscribe((practice) => this.practice = practice);
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
   this.practiceService.patchSummary(summary, this.practice.slug, summaryId);
  }

  createSummary(summary) {
    for (let i=0; i < this.practice.daily_summaries.length; i++) {
      if (this.practice.daily_summaries[i].date == summary.date) {
       window.alert("A summary with this date already exists.  Edit the summary or choose a new date.")
      }
    }
    summary['practice'] = this.practice.id;
    this.practiceService.postSummary(summary, this.practice.slug);
    this.practiceService.selectPractice(this.practice.slug);
    return {"success": true, "message": "Daily summary created"}
  }
}
