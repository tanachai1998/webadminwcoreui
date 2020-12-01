import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
  NgForm,
} from "@angular/forms";
import { Router } from "@angular/router";

import { MustMatch } from "../../helper/must-match.validator";
import { RegisterService } from "../../services/register.service";
import { SectorListService } from "../../services/sector-list.service";
import { ValidateAdminService } from "../../services/validate-admin.service";
import { User } from "../../services/user";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "register.component.html",
})
export class RegisterComponent {
  addUserForm: FormGroup;
  sectorId: object = [];
  userValidate: object = [];
  isSubmitted: boolean;
  user: any;
  isEmailExist: boolean;

  email: any;
  password: any;

  // inputEmail: string;
  constructor(
    private fb: FormBuilder,
    private apiUserService: RegisterService,
    private apiSectorService: SectorListService,
    private apiQueryUser: ValidateAdminService,
    private router: Router,
    private afs: AngularFireAuth,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.addForm();
    this.getSector();
  }
  // websiteList = ['ฝ่ายการเงิน', 'ลกง', 'สกง'];

  addForm() {
    // alert("test")
    this.addUserForm = this.fb.group(
      {
        name: new FormControl("", [Validators.required]),
        surName: new FormControl("", [Validators.required]),
        email: new FormControl("", [
          Validators.required,
          // Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
          // this.apiUserService.userValidator()
        ]),
        password: new FormControl("", [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl("", [Validators.required]),
        sector_id: new FormControl("", [Validators.required]),
      },
      {
        validator: MustMatch("password", "confirmPassword"),
      }
    );

    // console.log('value');
  }

  addUser(value) {
    console.log("value", value);
    // alert(JSON.stringify(value));
    // signUp(email, password){
    // this.afs.createUserWithEmailAndPassword(value.email,value.password)
    // .then((response)=>{
    //   console.log('fire base',response);
    //   console.log('fire base W',response.user['$'].W);
    //   this.addUserForm.reset();
    //   this.apiUserService.addUser(value,response.user['$'].W).subscribe((response) => {
    //     // console.log(response);
    //     // console.log(value);
    //     // return response;
    //     this.user = response;

    //     // alert(JSON.stringify(this.user.message));

    //     if(this.user.success == true){
    //       this.onRoute();
    //     }

    //   });
    // })
    // .catch((error) => {
    //   let errorCode = error.code;
    //   let errorMessage = error.message;
    //   console.log('This was the problem ' + errorCode + ' Or this was the problem' + errorMessage);
    // });
    // .then((response)=>{
    //   console.log(response);
    // });

    // }
    // this.addUserForm.reset();
    // this.apiUserService.addUser(value).subscribe((response) => {
    //   // console.log(response);
    //   // console.log(value);
    //   // return response;
    //   this.user = response;

    //   // alert(JSON.stringify(this.user.message));

    //   if(this.user.success == true){
    //     this.onRoute();
    //   }

    // });
    // this.onRoute();
  }

  getSector() {
    this.apiSectorService.getSector().subscribe((response) => {
      this.sectorId = response;
      // alert(response);
      // console.log(response);
      // console.log(value);
      // alert(JSON.stringify(response));
    });
  }
  get f() {
    return this.addUserForm.controls;
  }
  onSubmit() {
    this.isSubmitted = true;

    // stop here if form is invalid
    if (this.addUserForm.invalid) {
      // alert('xxxxx')
      return;
    } else if (this.addUserForm.valid) {
      // alert('yyyyyyy')
      // alert(
      //   "SUCCESS!! :-)\n\n" + JSON.stringify(this.addUserForm.value, null, 4)
      // );
      this.addUser(this.addUserForm.value);

      // this.onRoute();
    }
    // display form values on success
  }

  signUp() {
    this.authService
      .SignUp(this.addUserForm.value.email, this.addUserForm.value.password)
      .then((result) => {
        console.log("result", result);
        /* Call the SendVerificaitonMail() function when new user sign
      up and returns promise */
        // this.SendVerificationMail();

        this.apiUserService
          .addUser(this.addUserForm.value, result.user.uid)
          .subscribe((response) => {
            // console.log(response);
            // console.log(value);
            // return response;
            this.user = response;

            // alert(JSON.stringify(this.user.message));

            if (this.user.success == true) {
              this.onRoute();
            }
          });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // checkValidate(value) {
  //   alert(JSON.stringify(value));
  //   this.addUserForm.reset();
  //   this.apiQueryUser.validateUser(value).subscribe((response) => {
  //     this.user = response;
  //     alert(JSON.stringify(this.user));

  //     // alert(JSON.stringify(this.user));
  //     console.log(this.user);
  //     // console.log(this.user.data.email);
  //     // console.log(this.user.data.password);
  //     if (this.user.success != false) {
  //       localStorage.setItem('id', JSON.stringify(this.user.data.id));

  //       this.router.navigate(['/main']);
  //     }
  //   });
  // }

  onRoute() {
    this.router.navigate(["/login"]);
  }

  //   signUp(email, password){
  //     this.afs.createUserWithEmailAndPassword(email,password)
  //       .catch((error) => {
  //         let errorCode = error.code;
  //         let errorMessage = error.message;
  //         console.log('This was the problem ' + errorCode + ' Or this was the problem' + errorMessage);
  //       })

  // }

  // private createUser(fName, lName, email, username){

  //   setTimeout(() => {
  //     let user = this.afs.currentUser.uid;

  //     this.apiUserService.addUsers(fName, lName, email, username, user);
  //     this.router.navigate(['/login']);
  //   }, 2000);

  // }
}
