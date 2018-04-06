import { ControlPosition } from '@agm/core/services/google-maps-types';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Address } from '../shared/entities/address';
import { User } from '../shared/entities/user';
import { GmapsMapperService } from '../shared/services/gmaps-mapper.service';
import { UserInfoService } from './user-info.service';
import { WorkingDayComponent } from './working-day/working-day.component';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  @ViewChild('monday') monday: WorkingDayComponent;
  @ViewChild('tuesday') tuesday: WorkingDayComponent;
  @ViewChild('wednesday') wednesday: WorkingDayComponent;
  @ViewChild('thursday') thursday: WorkingDayComponent;
  @ViewChild('friday') friday: WorkingDayComponent;

  user: User;
  address: Address;
  mapCenter: Address;
  userInfoForm: FormGroup;
  searchBoxPosition: ControlPosition = ControlPosition.TOP_CENTER;
  foundAddresses: Array<Address> = [];

  constructor(private fb: FormBuilder, private snackbar: MatSnackBar, private userInfoService: UserInfoService, private router: Router,
              private gMapsMapper: GmapsMapperService) {}

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
    this.userInfoService.getCurrentUserInfo().subscribe(u => {
      this.user = u;
      this.address = u.address;
      this.mapCenter = u.address;
      this.initForm();
    });
  }

  save(): void {
    if (this.userInfoForm.valid) {
      const formValue = this.userInfoForm.value;

      this.user = {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        tel: formValue.tel,
        job: formValue.job,
        type: formValue.type,
        seats: formValue.seats,
        workingWeek: {
          monday: this.monday.getWorkingDay(),
          tuesday: this.tuesday.getWorkingDay(),
          wednesday: this.wednesday.getWorkingDay(),
          thursday: this.thursday.getWorkingDay(),
          friday: this.friday.getWorkingDay()
        },
        address: this.address
      };

      this.userInfoService.saveUserInfo(this.user).subscribe((status: string) => {
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

  showSearchResults(foundPlaces: Array<PlaceResult>): void {
    this.foundAddresses = foundPlaces ? foundPlaces.map(this.gMapsMapper.toAddress) : [];
  }

  setAddress(address: Address) {
    this.address = address;
    this.mapCenter = address;
  }

  private initForm() {
    this.userInfoForm = this.fb.group({
      firstName: [this.user.firstName || '', Validators.required],
      lastName: [this.user.lastName || '', Validators.required],
      tel: [this.user.tel || '', [Validators.pattern(/^((\d{4})|(0\d{9}))$/), Validators.minLength(4)]],
      job: this.user.job || '',
      email: [this.user.email || '', Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)],
      type: [this.user.type || 'CP', Validators.required],
      seats: [this.user.seats || 4, [Validators.required, Validators.min(0), Validators.max(9)]]
    });
  }
}
