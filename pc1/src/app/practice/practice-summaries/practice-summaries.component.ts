import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Practice, DailySummary } from '../../models';
import { PracticeService } from '../practice.service';
import { DateService } from '../../date.service';
import { ChartData } from '../../models';
import { Observable } from 'rxjs';
import { switchMap, map, filter, pluck, tap, combineLatest } from 'rxjs/operators';
import { MatExpansionModule} from '@angular/material/expansion';
import { trigger, state, style, animate, transition } from '@angular/animations';
import * as CanvasJs from '../../../../node_modules/canvasjs/canvasjs.min.js';

@Component({
  selector: 'app-practice-summaries',
  templateUrl: './practice-summaries.component.html',
  styleUrls: ['./practice-summaries.component.css']
})
export class PracticeSummariesComponent implements OnInit {
  @Input() practiceSlug: string;
  daily_summaries$: Observable<DailySummary[]>;
  show_practice_detail: boolean=false;
  show_form: boolean=true;
  show_bar: boolean=true;
  today = new Date();
  selected_month:number;
  selected_year:number;
  practice_slug: string;
  chart: any;
  
  chart_visits_data: ChartData[];
  chart_workdays_data: ChartData[];
  chart_noshows_data: ChartData[];

  constructor(
  	private route: ActivatedRoute,
  	private router: Router,
  	private practiceService: PracticeService,
    private dateService: DateService
    ) {}
 
  ngOnInit() {
    this.getQueryParams();
    this.getParams();
    this.show_bar = false;
    this.getDailySummaries();
    this.createChartData();
  }

  getDailySummaries() {
    this.route.queryParams.subscribe(
          (params)=> {
            this.practiceService.getDailySummaries(
              this.practice_slug, 
              params['year'], 
              params['month']
            );
            this.daily_summaries$ = this.practiceService.loadDailySummaries();
          }
    );
  }

  getQueryParams() {
    this.route.queryParams.subscribe(
       (queryparams)=>{
         this.selected_year = queryparams['year'];
         this.selected_month = queryparams['month'];
       }
     );
  }

  getParams() {
    this.route.params.subscribe(
       (params) => this.practice_slug = params['practiceSlug']
    );
  }

  createChartData() {
      this.daily_summaries$.subscribe(
        (summaries)=> {
          this.chart_noshows_data = summaries.map((summary)=> ({label: summary.date, y: summary.noshows}));
          this.chart_workdays_data = summaries.map((summary)=> ({label: summary.date, y: summary.workdays}));
          this.chart_visits_data = summaries.map((summary)=> ({label: summary.date, y: summary.visits}));
          //this setup ensures that the data is present when the chart is first rendered
          this.show_bar = false;
          this.createChart();
          this.chart.render();
        }
     )
  }

  createChart() {
       this.chart = new CanvasJs.Chart('chartContainer', {
       theme: "light2",
       animationEnabled: false,
       exportEnabled: true,
       axisX : {
         title: "Date",
         includeZero: false
       },
       axisY : {
         includeZero: false,
         title: "Count",
       },
       tooltip: {
         cursor: "pointer"
       },
       legend: {
         cursor: "pointer"
       },
       data: [
         {
           type: "spline",
           visible: true,
           showInLegend: true,
           name: "Visits",
           dataPoints: this.chart_visits_data
         },
         {
           type: "spline",
           visible: true,
           showInLegend: true,
           name: "Workdays",
           dataPoints: this.chart_workdays_data
         },
         {
           type: "spline",
           visible: true,
           showInLegend: true,
           name: "No Shows",
           dataPoints: this.chart_noshows_data
         }
       ]
     });
  }

  selectNewYear(year) {
    this.daily_summaries$ = null;
    this.show_bar = true;
    this.dateService.selected_year$.next(year);
    this.router.navigate(['practices/', this.practice_slug], {queryParams: {month: this.selected_month, year: year}});

  }

  selectNewMonth(month){
    this.daily_summaries$ = null;
    this.show_bar = true;
    this.dateService.selected_month$.next(month);
    this.router.navigate(['practices/', this.practice_slug], {queryParams: {month: month.value, year: this.selected_year}});
    // this.route.paramMap.pipe(
    // switchMap((params)=>this.practiceService.getPracticeSummaries(params.get('practiceSlug'), this.selected_year, month.value)))
    //   .subscribe((summaries) => {
    //     this.daily_summaries$ = summaries;
    //     this.show_bar = false;
    //     this.clearChartData();
    //     this.createChartData();
    //     this.chart.data[0].set('dataPoints', this.chart_visits_data);
    //     this.chart.data[1].set('dataPoints', this.chart_workdays_data);
    //     this.chart.data[2].set('dataPoints', this.chart_noshows_data);
    //     this.chart.render();
       
    //    });

  }

  toggleForm(){
    this.show_form = !this.show_form;
  }

  updateSummary(summary, summaryId) {
   this.practiceService.patchSummary(summary, this.practiceSlug, summaryId)
     .subscribe(
       (resp)=> window.alert("Summary successfully updated"),
       (error)=> window.alert(error)
       );
  //  this.daily_summaries$ = null;
  //  this.show_bar = true;
  //  this.route.paramMap.pipe(
  //    switchMap((params)=>this.practiceService.getPracticeSummaries(params.get('practiceSlug'), this.selected_year, this.selected_month)))
  //     .subscribe((summaries) => {
  //       this.daily_summaries$ = summaries;
  //       this.show_bar = false;
  //      });
  }

  createSummary(summary) {
    summary['practice'] = this.daily_summaries$[0].practice;
    this.practiceService.postSummary(summary, this.practiceSlug)
      .subscribe(
        (location)=> location, 
        (error)=> {
          if (error.error.non_field_errors) {
            window.alert(error.error.non_field_errors)
          }
          else {
            window.alert("Could not create the summary.  Please double check the input and try again.");
          }
    });
  }
}
