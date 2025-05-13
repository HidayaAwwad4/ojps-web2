import {Component, inject, PLATFORM_ID, ViewChild, ViewContainerRef} from '@angular/core';
import {StatsBoxComponent} from '../stats-box/stats-box.component';
import { Location } from '@angular/common';
import {NavbarComponent} from '../../navbar/navbar.component';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-admin-reports',
  imports: [
    StatsBoxComponent,
    NavbarComponent
  ],
  templateUrl: './admin-reports.component.html',
  styleUrl: './admin-reports.component.css'
})
export class AdminReportsComponent {
  @ViewChild('chartContainer', { read: ViewContainerRef }) container!: ViewContainerRef;

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private location = inject(Location);

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.loadChart();
    }
  }

  async loadChart() {
    const { BarChartAdminComponent } = await import('../bar-chart-admin/bar-chart-admin.component');
    this.container.createComponent(BarChartAdminComponent);
  }

  goBack() {
   this.location.back();
  }

}
