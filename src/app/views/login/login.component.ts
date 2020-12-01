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
  user: any;
  test: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiQueryUser: ValidateAdminService,
    private messageService: MessageService,
    private afa: AngularFireAuth,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.queryEmail();
  }

  queryEmail() {
    this.queryUser = this.fb.group({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  checkValidate(value) {


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

}
