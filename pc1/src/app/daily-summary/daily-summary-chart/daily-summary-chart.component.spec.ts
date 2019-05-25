import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailySummaryChartComponent } from './daily-summary-chart.component';

describe('DailySummaryChartComponent', () => {
  let component: DailySummaryChartComponent;
  let fixture: ComponentFixture<DailySummaryChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailySummaryChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailySummaryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
