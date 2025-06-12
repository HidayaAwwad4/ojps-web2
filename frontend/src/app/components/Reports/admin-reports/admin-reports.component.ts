import {AfterViewInit, Component, inject, PLATFORM_ID, ViewChild, ViewContainerRef} from '@angular/core';
import {StatsBoxComponent} from '../stats-box/stats-box.component';
import { Location } from '@angular/common';
import {isPlatformBrowser} from '@angular/common';
import {ReportsService} from '../../../services/Reports/reports.service';

@Component({
  selector: 'app-admin-reports',
  imports: [
    StatsBoxComponent,
  ],
  templateUrl: './admin-reports.component.html',
  standalone: true,
  styleUrl: './admin-reports.component.css'
})
export class AdminReportsComponent implements AfterViewInit {
  @ViewChild('chartContainer', { read: ViewContainerRef }) container!: ViewContainerRef;

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private location = inject(Location);
  private reportsService = inject(ReportsService);


  totalApplications =0;
  totalSeekers =0;
  totalEmployers =0;

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.loadChart();
    }
    this.fetchStats();
  }

  async loadChart() {
    const { BarChartAdminComponent } = await import('../bar-chart-admin/bar-chart-admin.component');
    this.container.createComponent(BarChartAdminComponent);
  }


  fetchStats(): void {
    this.reportsService.getAdminStats().subscribe({
      next: (response) => {
        const stats = response.data;
        this.totalApplications = stats.totalApplications;
        this.totalSeekers = stats.totalSeekers;
        this.totalEmployers = stats.totalEmployers;
      },
      error: (error) => {
        console.error('Error fetching stats:', error);
      }
    });
  }



  goBack() {
    this.location.back();
  }

}
