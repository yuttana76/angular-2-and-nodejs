import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFlowTabComponent } from './work-flow-tab.component';

describe('WorkFlowTabComponent', () => {
  let component: WorkFlowTabComponent;
  let fixture: ComponentFixture<WorkFlowTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkFlowTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkFlowTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
