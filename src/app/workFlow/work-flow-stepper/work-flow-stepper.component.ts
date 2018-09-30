import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-work-flow-stepper',
  templateUrl: './work-flow-stepper.component.html',
  styleUrls: ['./work-flow-stepper.component.css']
})
export class WorkFlowStepperComponent implements OnInit, AfterViewInit {

  @ViewChild('stepper') stepper: MatStepper;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;


  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    this.stepper.selectedIndex = 3;
  }

}
