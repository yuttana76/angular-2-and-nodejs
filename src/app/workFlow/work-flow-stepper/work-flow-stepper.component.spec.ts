import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFlowStepperComponent } from './work-flow-stepper.component';

describe('WorkFlowStepperComponent', () => {
  let component: WorkFlowStepperComponent;
  let fixture: ComponentFixture<WorkFlowStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkFlowStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkFlowStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
