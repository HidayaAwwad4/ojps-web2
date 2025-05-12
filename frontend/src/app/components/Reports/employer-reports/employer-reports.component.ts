import {Component, inject, PLATFORM_ID, ViewChild, ViewContainerRef} from '@angular/core';
import {StatsBoxComponent} from '../stats-box/stats-box.component';
import {NavbarComponent} from '../../navbar/navbar.component';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-employer-reports',
  imports: [
    StatsBoxComponent,
    NavbarComponent
  ],
  templateUrl: './employer-reports.component.html',
  styleUrl: './employer-reports.component.css'
})
export class EmployerReportsComponent {
  @ViewChild('chartContainer', { read: ViewContainerRef }) container!: ViewContainerRef;
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.loadChart();
    }
  }

  async loadChart() {
    const { LineChartEmployerComponent } = await import('../line-chart-employer/line-chart-employer.component');
    this.container.createComponent(LineChartEmployerComponent);
  }

  goBack() {
    // Your go-back logic
  }
}

