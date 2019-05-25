import { Component, OnInit, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Practice, DailySummary } from '../../models';
import * as CanvasJs from '../../../../node_modules/canvasjs-2.3.1/canvasjs.min.js';

@Component({
  selector: 'app-daily-summary-chart',
  templateUrl: './daily-summary-chart.component.html',
  styleUrls: ['./daily-summary-chart.component.css']
})
export class DailySummaryChartComponent implements OnInit, AfterViewInit {
@Input() dailySummaries: DailySummary[];
@Input() dataLabels: string[];

@Input() pyComparison: boolean;
@Input() pyDailySummaries: DailySummary[];
@Input() pyComparisonLabels: string[];
@Input() chartName: string;

current_year: string;
previous_year: string;
chart: any;
canvasJsData: any = []
summary_data: any = {
  noshows: [],
  workdays: [],
  visits: [], 
  visits_per_workday: []
}

pySummary_data: any = {
  noshows: [],
  workdays: [],
  visits: [], 
  visits_per_workday: []
}

  constructor( ) { }

  ngOnInit() {
    this.setYears();
  	this.createChartData();

  }

  setYears() {
    this.current_year = this.dailySummaries[0].date.slice(0,4);
    this.previous_year = this.pyDailySummaries[0].date.slice(0,4);
  }

  createChartData() {
  	if (this.pyComparison == true) {
  		// create summary data for current and previous year
  		// for each in pyComparison labels, build a chart data object for the current year and previous year using summary data
  		this._createCYSummaryData(this.pyComparisonLabels);
  		this._createPYSummaryData(this.pyComparisonLabels);
  		this.pushCanvasJsData(this.pyComparisonLabels, this.summary_data, this.current_year);
  		this.pushCanvasJsData(this.pyComparisonLabels, this.pySummary_data, this.previous_year);
  	}
  	else {
  		// Create current year summary data for each of the labels specified
  		this._createCYSummaryData(this.dataLabels);
  		this.pushCanvasJsData(this.dataLabels, this.summary_data, this.current_year);
  	}
  }

  _createCYSummaryData(labels) {
   	labels.forEach(
   		(dataLabel)=> {
   			let summaries = this.dailySummaries.map((summary)=> { return {label: summary.date.substring(5), y: summary[dataLabel]} });
   			this.summary_data[dataLabel] = summaries;
    });
  }

  _createPYSummaryData(labels) {
  	labels.forEach(
   		(dataLabel)=> {
   			let pySummaries = this.pyDailySummaries.map((summary)=> { return {label: summary.date.substring(5), y: summary[dataLabel]} })
   			this.pySummary_data[dataLabel] = pySummaries;
    });
  }

  pushCanvasJsData(labels, data, year) {
     labels.forEach(
  	     	(dataLabel)=>  {
           let dataName = year + ' ' + dataLabel; 
  	     		this.canvasJsData.push({
		             type: "spline",
		             visible: true,
		             showInLegend: true,
		             name: dataName,
		             dataPoints: data[dataLabel]
		           });
       });
  }

    createChart() {
         this.chart = new CanvasJs.Chart(this.chartName, {
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
         data: this.canvasJsData
       });
    }

    ngAfterViewInit() {
      this.createChart();
      this.chart.render();
    }

}
