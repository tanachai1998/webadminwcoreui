import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ValidateAdminService } from "../../services/validate-admin.service";
import * as firebase from "firebase/app";

import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from "@angular/forms";
import { MessageService } from "../../services/message.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "login.component.html",
})
export class LoginComponent implements OnInit {
  queryUser: FormGroup;
  isValid: boolean = false;
  userID: number;
  isSubmitted: boolean;
  user: any;
  test: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiQueryUser: ValidateAdminService,
    private messageService: MessageService,
    private afa: AngularFireAuth,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.queryEmail();
  }

  queryEmail() {
    this.queryUser = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  checkValidate(value) {
    this.isSubmitted = true;
    if (this.queryUser.invalid) {
      return;
    }

    this.authService
      .SignIn(this.queryUser.value.email, this.queryUser.value.password)
  }

  login() {
    this.authService.SignIn(
      this.queryUser.value.email,
      this.queryUser.value.password
    );
  }
  checkState() {
    this.afa.authState.subscribe((result) => {
      console.log(result);
    });
  }
  get f() {
    return this.queryUser.controls;
  }
}
