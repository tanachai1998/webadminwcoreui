import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
  NgForm,
} from "@angular/forms";
import {
  ModalDirective,
  BsModalRef,
  BsModalService,
} from "ngx-bootstrap/modal";
import { ActivatedRoute, Router } from "@angular/router";

import { FeedDataService } from "../../../services/feed-data.service";
import { AddDataService } from "../../../services/add-data.service";
import { ValidateAdminService } from "../../../services/validate-admin.service";
import { AuthService } from "../../../shared/services/auth.service";
@Component({
  selector: "app-types",
  templateUrl: "./types.component.html",
  styleUrls: ["./types.component.css"],
})
export class TypesComponent implements OnInit {
  @ViewChild("topicModal") public topicModal: ModalDirective;
  @ViewChild("editModal") public editModal: ModalDirective;
  @ViewChild("confirmModal") public confirmModal: ModalDirective;

  dtOptions: DataTables.Settings = {};

  InfoId: any;
  regulationType: regList[];
  regulationForFilter: regList[];

  addDataForm: FormGroup;
  editForm: FormGroup;
  modelRef: BsModalRef;
  status: any;
  state: any;
  category_id: any;
  isSubmitted: boolean;
  year_list: any;
  showTypeText = false;
  loading = false;
  isInsert = false;

  strID: any;
  tmp: number;
  tmpName: string;
  showRegulation: any;

  yearPatchVal: any;
  yearOnChange: any;
  typeOnChange: any;
  value: any = []
  sector_id: any = []
  email
  admin
  constructor(
    protected apiGetRegulation: FeedDataService,
    protected apiEditData: AddDataService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    private auth: AuthService,
    private validate: ValidateAdminService
  ) {

  }

  ngOnInit(): void {
    // alert('type');
    this.email = this.auth.getUser().email;
    this.getLocalStorage(this.email);
    this.getRegulationType
    this.addForm();
  }

  getLocalStorage(data) {
    this.validate.getbyemail(data).subscribe(result => {
      this.admin = result
      if (this.admin.sector_id == 6) {
        this.apiGetRegulation.getCategory(this.InfoId)
          .subscribe(result => {
            //console.log("role5" , result); 
            this.InfoId = 6
            this.route.queryParams.subscribe((params) => {
              this.category_id = params["categoryID"];
            });
            console.log("type category id =>", this.category_id);

            console.log("sector_id=>", this.admin.sector_id);
            this.strID = this.category_id;
            console.log(" str id =>", this.strID);

            this.getRegulationType(this.strID, this.InfoId);
            this.getYearList(this.InfoId);
          })
      }
      else if (this.admin.sector_id == 5) {
        this.apiGetRegulation.getCategory(this.InfoId)
          .subscribe(result => {
            //console.log("role5" , result); 
            this.InfoId = 5
            this.route.queryParams.subscribe((params) => {
              this.category_id = params["categoryID"];
            });
            console.log("type category id =>", this.category_id);

            console.log("sector_id=>", this.admin.sector_id);
            this.strID = this.category_id;
            console.log(" str id =>", this.strID);

            this.getRegulationType(this.strID, this.InfoId);
            this.getYearList(this.InfoId);
          })
      }
      else if (this.admin.sector_id == 4) {
        this.apiGetRegulation.getCategory(this.InfoId)
          .subscribe(result => {
            //console.log("role5" , result); 
            this.InfoId = 4
            this.route.queryParams.subscribe((params) => {
              this.category_id = params["categoryID"];
            });
            console.log("type category id =>", this.category_id);

            console.log("sector_id=>", this.admin.sector_id);
            this.strID = this.category_id;
            console.log(" str id =>", this.strID);

            this.getRegulationType(this.strID, this.InfoId);
            this.getYearList(this.InfoId);
          })
      }
      else if (this.admin.sector_id == 3) {
        this.apiGetRegulation.getCategory(this.InfoId)
          .subscribe(result => {
            //console.log("role5" , result); 
            this.InfoId = 3
            this.route.queryParams.subscribe((params) => {
              this.category_id = params["categoryID"];
            });
            console.log("type category id =>", this.category_id);

            console.log("sector_id=>", this.admin.sector_id);
            this.strID = this.category_id;
            console.log(" str id =>", this.strID);

            this.getRegulationType(this.strID, this.InfoId);
            this.getYearList(this.InfoId);
          })
      }
      else if (this.admin.sector_id == 2) {
        this.apiGetRegulation.getCategory(this.InfoId)
          .subscribe(result => {
            //console.log("role5" , result); 
            this.InfoId = 2
            this.route.queryParams.subscribe((params) => {
              this.category_id = params["categoryID"];
            });
            console.log("type category id =>", this.category_id);

            console.log("sector_id=>", this.admin.sector_id);
            this.strID = this.category_id;
            console.log(" str id =>", this.strID);

            this.getRegulationType(this.strID, this.InfoId);
            this.getYearList(this.InfoId);
          })
      }
      else {
        this.apiGetRegulation.getCategory(this.InfoId)
          .subscribe(result => {
            //console.log("role5" , result); 
            this.InfoId = 1
            this.route.queryParams.subscribe((params) => {
              this.category_id = params["categoryID"];
            });
            console.log("type category id =>", this.category_id);

            console.log("sector_id=>", this.admin.sector_id);
            this.strID = this.category_id;
            console.log(" str id =>", this.strID);

            this.getRegulationType(this.strID, this.InfoId);
            this.getYearList(this.InfoId);
          })
      }
    }
    )
  }

  getRegulationType(category_id, sector_id) {
    if (this.admin.sector_id == 6) {
      this.loading = false;
      this.apiGetRegulation
        .getRegulationType(category_id, sector_id)
        .subscribe((response) => {
          this.regulationType = response;
          this.regulationForFilter = response;
          console.log("reg", this.regulationType);

          this.loading = true;
          this.dtOptions = {
            pagingType: "simple_numbers",
            pageLength: 10,
          };
          this.showRegulation = this.regulationType;
        });
    }
    else if (this.admin.sector_id  == 5) {
      this.loading = false;
      this.apiGetRegulation
        .getRegulationType(category_id, sector_id)
        .subscribe((response) => {
          this.regulationType = response;
          this.regulationForFilter = response;
          console.log("reg", this.regulationType);

          this.loading = true;
          this.dtOptions = {
            pagingType: "simple_numbers",
            pageLength: 10,
          };
          this.showRegulation = this.regulationType;
        });
    }
    else if (this.admin.sector_id  == 4) {
      this.loading = false;
      this.apiGetRegulation
        .getRegulationType(category_id, sector_id)
        .subscribe((response) => {
          this.regulationType = response;
          this.regulationForFilter = response;
          console.log("reg", this.regulationType);

          this.loading = true;
          this.dtOptions = {
            pagingType: "simple_numbers",
            pageLength: 10,
          };
          this.showRegulation = this.regulationType;
        });
    }
    else if (this.admin.sector_id  == 3) {
      this.loading = false;
      this.apiGetRegulation
        .getRegulationType(category_id, sector_id)
        .subscribe((response) => {
          this.regulationType = response;
          this.regulationForFilter = response;
          console.log("reg", this.regulationType);

          this.loading = true;
          this.dtOptions = {
            pagingType: "simple_numbers",
            pageLength: 10,
          };
          this.showRegulation = this.regulationType;
        });
    }
    else if (this.admin.sector_id  == 2) {
      this.loading = false;
      this.apiGetRegulation
        .getRegulationType(category_id, sector_id)
        .subscribe((response) => {
          this.regulationType = response;
          this.regulationForFilter = response;
          console.log("reg", this.regulationType);

          this.loading = true;
          this.dtOptions = {
            pagingType: "simple_numbers",
            pageLength: 10,
          };
          this.showRegulation = this.regulationType;
        });
    }
    else {
      this.loading = false;
      this.apiGetRegulation
        .getRegulationType(category_id, sector_id)
        .subscribe((response) => {
          this.regulationType = response;
          this.regulationForFilter = response;
          console.log("reg", this.regulationType);

          this.loading = true;
          this.dtOptions = {
            pagingType: "simple_numbers",
            pageLength: 10,
          };
          this.showRegulation = this.regulationType;
        });

    }


  }

  filterYear(filterVal: any) {
    this.loading = false;
    console.log("reg3", this.regulationType);
    console.log("reg4", this.regulationForFilter);
    if (filterVal == "0") {
      this.regulationType = this.regulationForFilter;
      setTimeout(() => {
        this.loading = true;
      }, 1);
    } else {
      this.regulationType = this.regulationForFilter.filter(
        (item) => item.year.year == filterVal
      );
      setTimeout(() => {
        this.loading = true;
      }, 1);
      console.log("filter value 11= >", filterVal);

      console.log("filter value = >", this.regulationType);
    }

  }

  getYearList(sector_id) {
    this.apiGetRegulation.getYearList(sector_id).subscribe((response) => {
      this.year_list = response;
      console.log('year', this.year_list)
    });
  }

  addForm() {
    // alert("test")
    this.addDataForm = this.fb.group({
      type: new FormControl(
        "", [Validators.required],
        this.checkRegulation.bind(this)
      ),


      sector_id: new FormControl(this.InfoId),
      category_id: new FormControl(this.category_id),
      year: new FormControl("", [Validators.required]),
    });

    console.log("this. data form", this.addDataForm);

  }

  EditFormModal(createmodal: TemplateRef<any>, value) {
    this.modelRef = this.modalService.show(
      createmodal,
      Object.assign({}, { class: "gray modal-md modal-dialog-centered" })
    );

    this.editForm = this.fb.group({
      id: new FormControl(value.id),
      type: new FormControl(null, [Validators.required], this.checkRegulation.bind(this)),
      sector_id: new FormControl(this.InfoId),
      category_id: new FormControl(this.category_id),
      year: new FormControl(null, [Validators.required]),

    });

    this.yearPatchVal = value.year.id;
    console.log("year Patch", this.yearPatchVal);
    this.editForm.patchValue({
      type: value.type,
      year: value.year,


    });
    console.log("val -> id", value.id);

    console.log("edit form", this.editForm);
  }



  async checkRegulation(control: FormControl) {
    console.log(control.value);
    let result = await this.apiEditData
      .checkRegulation(
        control.value,
        this.yearOnChange,
        this.category_id,
        this.InfoId
      )
      .toPromise();
    console.log("coontrol .value", control.value);
    console.log("result=>", result);
    if (result.success == false) {
      return { validType: true };
    }
    null;
  }

  onChangeYear(value) {
    this.yearOnChange = value.id;
    console.log("value.target", value.id);
    if (value.id == null) {
      this.showTypeText = false;
    } else {

      if (this.isInsert == true) {

        this.addDataForm.patchValue({ type: "" });
      }

      this.showTypeText = true;
    }

  }

  insertType() {
    this.topicModal.show();
    this.modelRef = this.modalService.show(
      Object.assign({}, { class: "gray modal-md modal-dialog-centered" })
    );
    this.addDataForm = this.fb.group({
      "category": new FormControl(null, [Validators.required], this.checkRegulation.bind(this)),
    })
    this.addDataForm.patchValue({
      "category": " ",


    })

  }


  EditRegulation(value) {
    this.isSubmitted = true;
    if (this.editForm.invalid) {
      alert('xxxxx')
      return;
    }
    alert(JSON.stringify(value));
    this.modelRef.hide();
    this.apiEditData.editRegulation(value).subscribe((response) => {
      console.log("response", response);

      this.getRegulationType(this.strID, this.admin.sector_id);
    });
  }

  get f() {
    return this.addDataForm.controls;
  }

  get g() {
    return this.editForm.controls;
  }
  onSubmit(value) {
    this.isSubmitted = true;

    // stop here if form is invalid
    if (this.addDataForm.invalid) {
      // alert('xxxxx')
      return;
    }
    this.apiEditData
      .addRegulation(value, this.category_id, this.InfoId)
      .subscribe((response) => {
        this.status = response;
        console.log("response = >", response);
        if (this.status.success == true) {
          console.log("SSstatus = ", this.state);

          this.topicModal.hide();
          this.getRegulationType(this.strID, this.InfoId);
          console.log("sector_id", this.sector_id);
        }
      });

  }


  toDataInfo(category_id) {
    console.log("category id=>", category_id);
    this.router.navigate(["categories/types/data"], {
      queryParams: { categoryID: category_id },
    });
  }

  // toDataInfo(id) {
  //   console.log("category_id =>", id);
  //   this.router.navigate(["categories/types/data"], {queryParams: { regualtionType: id },}
  
  //   );
  // }

  confirm(regulation_id, regulation_name) {
    this.confirmModal.show();
    this.tmp = regulation_id;
    this.tmpName = regulation_name;
  }

  onUpdate() { }
  onDelete() {
    console.log("tmp => ", this.tmp);

    this.apiEditData.removeType(this.tmp).subscribe((response) => { });
    this.confirmModal.hide();
    this.getRegulationType(this.category_id, this.InfoId);
  }
  selectedYear(year_id) {
    alert("selected");

    console.log("year id = ", year_id);
  }
}

interface regList {
  category_regulation_id: number;
  created_at: string;
  id: number;
  sector_id: number;
  type: string;
  updated_at: string;
  year_id: number;
  year: Year;
}
interface Year {
  created_at: string;
  id: number;
  sector_id: number;
  updated_at: string;
  year: number;
}
