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
  show_form: boolean=true;
  show_loading: boolean=true;
  selected_month:number;
  selected_year:number;
  chart: any;

  practice$: Observable<Practice>;
  practice: Practice;
  
  chart_visits_data: ChartData[];
  chart_workdays_data: ChartData[];
  noshows: ChartData[];

  constructor(
  	private route: ActivatedRoute,
  	private router: Router,
  	private practiceService: PracticeService,
    private dateService: DateService
    ) {}
 
  ngOnInit() {
    this.getQueryParams();
    this.getDailySummaries();
    this.createChartData();
    this.practiceService.loadPractice().subscribe((practice)=>this.practice = practice)
    this.show_loading = false;
  }

  getDailySummaries() {  }

  getQueryParams() {
    this.route.queryParams.subscribe(
       (queryparams)=>{
         this.selected_year = queryparams['year'];
         this.selected_month = queryparams['month'];
       }
     );
  }

  createChartData() {
      this.practice$.subscribe(
        (practice)=> {
          this.practice = practice;
          this.practice['chart_data'] = {};
          this.practice.chart_data['noshows'] = practice.daily_summaries.map((summary)=> ({label: summary.date, y: summary.noshows}));
          this.practice.chart_data['workdays'] = practice.daily_summaries.map((summary)=> ({label: summary.date, y: summary.workdays}));
          this.practice.chart_data['visits'] = practice.daily_summaries.map((summary)=> ({label: summary.date, y: summary.visits}));
          //this setup ensures that the data is present when the chart is first rendered
          this.show_loading = false;
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
           dataPoints: this.practice.chart_data.visits
         },
         {
           type: "spline",
           visible: true,
           showInLegend: true,
           name: "Workdays",
           dataPoints: this.practice.chart_data.workdays
         },
         {
           type: "spline",
           visible: true,
           showInLegend: true,
           name: "No Shows",
           dataPoints: this.practice.chart_data.noshows
         }
       ]
     });
  }

  selectNewYear(year) {
    this.show_loading = true;
    this.dateService.selected_year$.next(year);
    this.router.navigate(['practices/', this.practice.slug], {queryParams: {month: this.selected_month, year: year}});

  }

  selectNewMonth(month){
    this.show_loading = true;
    this.dateService.selected_month$.next(month);
    this.router.navigate(['practices/', this.practice.slug], {queryParams: {month: month.value, year: this.selected_year}});
  }

  toggleForm(){
    this.show_form = !this.show_form;
  }

  updateSummary(summary, summaryId) {
   this.practiceService.patchSummary(summary, this.practice.slug, summaryId)
     .subscribe(
       (resp)=> window.alert("Summary successfully updated"),
       (error)=> window.alert(error)
       );
  }

  createSummary(summary) {
    summary['practice'] = this.practice.id
    this.practiceService.postSummary(summary, this.practice.slug)
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
