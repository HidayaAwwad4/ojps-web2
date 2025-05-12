import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobIntroComponent } from './job-intro.component';

describe('JobIntroComponent', () => {
  let component: JobIntroComponent;
  let fixture: ComponentFixture<JobIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobIntroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
