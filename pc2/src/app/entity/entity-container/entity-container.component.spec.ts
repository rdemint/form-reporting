import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityContainerComponent } from './entity-container.component';

describe('EntityContainerComponent', () => {
  let component: EntityContainerComponent;
  let fixture: ComponentFixture<EntityContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
