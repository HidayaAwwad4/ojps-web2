import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEmployersComponent } from './manage-employers.component';

describe('ManageEmployersComponent', () => {
  let component: ManageEmployersComponent;
  let fixture: ComponentFixture<ManageEmployersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageEmployersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageEmployersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
