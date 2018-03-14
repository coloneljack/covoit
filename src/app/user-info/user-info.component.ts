import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  private userInfoForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  get nom(): FormControl {
    return this.userInfoForm.get('nom') as FormControl;
  }

  get prenom(): FormControl {
    return this.userInfoForm.get('prenom') as FormControl;
  }

  get adresse(): FormControl {
    return this.userInfoForm.get('adresse') as FormControl;
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

  get places(): FormControl {
    return this.userInfoForm.get('places') as FormControl;
  }

  get dispo(): FormControl {
    return this.userInfoForm.get('dispo') as FormControl;
  }

  ngOnInit() {
    this.initForm();
  }

  save(): void {

  }

  changeType(): void {
    const driverTypes: Array<string> = ['C', 'CP'];
    if (driverTypes.indexOf(this.type.value) === -1) {
      this.places.disable();
    } else {
      this.places.enable();
    }
  }

  private initForm() {
    this.userInfoForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: ['', Validators.required],
      tel: ['', [Validators.pattern(/^((\d{4})|(0\d{9}))$/), Validators.minLength(4)]],
      email: ['', Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)],
      type: ['CP', Validators.required],
      places: [4, [Validators.required, Validators.min(0), Validators.max(9)]],
      dispo: ''
    });
  }
}
