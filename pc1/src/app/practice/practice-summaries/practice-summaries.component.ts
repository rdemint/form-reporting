import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Practice, DailySummary } from '../../models';
import { PracticeService } from '../practice.service';
import { ChartData } from '../../models';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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
  daily_summaries: DailySummary[] = null;
  show_practice_detail: boolean=false;
  show_form: boolean=true;
  show_bar: boolean=true;
  today = new Date();
  selected_month: Observable<string>;
  selected_year: Observable<string>;
  year_options: any = ["2018", "2019"];
  month_options: any = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
  chart: any;
  chart_visits_data: ChartData[] = [];
  chart_workdays_data: ChartData[] = [];
  chart_noshows_data: ChartData[] = [];

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
           this.createChartData();
           this.createChart();
           this.chart.render();
         });
  }

  createChartData() {
       let data = this.daily_summaries.slice(0);
       data.reverse();
       for (let i=0; i<data.length; i++) {
       this.chart_visits_data.push(
         {label: data[i].date, y: data[i].visits}
       );
       this.chart_noshows_data.push(
         {label: data[i].date, y: data[i].noshows}
       );
       this.chart_workdays_data.push(
         {label: data[i].date, y: data[i].workdays}
         )
      }

  }

  clearChartData() {
    this.chart_visits_data = [];
    this.chart_noshows_data = [];
    this.chart_workdays_data = [];
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
    this.daily_summaries = null;
    this.show_bar = true;
    this.route.paramMap.pipe(
    switchMap((params)=>this.practiceService.getPracticeSummaries(params.get('practiceSlug'), year.value, this.selected_month)))
      .subscribe((summaries) => {
        this.daily_summaries = summaries;
        this.show_bar = false;
        this.clearChartData();
        this.createChartData();
        this.chart.data[0].set('dataPoints', this.chart_visits_data);
        this.chart.data[1].set('dataPoints', this.chart_workdays_data);
        this.chart.data[2].set('dataPoints', this.chart_noshows_data);
        this.chart.render();
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
        this.clearChartData();
        this.createChartData();
        this.chart.data[0].set('dataPoints', this.chart_visits_data);
        this.chart.data[1].set('dataPoints', this.chart_workdays_data);
        this.chart.data[2].set('dataPoints', this.chart_noshows_data);
        this.chart.render();
       
       });

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
  //  this.daily_summaries = null;
  //  this.show_bar = true;
  //  this.route.paramMap.pipe(
  //    switchMap((params)=>this.practiceService.getPracticeSummaries(params.get('practiceSlug'), this.selected_year, this.selected_month)))
  //     .subscribe((summaries) => {
  //       this.daily_summaries = summaries;
  //       this.show_bar = false;
  //      });
  }

  createSummary(summary) {
    summary['practice'] = this.daily_summaries[0].practice;
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
