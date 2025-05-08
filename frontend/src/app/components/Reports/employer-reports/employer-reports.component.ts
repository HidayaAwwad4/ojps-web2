import { Component } from '@angular/core';
import {StatsBoxComponent} from '../stats-box/stats-box.component';
import {LineChartEmployerComponent} from '../line-chart-employer/line-chart-employer.component';

@Component({
  selector: 'app-employer-reports',
  imports: [
    StatsBoxComponent,
    LineChartEmployerComponent
  ],
  templateUrl: './employer-reports.component.html',
  styleUrl: './employer-reports.component.css'
})
export class EmployerReportsComponent {
  goBack() {

  }
}
