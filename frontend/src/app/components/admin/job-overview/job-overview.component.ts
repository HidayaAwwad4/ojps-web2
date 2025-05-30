import { Component, Inject, PLATFORM_ID, OnInit, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import {
  ChartConfiguration,
  ChartType,
  Chart,
  registerables
} from 'chart.js';
import { AdminService } from '../../../services/admin/admin.service';

Chart.register(...registerables);

@Component({
  selector: 'app-job-overview',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './job-overview.component.html',
  styleUrls: ['./job-overview.component.css']
})
export class JobOverviewComponent implements OnInit {
  isBrowser = false;

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartType: ChartType = 'bar';

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  public barChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [
      {
        label: 'Applications',
        data: [],
        backgroundColor: '#631B1B'
      }
    ]
  };

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private adminService: AdminService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.loadApplicationStats();
  }

  loadApplicationStats(): void {
    this.adminService.getApplicationsStats().subscribe((data) => {
      const monthLabels = data.map((item: any) => {
        const date = new Date(item.month + '-01');
        return date.toLocaleString('default', { month: 'short' });
      });
      const totals = data.map((item: any) => item.total);

      this.barChartData.labels = monthLabels;
      this.barChartData.datasets[0].data = totals;

      this.chart?.update();
    });
  }
}
