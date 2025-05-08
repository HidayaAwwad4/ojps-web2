import { Component } from '@angular/core';
import {BarChartAdminComponent} from '../bar-chart-admin/bar-chart-admin.component';
import {StatsBoxComponent} from '../stats-box/stats-box.component';

@Component({
  selector: 'app-admin-reports',
  imports: [
    BarChartAdminComponent,
    StatsBoxComponent
  ],
  templateUrl: './admin-reports.component.html',
  styleUrl: './admin-reports.component.css'
})
export class AdminReportsComponent {
  goBack() {

  }
}
