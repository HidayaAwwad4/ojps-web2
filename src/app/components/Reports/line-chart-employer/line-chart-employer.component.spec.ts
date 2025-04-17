import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartEmployerComponent } from './line-chart-employer.component';

describe('LineChartEmployerComponent', () => {
  let component: LineChartEmployerComponent;
  let fixture: ComponentFixture<LineChartEmployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineChartEmployerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineChartEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
