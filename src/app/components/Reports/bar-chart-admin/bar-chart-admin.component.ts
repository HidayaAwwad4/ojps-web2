import {Component, inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser, NgIf} from '@angular/common';
import {BaseChartDirective} from 'ng2-charts';

@Component({
  selector: 'app-bar-chart-admin',
  imports: [
    BaseChartDirective,
    NgIf
  ],
  templateUrl: './bar-chart-admin.component.html',
  styleUrl: './bar-chart-admin.component.css'
})
export class BarChartAdminComponent {
  isBrowser: boolean;

  constructor() {
    const platformId = inject(PLATFORM_ID);
    this.isBrowser = isPlatformBrowser(platformId);
  }

  public barChartOptions = {
    responsive: true,
  };

  public barChartLabels: string[] = ['IT', 'Marketing', 'Design', 'Sales'];

  public barChartData = {
    labels: this.barChartLabels,
    datasets: [
      {
        data: [0, 50, 100, 150, 200, 250, 300],
        backgroundColor: 'rgb(149,63,63)',
        borderColor: 'rgb(99, 27, 27)',
        borderWidth: 1
      }
    ]
  };
}
