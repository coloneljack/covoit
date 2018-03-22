import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatFormField } from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'app-working-day',
  templateUrl: './working-day.component.html',
  styleUrls: ['./working-day.component.scss']
})
export class WorkingDayComponent implements OnInit {

  private static HOUR_FORMAT = 'HH:mm';

  @ViewChild('amStart') amStart: MatFormField;
  @ViewChild('amEnd') amEnd: MatFormField;
  @ViewChild('pmStart') pmStart: MatFormField;
  @ViewChild('pmEnd') pmEnd: MatFormField;

  @Input() day: string;

  workingDayForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
    this.removeFormFieldUnderline(this.amStart);
    this.removeFormFieldUnderline(this.amEnd);
    this.removeFormFieldUnderline(this.pmStart);
    this.removeFormFieldUnderline(this.pmEnd);
  }

  // FIXME use input values
  private initForm(): void {
    this.workingDayForm = this.fb.group({
      amStart: moment('09:00', WorkingDayComponent.HOUR_FORMAT),
      amEnd: moment('12:15', WorkingDayComponent.HOUR_FORMAT),
      pmStart: moment('13:45', WorkingDayComponent.HOUR_FORMAT),
      pmEnd: moment('18:00', WorkingDayComponent.HOUR_FORMAT)
    });
  }

  private removeFormFieldUnderline(formField: MatFormField): void {
    formField.underlineRef.nativeElement.className = null;
  }

}
