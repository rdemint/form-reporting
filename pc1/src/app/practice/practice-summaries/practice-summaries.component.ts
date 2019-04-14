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
  month: Observable<string>;z
  year: Observable<string>;

  constructor(
  	private route: ActivatedRoute,
  	private router: Router,
  	private practiceService: PracticeService) {}
 
  ngOnInit() {
     console.log(this.route.snapshot.queryParams);
     this.route.queryParams.subscribe(
       (params)=>{
         this.year = params['year'];
         this.month = params['month'];
       }
     );
     
     this.route.paramMap.pipe(
       switchMap((params)=> this.practiceService.getPracticeSummaries(params.get('practiceSlug'), this.year, this.month)))
         .subscribe((summaries) => {
           this.show_bar = false;

           this.daily_summaries = summaries;
         });
  }

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
