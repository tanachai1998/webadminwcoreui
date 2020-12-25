import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import {
  ModalDirective,
  BsModalRef,
  BsModalService,
} from "ngx-bootstrap/modal";
import { Router } from "@angular/router";

import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
  NgForm,
} from "@angular/forms";

import { FeedDataService } from "../../services/feed-data.service";
import { AddDataService } from "../../services/add-data.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { MessageService } from "../../services/message.service";

// import {GetData} from '../../get-data';

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.css"],
})
export class CategoriesComponent implements OnInit {
  // @ViewChild("topicModal") public topicModal: ModalDirective;
  // @ViewChild("editModal") public editModal: ModalDirective;
  @ViewChild("confirmModal") public confirmModal: ModalDirective;

  addDataForm: FormGroup;
  editForm: FormGroup;
  modelRef: BsModalRef;
  userID;
  InfoId: any;
  InfoId1: any;
  resultcategory: any = []

  Info: any;
  regulationType: any;
  category: any;
  sectorInfo: any;
  sectorID: any;
  status: any;
  state: any;
  isSubmitted: boolean;
  editSubmitted: boolean;

  loading = false;
  tmp: number;
  tmpName: string;
  id: any;
  // category_id: any;

  constructor(
    private apiCategory: FeedDataService,
    private fb: FormBuilder,
    private apiEditCategory: AddDataService,
    private router: Router,
    private modalService: BsModalService,
    private afa: AngularFireAuth,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    // this.sendMessage();
    this.getLocalStorage();
    // this.getCategory();
    // this.addForm();
    // this.afa.auth.currentUser.then((result) => {
    //   console.log("result sign in", result);
    //   // test = result;
    // });
  }


  getLocalStorage() {
    this.InfoId = 6
    console.log("sectorID:",this.InfoId)
    if (this.InfoId == 6) {
      this.apiCategory.getCategory(this.InfoId)
        .subscribe(result => {
          //console.log("role5" , result); 
          this.InfoId = 6
          this.getCategory(this.InfoId);
          this.resultcategory = result
        })
    } 
    else if (this.InfoId == 5) {
      this.apiCategory.getCategory(this.InfoId)
        .subscribe(result => {
          //console.log("role5" , result); 
          this.InfoId = 5
          this.getCategory(this.InfoId);
          this.resultcategory = result
        })
    }
    else if (this.InfoId == 4) {
      this.apiCategory.getCategory(this.InfoId)
        .subscribe(result => {
          //console.log("role5" , result); 
          this.InfoId = 4
          this.getCategory(this.InfoId);
          this.resultcategory = result
        })
    }
    else if (this.InfoId ==  3) {
      this.apiCategory.getCategory(this.InfoId)
        .subscribe(result => {
          //console.log("role5" , result); 
          this.InfoId = 3
          this.getCategory(this.InfoId);
          this.resultcategory = result
        })
    }
    else if (this.InfoId == 2) {
      this.apiCategory.getCategory(this.InfoId)
        .subscribe(result => {
          //console.log("role5" , result); 
          this.InfoId = 2
          this.getCategory(this.InfoId);
          this.resultcategory = result
        })
    } else {
      this.apiCategory.getCategory(this.InfoId)
        .subscribe(result => {
          //console.log("role5" , result); 
          this.InfoId = 1
          this.getCategory(this.InfoId);
          this.resultcategory = result
        })
    }

  }

  userInfo(value) {
    // this.InfoSurname = localStorage.getItem('surname');
    // this.InfoType = localStorage.getItem('type');
    // alert(JSON.stringify(value));
    this.apiCategory.queryUserInfo(value).subscribe((response) => {
      this.Info = response;
      this.sectorInfo = response.sector.fullName;
      this.sectorID = response.sector.id;

      console.log("Info = ", this.Info);
      console.log("Info = ", this.sectorInfo);
      console.log("Sector = ", this.sectorID);
    });
  }
  getCategory(value) {
    this.apiCategory.getCategory(value).subscribe((response) => {
      this.category = response;
      // alert(response);
      // console.log("Category", response);
      console.log("Category", this.category);
      // console.log("Category Type", response.type);
      localStorage.setItem("category_id", JSON.stringify(this.category.id));
      // this.category_id = this.category.id;
      // console.log('category id=>',this.category.id)

      this.loading = true;

      // console.log(value);
      // alert(JSON.stringify(response));
    });
  }
  // getRegulationType(value) {
  //   this.apiCategory.getRegulationType(value).subscribe((response) => {
  //     this.regulationType = response;
  //     // alert(response);
  //     // console.log("response", response);
  //     // console.log(value);
  //     // alert(JSON.stringify(response));
  //   });
  // }

  // addForm() {
  //   // alert("test")
  //   console.log("sector_id", this.InfoId);

  //   this.addDataForm = this.fb.group({
  //     // type: new FormControl("", [Validators.required]),
  //     type: new FormControl(null, [
  //       Validators.required,
  //       // this.forbiddenNames.bind(this),
  //     ],this.checkCategory.bind(this)),

  //     // sector_id: new FormControl(this.InfoId),
  //   });

  //   // console.log('value');
  // }

  // onSubmit(value) {
  //   this.isSubmitted = true;

  //   // stop here if form is invalid
  //   if (this.addDataForm.invalid) {
  //     // alert('xxxxx')
  //     return;
  //   } else if (this.addDataForm.valid) {
  //     alert("yyyyyyy");

  //     this.apiEditCategory
  //       .addCategory(value, this.InfoId)
  //       .subscribe((response) => {
  //         // console.log(response);
  //         // console.log(value);
  //         // return response;
  //         this.status = response;
  //         this.state = this.status.success;
  //         console.log("status = ", this.status.success);
  //         if (this.state == true) {
  //           console.log("SSstatus = ", this.state);

  //           this.topicModal.hide();
  //           this.getCategory(this.InfoId);
  //           console.log("sector_id", this.InfoId);
  //           // this.addDataForm.reset();
  //         }
  //         // alert(JSON.stringify(this.user.message));
  //       });

  //     // this.on
  //     // alert(
  //     //   "SUCCESS!! :-)\n\n" + JSON.stringify(this.addUserForm.value, null, 4)
  //     // );
  //     // this.addData(this.addDataForm.value);

  //     // this.onRoute();
  //   }
  //   // display form values on success
  // }


  onSubmit(value) {
    this.isSubmitted = true;

    // stop here if form is invalid
    if (this.addDataForm.invalid) {
      return;
    }

    this.apiEditCategory.addCategory(value, this.InfoId).subscribe((response) => {
      // alert(JSON.stringify(value));
      this.modelRef.hide();

      // this.topicModal.hide();
      this.getCategory(this.InfoId);
      //   if (response.success == true) {

      //     this.topicModal.hide();
      //     this.getYearList(this.InfoId);
      //   } else {
      //     console.log('else');
      //     alert("ปีนี้มีแล้ว");

      // this.addDataForm.reset(this.addDataForm);


      //     return { validType: true };
      //   }
      //   console.log('นอก else');

      //   // alert(JSON.stringify(this.user.message));
    });


    // this.onRoute();

    // display form values on success
  }



  addFormModal(createmodal: TemplateRef<any>) {
    this.modelRef = this.modalService.show(
      createmodal,
      Object.assign({}, { class: "gray modal-md modal-dialog-centered" })
    );
    // this.addDataForm = this.fb.group({
    //   year: new FormControl("", [
    //     Validators.required,
    //     // this.forbiddenNames.bind(this),
    //     this.checkYear1.bind(this)

    //   ]),

    //   // sector_id: new FormControl(this.InfoId),
    // });
    this.addDataForm = this.fb.group({
      "category": new FormControl(null, [Validators.required], this.checkCategory.bind(this)),
      // this.forbiddenNames.bind(this),
    })
    this.addDataForm.patchValue({
      "category": " ",
      // "memberTypesId": value.memberTypeId.toString(),
      // "Target": value.target,
      // "StartDate": this.startDate,
      // "EndDate": value.endDate ,


    })

  }


  EditCategory(value) {

    this.editSubmitted = true;
    if (this.editForm.invalid) {
      return;
    }

    this.modelRef.hide();

    this.apiEditCategory.editCategory(value).subscribe(response => {
      console.log('response', response)



      this.getCategory(this.InfoId);

    })
  }





  EditFormModal(createmodal: TemplateRef<any>, value) {
    this.modelRef = this.modalService.show(
      createmodal,
      Object.assign({}, { class: "gray modal-md modal-dialog-centered" })
    );

    this.editForm = this.fb.group({
      "id": new FormControl(value.id),
      "category": new FormControl(null, [Validators.required], this.checkCategory.bind(this)),
      "sector_id": new FormControl(this.InfoId),
    });

    this.editForm.patchValue({
      "category": value.type,
    });
  }

  async checkCategory(control: FormControl) {
    console.log(control.value);
    let result = await this.apiEditCategory
      .checkCategory(
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




  sendMessage(): void {

  }

  get g() {
    return this.editForm.controls;
  }


  get f() {
    return this.addDataForm.controls;
  }

  toTypes(category_id) {
    // alert("xxx");
    console.log("category id=>", category_id);
    // this.router.navigate(["categories/types",category_id]);
    this.router.navigate(["categories/types"], {
      queryParams: { categoryID: category_id },
    });
  }

  confirm(category_id, category_type) {
    this.confirmModal.show();
    this.tmp = category_id;
    this.tmpName = category_type;

  }



  onUpdate() { }
  onDelete() {
    this.apiEditCategory.removeCategory(this.tmp).subscribe((response) => { });
    this.confirmModal.hide();
    this.getCategory(this.InfoId);
  }
}
