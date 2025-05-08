import { Component } from '@angular/core';
import {BaseChartDirective} from 'ng2-charts';
import {ChartConfiguration} from 'chart.js';

@Component({
  selector: 'app-line-chart-employer',
  imports: [
    BaseChartDirective
  ],
  templateUrl: './line-chart-employer.component.html',
  styleUrl: './line-chart-employer.component.css'
})
export class LineChartEmployerComponent {
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Developer', 'Designer', 'Developer', 'Designer', 'Developer', 'Designer', 'Developer'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(99,27,27)',
        tension: 0.1
      }
    ]
  };
}
