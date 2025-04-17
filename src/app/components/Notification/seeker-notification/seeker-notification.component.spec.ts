import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerNotificationComponent } from './seeker-notification.component';

describe('SeekerNotificationComponent', () => {
  let component: SeekerNotificationComponent;
  let fixture: ComponentFixture<SeekerNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeekerNotificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeekerNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
