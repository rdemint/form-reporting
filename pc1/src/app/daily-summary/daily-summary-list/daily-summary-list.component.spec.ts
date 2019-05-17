import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailySummaryListComponent } from './daily-summary-list.component';

describe('DailySummaryListComponent', () => {
  let component: DailySummaryListComponent;
  let fixture: ComponentFixture<DailySummaryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailySummaryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailySummaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
