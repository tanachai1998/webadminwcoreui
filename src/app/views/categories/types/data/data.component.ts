import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap/modal";
import {
  FeedDataService,
  TableData,
} from "../../../../services/feed-data.service";
import { AddDataService } from "../../../../services/add-data.service";

import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
  NgForm,
} from "@angular/forms";
import {
  BsModalRef,
  BsModalService,
} from "ngx-bootstrap/modal";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-data",
  templateUrl: "./data.component.html",
  providers: [FeedDataService],
})
export class DataComponent implements OnInit {
  @ViewChild("dataModal") public dataModal: ModalDirective;
  @ViewChild("confirmModal") public confirmModal: ModalDirective;


  error: any;
  public data: TableData;
  public filterQuery = "";
  userID;
  InfoId: any;
  sector_Info: any;
  Info: any;
  regulationInfo: any;
  categoryInfo: any;
  regulationType: any;
  isExtend: boolean = false;
  isExtend2: boolean = false;
  swap: boolean = false;
  tmp: boolean = true;
  category_id: any;
  fileInfo: any;
  year_list: any;
  tmpName: any;
  loading = false;

  addDataForm: FormGroup;
  editForm: FormGroup;
  modelRefEdit: BsModalRef;
  modelRefDel: BsModalRef;



  status: any;
  state: any;
  files = [];
  fileOfTop: any;
  isSubmitted: boolean;
  tmpVal: any;
  tmpVal_file_id: any;
  tmpVal_name: any;
  dtOptions: DataTables.Settings = {};

  constructor(
    protected apiGetRegulation: FeedDataService,
    private apiDataInfo: FeedDataService,
    private apiEditData: AddDataService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private modalService: BsModalService

  ) {
    this.apiDataInfo.getData().subscribe(
      (data: TableData) => {
        setTimeout(() => {
          this.data = [...data];
        }, 1000);
      }, // success path
      (error) => (this.error = error) // error path
    );
  }

  ngOnInit(): void {
    this.getLocalStorage();
    this.addForm();

    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
    };
  }
  getLocalStorage() {

    if (this.InfoId == 6) {
      this.apiGetRegulation.getCategory(this.InfoId)
        .subscribe(result => {
          //console.log("role5" , result); 
          this.InfoId = 6;
          console.log("categoryID =>", this.category_id);
          this.route.queryParams.subscribe((params) => {
            this.category_id = params["categoryID"];
          });
          this.sector_Info = localStorage.getItem("sectorId");

          this.route.queryParams.subscribe((params) => {
            this.regulationInfo = params["regualtionType"];
          });
          console.log("type regulationInfo id =>", this.regulationInfo);
          this.getFileInfo(this.regulationInfo);
          this.getYearList(this.InfoId);
        })
    }
    else if (this.InfoId == 5) {
      this.apiGetRegulation.getCategory(this.InfoId)
        .subscribe(result => {
          //console.log("role5" , result); 
          this.InfoId = 5;
          console.log("categoryID =>", this.category_id);
          this.route.queryParams.subscribe((params) => {
            this.category_id = params["categoryID"];
          });
          this.sector_Info = localStorage.getItem("sectorId");

          this.route.queryParams.subscribe((params) => {
            this.regulationInfo = params["regualtionType"];
          });
          console.log("type regulationInfo id =>", this.regulationInfo);
          this.getFileInfo(this.regulationInfo);
          this.getYearList(this.InfoId);
        })
    }
    else if (this.InfoId == 4) {
      this.apiGetRegulation.getCategory(this.InfoId)
        .subscribe(result => {
          //console.log("role5" , result); 
          this.InfoId = 4;
          console.log("categoryID =>", this.category_id);
          this.route.queryParams.subscribe((params) => {
            this.category_id = params["categoryID"];
          });
          this.sector_Info = localStorage.getItem("sectorId");

          this.route.queryParams.subscribe((params) => {
            this.regulationInfo = params["regualtionType"];
          });
          console.log("type regulationInfo id =>", this.regulationInfo);
          this.getFileInfo(this.regulationInfo);
          this.getYearList(this.InfoId);
        })
    }
    else if (this.InfoId == 3) {
      this.apiGetRegulation.getCategory(this.InfoId)
        .subscribe(result => {
          //console.log("role5" , result); 
          this.InfoId = 3;
          console.log("categoryID =>", this.category_id);
          this.route.queryParams.subscribe((params) => {
            this.category_id = params["categoryID"];
          });
          this.sector_Info = localStorage.getItem("sectorId");

          this.route.queryParams.subscribe((params) => {
            this.regulationInfo = params["regualtionType"];
          });
          console.log("type regulationInfo id =>", this.regulationInfo);
          this.getFileInfo(this.regulationInfo);
          this.getYearList(this.InfoId);
        })
    }
    else if (this.InfoId == 2) {
      this.apiGetRegulation.getCategory(this.InfoId)
        .subscribe(result => {
          //console.log("role5" , result); 
          this.InfoId = 2;
          console.log("categoryID =>", this.category_id);
          this.route.queryParams.subscribe((params) => {
            this.category_id = params["categoryID"];
          });
          this.sector_Info = localStorage.getItem("sectorId");

          this.route.queryParams.subscribe((params) => {
            this.regulationInfo = params["regualtionType"];
          });
          console.log("type regulationInfo id =>", this.regulationInfo);
          this.getFileInfo(this.regulationInfo);
          this.getYearList(this.InfoId);
        })
    }
    else {
      this.apiGetRegulation.getCategory(this.InfoId)
        .subscribe(result => {
          //console.log("role5" , result); 
          this.InfoId = 1;
          console.log("categoryID =>", this.category_id);
          this.route.queryParams.subscribe((params) => {
            this.category_id = params["categoryID"];
          });
          this.sector_Info = localStorage.getItem("sectorId");

          this.route.queryParams.subscribe((params) => {
            this.regulationInfo = params["regualtionType"];
          });
          console.log("type regulationInfo id =>", this.regulationInfo);
          this.getFileInfo(this.regulationInfo);
          this.getYearList(this.InfoId);
        })
    }
  }

  getFileInfo(regulation_id) {
    console.log("sector_id =>", this.sector_Info);
    console.log("category =>", this.category_id);
    console.log("regulationInfo =>", this.regulationInfo);
    this.apiDataInfo.getFile(regulation_id).subscribe((response) => {
      this.fileInfo = response;
      this.loading = true;
      console.log("file =>", this.fileInfo);
    });
  }
  getYearList(value) {
    this.apiDataInfo.getYearList(value).subscribe((response) => {
      this.year_list = response;
    });
  }

  addForm() {
    this.addDataForm = this.fb.group({
      topic: new FormControl("", [Validators.required]),
      subTopic: new FormControl("", [Validators.required]),
      regulation_id: new FormControl(this.InfoId),
    });

  }
  addData(value) {
    alert(JSON.stringify(value));
    this.addDataForm.reset();
    this.apiEditData
      .addInfo(value, this.regulationInfo)
      .subscribe((response) => {

        this.status = response;
        this.state = this.status.success;
        console.log("status = ", this.status.success);
        if (this.state == true) {
          console.log("SSstatus = ", this.state);

          this.dataModal.hide();
        }
      });
  }

  get f() {
    return this.addDataForm.controls;
  }



  upload() {
    alert('in upload')
    const formData = new FormData();
    for (var i = 0; i < this.files.length; i++) {
      formData.append(`filename[${i}]`, this.files[i]);
    }
    console.log("this.files", this.files);

    formData.append("regulation_id", this.addDataForm.value.regulation_id);
    formData.append("topic", this.addDataForm.value.topic);
    formData.append("subTopic", this.addDataForm.value.subTopic);
    this.apiEditData.addFiles(formData).subscribe((result) => {
      console.log(result);

    });
    setTimeout(() => {
      this.dataModal.hide();
      this.getFileInfo(this.InfoId);

      setTimeout(() => {
        this.addDataForm.reset();


      }, 1000);

    }, 1000);
  }

  onSelectFile(event) {
    this.files = event.target.files;

  }
  EditDataInfo(value) {
    this.isSubmitted = true;
    if (this.editForm.invalid) {
      alert('xxxxx')
      return;
    }
    alert(JSON.stringify(value));


    const formData = new FormData();
    for (var i = 0; i < this.files.length; i++) {
      formData.append(`filename[${i}]`, this.files[i]);
    }
    console.log("this.files", this.files);
    console.log("this.files", this.editForm.value.id);

    formData.append("file_id", this.editForm.value.id);
    formData.append("regulation_id", this.editForm.value.regulation_id);
    formData.append("topic", this.editForm.value.topic);
    formData.append("subTopic", this.editForm.value.subTopic);
    this.apiEditData.editFile(formData).subscribe((result) => {
      console.log(result);

    });
    setTimeout(() => {
      this.modelRefEdit.hide();

      this.getFileInfo(this.InfoId);
      setTimeout(() => {
        this.editForm.reset();


      }, 3000);



    }, 1000);


  }

  EditFormModal(createmodal: TemplateRef<any>, value) {
    // alert(JSON.stringify(value))
    this.modelRefEdit = this.modalService.show(
      createmodal,
      Object.assign({}, { class: "gray modal-lg modal-dialog-centered" })
    );
    //console.log("value", (value));
    this.apiDataInfo.getFiles(value.id).subscribe((response) => {
      this.fileOfTop = response;
    });

    this.tmpVal = value;

    this.editForm = this.fb.group({
      id: new FormControl(value.id),
      regulation_id: new FormControl(value.regulation_id),
      topic: new FormControl(null, [Validators.required]),
      subTopic: new FormControl(null, [Validators.required]),


    });

    this.editForm.patchValue({
      topic: value.topic,
      subTopic: value.subTopic,


    });
    console.log("val -> id", value.id);

    console.log("edit form", this.editForm);
  }


  get g() {
    return this.editForm.controls;
  }

  openFile(value) {
    // window.location.href = 'http://127.0.0.1/public/uploadfiles/Files/' + value;
    window.open(`http://127.0.0.1/TOTFinancial/public/uploadfiles/Files/${value}`, "_blank");
  }

  confirm(data_id, data_topic) {
    this.confirmModal.show();
    this.tmp = data_id;
    this.tmpName = data_topic;
  }

  onDelete() {
    this.apiEditData.removeFile(this.tmp).subscribe((result) => { });
    this.confirmModal.hide();

    setTimeout(() => {
      this.getFileInfo(this.InfoId);

    }, 1000);
  }


  onDeleteFiles() {
    this.apiEditData.removeFiles(this.tmpVal_file_id).subscribe((result) => { });
    // this.confirmModal.hide();
    this.modelRefDel.hide();
    setTimeout(() => {

      this.apiDataInfo.getFiles(this.tmpVal.id).subscribe((response) => {
        this.fileOfTop = response;
      });
    }, 1000);
  }
  ConfirmFormModal(createmodal: TemplateRef<any>, value) {
    this.modelRefDel = this.modalService.show(
      createmodal,
      Object.assign({}, { class: "modal-danger modal-md modal-dialog-centered" })
    );
    this.tmpVal_file_id = value.id;
    console.log('tmpVal_file_id=>', this.tmpVal_file_id);
    this.tmpVal_name = value.file_name;
  }


}
