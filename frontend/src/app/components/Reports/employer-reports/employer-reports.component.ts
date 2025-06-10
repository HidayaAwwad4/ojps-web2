        import {Component, inject, PLATFORM_ID, ViewChild, ViewContainerRef} from '@angular/core';
import {StatsBoxComponent} from '../stats-box/stats-box.component';
import { Location } from '@angular/common';
import {isPlatformBrowser} from '@angular/common';
import {ReportsService} from '../../../services/Reports/reports.service';

@Component({
  selector: 'app-employer-reports',
  imports: [
    StatsBoxComponent,
  ],
  templateUrl: './employer-reports.component.html',
  styleUrl: './employer-reports.component.css'
})
export class EmployerReportsComponent {
  @ViewChild('chartContainer', { read: ViewContainerRef }) container!: ViewContainerRef;

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private location = inject(Location);
  private reportsService = inject(ReportsService);


  applicationsReceived =0;
  applicationsSaved = 0;


  ngAfterViewInit(): void {
    if (this.isBrowser){
      this.loadChart();
    }
    this.fetchStats();
  }


  async loadChart() {
    const { LineChartEmployerComponent } = await import('../line-chart-employer/line-chart-employer.component');
    this.container.createComponent(LineChartEmployerComponent);
  }



  fetchStats() {
    this.reportsService.getEmployerStats().subscribe({
      next: (res) => {
        const stats = res.data ?? res;
        this.applicationsReceived = stats.applicationsReceived ?? 0;
        this.applicationsSaved = stats.applicationsSaved ?? 0;
      },
      error: (err) => {
        console.error('Error fetching stats:', err);
      }
    });
  }

  goBack() {
    this.location.back();
  }

}

