import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailySummaryFormContainerComponent } from './daily-summary-form-container.component';

describe('DailySummaryFormContainerComponent', () => {
  let component: DailySummaryFormContainerComponent;
  let fixture: ComponentFixture<DailySummaryFormContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailySummaryFormContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailySummaryFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
