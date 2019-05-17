import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialtyComponent } from './specialty.component';

describe('SpecialtyComponent', () => {
  let component: SpecialtyComponent;
  let fixture: ComponentFixture<SpecialtyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialtyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
