import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailySummaryFormComponent } from './daily-summary-form.component';

describe('DailySummaryFormComponent', () => {
  let component: DailySummaryFormComponent;
  let fixture: ComponentFixture<DailySummaryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailySummaryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailySummaryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
