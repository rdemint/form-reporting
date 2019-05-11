import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Practice, DailySummary } from '../../models';
import { EntityService } from '../../entity/entity.service';
import * as CanvasJs from '../../../../node_modules/canvasjs/canvasjs.min.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})


export class ChartComponent implements OnInit, AfterViewInit {
@Input() dailySummaries: DailySummary[];
@Input() sourceId: string;

chart: any;
chartName: string;
chart_data: any = {
  noshows: [],
  workdays: [],
  visits: [], 
}

  constructor(private entityService: EntityService) { }

  ngOnInit() {
    this.chart_data.visits = this.dailySummaries.map((summary)=> ({label: summary.date, y: summary.visits}));
    this.chart_data.noshows = this.dailySummaries.map((summary)=> ({label: summary.date, y: summary.noshows})); 
    this.chart_data.workdays = this.dailySummaries.map((summary)=> ({label: summary.date, y: summary.workdays}));
    this.chartName = 'chartContainer'+ this.sourceId;
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

  ngAfterViewInit() {
    this.createChart();
    this.chart.render()
  }

}
