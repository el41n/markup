import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import {AlertService} from "../services/alert.service";
import {UserService} from "../services/user.service";
import {first} from "rxjs/operators";
import {User} from "../models/user";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  nameForm: FormGroup;
  avatarForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  file;

  constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService,
  ) {}

  ngOnInit() {
      this.nameForm = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          avatar: ['', null]
      });

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      // this.returnUrl = '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.nameForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.nameForm.invalid) {
          return;
      }

      let user = new User;
      user.first_name = this.f.firstName.value;
      user.last_name = this.f.lastName.value;
      user.avatar = new FormData();
      for (const file of this.file) {
        user.avatar.append(name, file, file.name);
      }
      // user.avatar.append(name, this.file, this.file.name);
      console.log(this.f.firstName.value);
      console.log(user.last_name);

      this.loading = true;
      this.userService.changeSettings(user)
          .pipe(first())
          .subscribe(
              data => {},
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }

  onSubmitAvatar() {
      let fileForm = new FormData();
      fileForm.append('avatar', this.file, this.file.name)
      this.userService.changeAvatar(fileForm)
          .pipe(first())
          .subscribe(
              data => {},
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }


  onFileChanged(event: any) {
    this.file = event.target.files[0];
  }
}
