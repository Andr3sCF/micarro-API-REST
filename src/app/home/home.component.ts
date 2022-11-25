import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public emailChartType: ChartType;
    public emailChartData: any;
    public emailChartLegendItems: LegendItem[];

    public hoursChartType: ChartType;
    public hoursChartData: any;
    public hoursChartOptions: any;
    public hoursChartResponsive: any[];
    public hoursChartLegendItems: LegendItem[];

    public activityChartType: ChartType;
    public activityChartData: any;
    public activityChartOptions: any;
    public activityChartResponsive: any[];
    public activityChartLegendItems: LegendItem[];
  constructor() { }

  ngOnInit() {
      this.emailChartType = ChartType.Pie;
      this.emailChartData = {
        labels: ['62%', '38%'],
        series: [62, 38]
      };
      this.emailChartLegendItems = [
        { title: 'Proximo a vencer', imageClass: 'fa fa-circle text-info' },
        { title: 'Legal', imageClass: 'fa fa-circle text-danger' }
  
      ];

      this.hoursChartType = ChartType.Line;
      this.hoursChartData = {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Agost', 'Sep', 'Oct', 'Nov', 'Dic'],
        series: [
          [287, 385, 490, 492, 554, 586, 698, 695, 752, 788, 846, 944],
          [23, 113, 67, 108, 190, 239, 307, 308, 439, 410, 410, 509]
        ]
      };
      this.hoursChartOptions = {
        low: 0,
        high: 800,
        showArea: true,
        height: '245px',
        axisX: {
          showGrid: false,
        },
        lineSmooth: Chartist.Interpolation.simple({
          divisor: 3
        }),
        showLine: false,
        showPoint: false,
      };
      this.hoursChartResponsive = [
        ['screen and (max-width: 640px)', {
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      this.hoursChartLegendItems = [
        { title: 'Precio del año pasado', imageClass: 'fa fa-circle text-info' },
        { title: 'Precio actual', imageClass: 'fa fa-circle text-danger' }
      ];

      this.activityChartType = ChartType.Bar;
      this.activityChartData = {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Agost', 'Sep', 'Oct', 'Nov', 'Dic'],
        series: [
          [950, 950, 950, 950, 950, 950, 950, 950, 950, 950, 950, 950],
          [950, 900, 850, 750, 700, 650, 600, 550, 500, 450, 400, 350]
        ]
      };
      this.activityChartOptions = {
        seriesBarDistance: 10,
        axisX: {
          showGrid: false
        },
        height: '245px'
      };
      this.activityChartResponsive = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      this.activityChartLegendItems = [
        { title: 'Carro nuevo', imageClass: 'fa fa-circle text-info' },
        { title: 'Carro usado', imageClass: 'fa fa-circle text-danger' }
      ];

    }

}
