import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Address } from '../shared/entities/address';
import { UserInfoService } from './user-info.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  public address: Address;
  private mapCenter: Address;
  private userInfoForm: FormGroup;

  constructor(private fb: FormBuilder, private snackbar: MatSnackBar, private userInfoService: UserInfoService, private router: Router) {}

  get firstName(): FormControl {
    return this.userInfoForm.get('firstName') as FormControl;
  }

  get lastName(): FormControl {
    return this.userInfoForm.get('lastName') as FormControl;
  }

  get tel(): FormControl {
    return this.userInfoForm.get('tel') as FormControl;
  }

  get email(): FormControl {
    return this.userInfoForm.get('email') as FormControl;
  }

  get type(): FormControl {
    return this.userInfoForm.get('type') as FormControl;
  }

  get seats(): FormControl {
    return this.userInfoForm.get('seats') as FormControl;
  }

  ngOnInit() {
    this.userInfoService.getCurrentUserInfo().subscribe(a => {
      this.address = a;
      this.mapCenter = a;
      this.initForm();
    });
  }

  save(): void {
    if (this.userInfoForm.valid) {
      const formValue = this.userInfoForm.value;

      this.address.coworker = {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        tel: formValue.tel,
        job: formValue.job,
        type: formValue.type,
        seats: formValue.seats,
        workingHours: formValue.workingHours
      };

      this.userInfoService.saveUserInfo(this.address).subscribe((status: string) => {
        if (status === 'OK') {
          this.snackbar.open('Les informations de l\'utilisateur ont bien été enregistrées.', '', {
            duration: 5000
          });

          this.router.navigate(['home']);
        }
      });
    }
  }

  isDriver(): boolean {
    const driverTypes: Array<string> = ['C', 'CP'];
    return driverTypes.indexOf(this.type.value) !== -1;
  }

  changeType(): void {
    if (this.isDriver()) {
      this.seats.enable();
    } else {
      this.seats.disable();
    }
  }

  setAddress(address: Address) {
    this.address = address;
    this.mapCenter = address;
  }

  private initForm() {
    this.userInfoForm = this.fb.group({
      firstName: [this.address.coworker.firstName || '', Validators.required],
      lastName: [this.address.coworker.lastName || '', Validators.required],
      tel: [this.address.coworker.tel || '', [Validators.pattern(/^((\d{4})|(0\d{9}))$/), Validators.minLength(4)]],
      job: this.address.coworker.job || '',
      email: [this.address.coworker.email || '', Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)],
      type: [this.address.coworker.type || 'CP', Validators.required],
      seats: [this.address.coworker.seats || 4, [Validators.required, Validators.min(0), Validators.max(9)]],
      workingHours: this.address.coworker.workingHours || ''
    });
  }
}
