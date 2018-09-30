import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-work-flow-tab',
  templateUrl: './work-flow-tab.component.html',
  styleUrls: ['./work-flow-tab.component.css']
})
export class WorkFlowTabComponent implements OnInit {

  panelOpenState = false;
  wfTrans = WorkFlowTrans_DATA;
  
  workFlowTrans: WorkFlowTrans = { AppId: 'App1', CordeRef: 'c001', Flow: 'confirm', Level: '3', WFStatus: 'NA', Comment:'123', CreateBy: 'System', CreateDate: '01/09/2018', ActionBy: '', ActionDate: '' };
  constructor() { }

  ngOnInit() {
    // console.log(JSON.stringify(this.wfTrans));
  }
  onSave(){
    console.log(JSON.stringify(this.workFlowTrans));
  }

}

const WorkFlowTrans_DATA: WorkFlowTrans[] = [
  { AppId: 'App1', CordeRef: 'c001', Flow: 'create', Level: '1', WFStatus: 'Y', Comment: 'Edit', CreateBy: 'System', CreateDate: '01/09/2018', ActionBy: 'aaa', ActionDate: '01/09/2018' },
  { AppId: 'App1', CordeRef: 'c001', Flow: 'approve', Level: '2', WFStatus: 'Y', Comment:'None', CreateBy: 'System', CreateDate: '01/09/2018', ActionBy: 'bbb', ActionDate: '02/09/2018' },
  { AppId: 'App1', CordeRef: 'c001', Flow: 'confirm', Level: '3', WFStatus: 'NA', Comment:'', CreateBy: 'System', CreateDate: '01/09/2018', ActionBy: '', ActionDate: '' },
];

export interface WorkFlowTrans {
  AppId: string;
  CordeRef: string;
  Flow: string;
  Level: string;
  WFStatus: string;
  Comment: string;
  CreateBy: string;
  CreateDate: string;
  ActionBy: string;
  ActionDate: string;
}
