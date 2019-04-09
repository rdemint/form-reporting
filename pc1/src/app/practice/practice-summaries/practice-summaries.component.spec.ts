import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeSummariesComponent } from './practice-summaries.component';

describe('PracticeSummariesComponent', () => {
  let component: PracticeSummariesComponent;
  let fixture: ComponentFixture<PracticeSummariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeSummariesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeSummariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
