import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
  NgForm,
} from "@angular/forms";
import { ModalDirective, BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ActivatedRoute, Router } from "@angular/router";


import { AddDataService } from "../../services/add-data.service";
import { FeedDataService } from "../../services/feed-data.service";
import { ValidateAdminService } from "../../services/validate-admin.service";
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: "app-year",
  templateUrl: "./year.component.html",
  styleUrls: ["./year.component.css"],
})
export class YearComponent implements OnInit {
  @ViewChild("topicModal") public topicModal: ModalDirective;
  @ViewChild("editModal") public editModal: ModalDirective;
  @ViewChild("confirmModal") public confirmModal: ModalDirective;


  InfoId: any;
  year_list: any[] = [];
  addDataForm: FormGroup;
  editForm: FormGroup;
  modelRef: BsModalRef;
  testyear: any;
  status: any;
  state: any;
  category_id: any;
  isSubmitted = false;
  tmp: number;
  tmpName: string;
  checkValidYear = false;
  editSubmitted = false;
  loading = false;
  email
  admin
  constructor(
    private apiGetRegulation: FeedDataService,
    private apiEditData: AddDataService,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private auth: AuthService,
    private validate: ValidateAdminService
  ) { }

  ngOnInit(): void {
    this.email = this.auth.getUser().email;
    this.getLocalStorage(this.email);
  }

  getLocalStorage(data) {
    this.validate.getbyemail(data).subscribe(result => {
      this.admin = result
      if (this.admin.sector_id == 6) {
        this.InfoId = 6;
        this.getYearList(this.InfoId);
      }
      else if (this.admin.sector_id == 5) {
        this.InfoId = 5;
        this.getYearList(this.InfoId);
      }
      else if (this.admin.sector_id == 4) {
        this.InfoId = 4;
        this.getYearList(this.InfoId);
      }
      else if (this.admin.sector_id == 3) {
        this.InfoId = 3;
        this.getYearList(this.InfoId);
      }
      else if (this.admin.sector_id == 2) {
        this.InfoId = 2;
        this.getYearList(this.InfoId);
      }
      else {
        this.InfoId = 1;
        this.getYearList(this.InfoId);
      }
    }
    )
  }

  getYearList(value) {
    this.apiGetRegulation.getYearList(value).subscribe((response) => {
      this.year_list = response;
      this.loading = true;

    });
  }




  onSubmit(value) {
    this.isSubmitted = true;

    // stop here if form is invalid
    if (this.addDataForm.invalid) {
      return;
    }

    this.apiEditData.addYear(value, this.InfoId).subscribe((response) => {
      this.modelRef.hide();

      this.getYearList(this.admin.sector_id);

    });



    // display form values on success
  }


  addFormModal(createmodal: TemplateRef<any>) {
    this.modelRef = this.modalService.show(
      createmodal,
      Object.assign({}, { class: "gray modal-md modal-dialog-centered" })
    );

    this.addDataForm = this.fb.group({
      "year": new FormControl(null, [Validators.required, Validators.pattern("[0-9]{4,4}")], this.checkYear.bind(this)),
    })
    this.addDataForm.patchValue({
      "year": " ",

    })

  }


  get f() {
    return this.addDataForm.controls;
  }

  EditYear(value) {

    this.editSubmitted = true;
    if (this.editForm.invalid) {
      return;
    }

    this.modelRef.hide();

    this.apiEditData.editYear(value).subscribe(response => {
      console.log('response', response)
      this.getYearList(this.InfoId);
    })
  }




  EditFormModal(createmodal: TemplateRef<any>, value) {
    // alert(JSON.stringify(value))
    this.modelRef = this.modalService.show(
      createmodal,
      Object.assign({}, { class: "gray modal-md modal-dialog-centered" })
    );

    this.editForm = this.fb.group({
      "id": new FormControl(value.id),
      "year": new FormControl(null, [Validators.required, Validators.minLength(4)], this.checkYear.bind(this)),
      "sector_id": new FormControl(this.InfoId),
    })

    this.editForm.patchValue({
      "year": value.year,


    })
  }



  get g() {
    return this.editForm.controls;
  }

  checkInput(control: FormControl) {
    alert('check input')
    console.log(control.value);
    if (control.value.length > 4) {
      return { inputType: true };
    }
  }
  async checkYear(control: FormControl) {
    console.log(control.value);
    let result = await this.apiEditData
      .checkYear(
        control.value,
        this.InfoId

      )
      .toPromise();
    console.log("coontrol .value", control.value);
    console.log("result=>", result);
    if (result.success == false) {
      // alert("1")
      return { validType: true };
    }
    null;
  }



  onDelete() {

    this.apiEditData.removeYear(this.tmp).subscribe((response) => { });
    this.confirmModal.hide();
    setTimeout(() => {
      this.getYearList(this.InfoId);

    }, 1000);


  }

  confirm(year_id, year_name) {
    this.confirmModal.show();
    this.tmp = year_id;
    this.tmpName = year_name;
  }
}
