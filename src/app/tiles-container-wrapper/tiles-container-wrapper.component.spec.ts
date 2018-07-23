import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TilesContainerWrapperComponent } from './tiles-container-wrapper.component';

describe('TilesContainerWrapperComponent', () => {
  let component: TilesContainerWrapperComponent;
  let fixture: ComponentFixture<TilesContainerWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TilesContainerWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TilesContainerWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
