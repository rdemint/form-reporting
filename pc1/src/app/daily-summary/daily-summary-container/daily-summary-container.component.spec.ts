import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailySummaryContainerComponent } from './daily-summary-container.component';

describe('DailySummaryContainerComponent', () => {
  let component: DailySummaryContainerComponent;
  let fixture: ComponentFixture<DailySummaryContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailySummaryContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailySummaryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
