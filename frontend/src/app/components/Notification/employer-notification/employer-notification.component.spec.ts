import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerNotificationComponent } from './employer-notification.component';

describe('EmployerNotificationComponent', () => {
  let component: EmployerNotificationComponent;
  let fixture: ComponentFixture<EmployerNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployerNotificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
