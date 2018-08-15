import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTaskFormComponent } from './filter-task-form.component';

describe('FilterTaskFormComponent', () => {
  let component: FilterTaskFormComponent;
  let fixture: ComponentFixture<FilterTaskFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterTaskFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
