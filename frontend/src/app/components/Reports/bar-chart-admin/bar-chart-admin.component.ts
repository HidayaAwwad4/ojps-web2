import {Component, inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser, NgIf} from '@angular/common';
import {BaseChartDirective} from 'ng2-charts';
import {ReportsService} from '../../../services/Reports/reports.service';


interface BarChartItem {
  category: string;
  total: number;
}

@Component({
  selector: 'app-bar-chart-admin',
  imports: [
    BaseChartDirective,
    NgIf
  ],
  templateUrl: './bar-chart-admin.component.html',
  styleUrl: './bar-chart-admin.component.css'
})
export class BarChartAdminComponent implements OnInit {
  isBrowser: boolean;
  private reportsService = inject(ReportsService);

  public barChartLabels: string[] = [];

  public barChartData = {
    labels: this.barChartLabels,
    datasets: [
      {
        label: 'Job Applications per Department',
        data: [] as number[],
        backgroundColor: 'rgb(149,63,63)',
        borderColor: 'rgb(99, 27, 27)',
        borderWidth: 1
      }
    ]
  };

  public barChartOptions = {
    responsive: true,
  };

  constructor() {
    const platformId = inject(PLATFORM_ID);
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.reportsService.getAdminBarchartData().subscribe({
        next: (response: BarChartItem[]) => {
          if (response && Array.isArray(response)) {
            const sorted = response.sort((a, b) => b.total - a.total);

            this.barChartLabels = sorted.map((item) => item.category);
            this.barChartData.labels = this.barChartLabels;
            this.barChartData.datasets[0].data = sorted.map((item) => item.total);
          } else {
            console.warn('No valid bar chart data received');
          }
        },
        error: (error) => {
          console.error('Failed to load bar chart data', error);
        }
      });
    }
  }
}
