import {AfterViewInit, Component, inject, PLATFORM_ID, ViewChild, ViewContainerRef} from '@angular/core';
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
export class EmployerReportsComponent implements AfterViewInit {
  @ViewChild('chartContainer', { read: ViewContainerRef }) container!: ViewContainerRef;

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly location = inject(Location);
  private readonly reportsService = inject(ReportsService);

  applicationsReceived = 0;
  applicationsSaved = 0;

  async ngAfterViewInit(): Promise<void> {
    if (this.isBrowser) {
      await this.loadChart();
    }
    this.fetchStats();
  }

  private async loadChart(): Promise<void> {
    const { LineChartEmployerComponent } = await import('../line-chart-employer/line-chart-employer.component');
    this.container.createComponent(LineChartEmployerComponent);
  }

  private fetchStats(): void {
    this.reportsService.getEmployerStats().subscribe({
      next: (data: { applicationsReceived: number; applicationsSaved: number }) => {
        this.applicationsReceived = data.applicationsReceived ?? 0;
        this.applicationsSaved = data.applicationsSaved ?? 0;
      },
      error: (error) => {
        console.error('Failed to fetch employer stats:', error);
      }
    });
  }


  goBack(): void {
    this.location.back();
  }
}
