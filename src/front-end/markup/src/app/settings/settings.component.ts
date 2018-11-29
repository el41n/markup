import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import {AlertService} from "../services/alert.service";
import {UserService} from "../services/user.service";
import {FileService} from "../services/file.service";
import {SharingService} from "../services/sharing.service";
import {first} from "rxjs/operators";
import {User} from "../models/user";
import {File, FilePermission} from "../models/file";
import {Permission} from "../models/permission";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  nameForm: FormGroup;
  passwordForm: FormGroup;
  loading = false;
  submitted = false;
  submitted2 = false;
  returnUrl: string;
  file;

  userList: Array<User>;
  fileList: Array<File>;
  permList = [
    {'title': 'Read file', 'perm': 'r_file'},
    {'title': 'Read and write file', 'perm': 'rw_file'}
  ];
  selectedUser = null;
  selectedFile = null;
  selectedPerm = null;
  userPk;
  filePk;
  perm;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService,
    private fileService: FileService,
    private sharingService: SharingService,
  ) {
  }

  ngOnInit() {
    this.nameForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
    this.passwordForm = this.formBuilder.group({
      password1: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    // this.returnUrl = '/';
    this.userService.loadUserList()
      .subscribe((data) => this.userList = data);
    this.fileService.list()
      .subscribe((data) => this.fileList = data);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.nameForm.controls;
  }

  get f2() {
    return this.passwordForm.controls;
  }

  onSubmit() {
    this.submitted = true;

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

    this.loading = true;
    this.userService.changeSettings(user)
      .pipe(first())
      .subscribe(
        data => {
        },
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
        data => {
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  onFileChanged(event: any) {
    this.file = event.target.files[0];
  }

  addPerm() {
    let perm = new Permission();
    console.log(this.selectedFile.pk);
    perm.file_pk = this.selectedFile.pk;
    perm.user_pk = this.selectedUser.pk;
    perm.permission = this.selectedPerm.perm;
    this.sharingService.addPermission(perm)
      .subscribe();
  }

  deletePerm() {
    let perm = new Permission();
    console.log(this.selectedFile.pk);
    perm.file_pk = this.selectedFile.pk;
    perm.user_pk = this.selectedUser.pk;
    perm.permission = this.selectedPerm.perm;
    this.sharingService.deletePermission(perm)
      .subscribe();
  }

  onSubmitPassword() {
    this.submitted2 = true;

    if (this.passwordForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.changePassword(this.f2.password1.value, this.f2.password2.value)
      .pipe(first())
      .subscribe(
        data => { this.alertService.success(data["detail"]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
