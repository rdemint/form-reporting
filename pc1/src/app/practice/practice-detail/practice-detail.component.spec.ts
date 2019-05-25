import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeDetailComponent } from './practice-detail.component';

describe('PracticeDetailComponent', () => {
  let component: PracticeDetailComponent;
  let fixture: ComponentFixture<PracticeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
