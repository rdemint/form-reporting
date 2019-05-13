import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeContainerComponent } from './practice-container.component';

describe('PracticeContainerComponent', () => {
  let component: PracticeContainerComponent;
  let fixture: ComponentFixture<PracticeContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
