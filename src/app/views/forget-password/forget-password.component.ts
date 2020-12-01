import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(
    private _AuthService:AuthService,
    private fb:FormBuilder,
    private router:Router,
  ) { }

  queryUser: FormGroup;

  ngOnInit(): void {
    this.queryEmail();
  }
  queryEmail() {
    this.queryUser = this.fb.group({
      email: new FormControl(null, [Validators.required]),
    });
  }

  forgetPwd(value){
    this._AuthService.ForgotPassword(value) .then(() => {
      window.alert("เราได้จัดส่งข้อมูลการรีเซ็ตรหัสผ่านไปยังอีเมล์ของคุณเรียบร้อยแล้ว");
      this.router.navigate(["/login"]);

    })
    .catch((error) => {
      window.alert(error);
    });



  }

}
