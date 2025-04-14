import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoseUserTypeComponent } from './chose-user-type.component';

describe('ChoseUserTypeComponent', () => {
  let component: ChoseUserTypeComponent;
  let fixture: ComponentFixture<ChoseUserTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoseUserTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoseUserTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
