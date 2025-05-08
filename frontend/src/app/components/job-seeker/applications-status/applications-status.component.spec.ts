import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsStatusComponent } from './applications-status.component';

describe('ApplicationsStatusComponent', () => {
  let component: ApplicationsStatusComponent;
  let fixture: ComponentFixture<ApplicationsStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationsStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationsStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
