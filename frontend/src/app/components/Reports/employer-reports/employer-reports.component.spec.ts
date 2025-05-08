import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerReportsComponent } from './employer-reports.component';

describe('EmployerReportsComponent', () => {
  let component: EmployerReportsComponent;
  let fixture: ComponentFixture<EmployerReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployerReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
