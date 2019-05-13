import { Component, OnInit, Input } from '@angular/core';
import { Practice, DailySummary } from '../../models';
import * as CanvasJs from '../../../../node_modules/canvasjs/canvasjs.min.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})


export class ChartComponent implements OnInit {
@Input() dailySummaries: DailySummary[];
chart: any;
chart_data: any;

  constructor() { }

  ngOnInit() {
  	this.createChartData();
  	this.createChart();
  }

    createChartData() {
          this.chart_data['noshows'] = this.dailySummaries.map((summary)=> ({label: summary.date, y: summary.noshows}));
          this.chart_data['workdays'] = this.dailySummaries.map((summary)=> ({label: summary.date, y: summary.workdays}));
          this.chart_data['visits'] = this.dailySummaries.map((summary)=> ({label: summary.date, y: summary.visits}));
          this.createChart();
          this.chart.render();
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
           dataPoints: this.chart_data.visits
         },
         {
           type: "spline",
           visible: true,
           showInLegend: true,
           name: "Workdays",
           dataPoints: this.chart_data.workdays
         },
         {
           type: "spline",
           visible: true,
           showInLegend: true,
           name: "No Shows",
           dataPoints: this.chart_data.noshows
         }
       ]
     });
  }

}
