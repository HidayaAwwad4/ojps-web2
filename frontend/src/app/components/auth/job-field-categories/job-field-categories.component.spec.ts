import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobFieldCategoriesComponent } from './job-field-categories.component';

describe('JobFieldCategoriesComponent', () => {
  let component: JobFieldCategoriesComponent;
  let fixture: ComponentFixture<JobFieldCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobFieldCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobFieldCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
