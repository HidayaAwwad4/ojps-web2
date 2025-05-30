import {Component,inject,OnInit,PLATFORM_ID} from '@angular/core';
import {BaseChartDirective} from 'ng2-charts';
import {ChartConfiguration} from 'chart.js';
import {isPlatformBrowser} from '@angular/common';
import {ReportsService} from '../../../services/Reports/reports.service';

@Component({
  selector: 'app-line-chart-employer',
  imports: [
    BaseChartDirective
  ],
  templateUrl: './line-chart-employer.component.html',
  styleUrl: './line-chart-employer.component.css'
})
export class LineChartEmployerComponent implements OnInit {
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private reportsService = inject(ReportsService);
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        label: 'Job Applications per Month',
        data: [],
        fill: true,
        borderColor: 'rgb(99,27,27)',
        tension: 0.1
      }
    ]
  };

  ngOnInit(): void {
    if (this.isBrowser) {
      this.reportsService.getEmployeeLineChartData().subscribe((response) => {
        const labels: string[] = [];
        const data: number[] = [];
        response.forEach((item: { month: string; total: number }) => {
          labels.push(item.month);
          data.push(item.total);
        });
        this.lineChartData.labels = labels;
        this.lineChartData.datasets[0].data = data;

      });
    }
  }
}
