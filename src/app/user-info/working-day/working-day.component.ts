import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatFormField } from '@angular/material';
import { Moment } from 'moment';
import * as moment from 'moment';
import { WorkingDay } from '../../shared/entities/working-hours';

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
  @Input() workingDay?: WorkingDay;

  workingDayForm: FormGroup;

  private static formatHour(hour: Moment): string {
    return hour ? hour.format(this.HOUR_FORMAT) : null;
  }

  private static removeFormFieldUnderline(formField: MatFormField): void {
    formField.underlineRef.nativeElement.className = null;
  }

  constructor(private fb: FormBuilder) { }

  get idle(): boolean {
    return this.workingDayForm.get('idle').value;
  }

  public getWorkingDay(): WorkingDay {
    const dayFormValue = this.workingDayForm.value;
    const workingDay: WorkingDay = {
      idle: dayFormValue.idle
    };

    if (!dayFormValue.idle) {
      Object.assign(workingDay, {
        amStart: WorkingDayComponent.formatHour(dayFormValue.amStart),
        amEnd: WorkingDayComponent.formatHour(dayFormValue.amEnd),
        pmStart: WorkingDayComponent.formatHour(dayFormValue.pmStart),
        pmEnd: WorkingDayComponent.formatHour(dayFormValue.pmEnd)
      });
    }

    return workingDay;
  }

  ngOnInit() {
    this.initForm();
    WorkingDayComponent.removeFormFieldUnderline(this.amStart);
    WorkingDayComponent.removeFormFieldUnderline(this.amEnd);
    WorkingDayComponent.removeFormFieldUnderline(this.pmStart);
    WorkingDayComponent.removeFormFieldUnderline(this.pmEnd);
  }

  private initForm(): void {
    const amStartDefault = moment('09:00', WorkingDayComponent.HOUR_FORMAT);
    const amEndDefault = moment('12:15', WorkingDayComponent.HOUR_FORMAT);
    const pmStartDefault = moment('13:45', WorkingDayComponent.HOUR_FORMAT);
    const pmEndDefault = moment('18:00', WorkingDayComponent.HOUR_FORMAT);
    this.workingDayForm = this.fb.group({
      amStart: this.workingDay ? (moment(this.workingDay.amStart, WorkingDayComponent.HOUR_FORMAT) || amStartDefault) : amStartDefault,
      amEnd: this.workingDay ? (moment(this.workingDay.amEnd, WorkingDayComponent.HOUR_FORMAT) || amEndDefault) : amEndDefault,
      pmStart: this.workingDay ? (moment(this.workingDay.pmStart, WorkingDayComponent.HOUR_FORMAT) || pmStartDefault) : pmStartDefault,
      pmEnd: this.workingDay ? (moment(this.workingDay.pmEnd, WorkingDayComponent.HOUR_FORMAT) || pmEndDefault) : pmEndDefault,
      idle: this.workingDay ? this.workingDay.idle : false
    });
  }

}
