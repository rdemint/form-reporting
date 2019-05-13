import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeDashboardComponent } from './practice-dashboard.component';

describe('PracticeDashboardComponent', () => {
  let component: PracticeDashboardComponent;
  let fixture: ComponentFixture<PracticeDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
