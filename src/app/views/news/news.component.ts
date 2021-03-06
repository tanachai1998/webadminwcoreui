import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { BsModalRef, BsModalService, ModalDirective } from "ngx-bootstrap/modal";
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
import { ValidateAdminService } from "../../services/validate-admin.service";
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: "app-news",
  templateUrl: "./news.component.html",
  styleUrls: ["./news.component.css"],
})
export class NewsComponent implements OnInit {
  @ViewChild("topicModal") public topicModal: ModalDirective;
  @ViewChild("editModal") public editModal: ModalDirective;
  @ViewChild("viewImageModal") public viewImageModal: ModalDirective;
  @ViewChild("confirmModal") public confirmModal: ModalDirective;
  @ViewChild("detailModal") public detailModal: ModalDirective;

  addDataForm: FormGroup;
  addHomeStatus: FormGroup;
  userID;
  InfoId: any;
  editForm: FormGroup;
  modelRef: BsModalRef;

  test: any = [];
  Info: any;
  regulationType: any;
  news: any;
  newsInfo: any;
  sectorInfo: any;
  sectorID: any;
  sector: any;
  status: any;
  state: any;
  isSubmitted: boolean;
  fileToUpload: File = null;
  loading = false;
  files: any = [];
  tmp: number;
  tmpName: any;
  del: any;
  onChangeStatus: any;
  topic: any;
  detail: any;
  email: any;
  admin: any;
  constructor(
    private apiGetData: FeedDataService,
    private fb: FormBuilder,
    private apiAddData: AddDataService,
    private router: Router,
    private modalService: BsModalService,
    private auth: AuthService,
    private validate: ValidateAdminService

  ) {}

  ngOnInit(): void {
    this.email=this.auth.getUser().email;
    this.getLocalStorage(this.email);
//  alert(JSON.stringify(this.admin))
    this.addDataForm = this.fb.group({
      sector_id: new FormControl(""),
      topic: new FormControl("", [Validators.required]),
      detail: new FormControl("", [Validators.required]),
      files: new FormControl("", [Validators.required]),
    });

  }

  getLocalStorage(data) {
    this.validate.getbyemail(data).subscribe(result =>{
      this.admin = result
      this.addDataForm.patchValue({
        sector_id: this.admin.sector_id
      });
      if(this.admin.sector_id == 6){
        this.apiGetData.getNews(this.InfoId)
        .subscribe(result=>{
          this.InfoId = 6
          this.getNews(this.InfoId)
          // this.resultcategory = result
          this.loading = false
        })
      }
      else if (this.admin.sector_id == 5) {
       this.apiGetData.getNews(this.InfoId)
         .subscribe(result => {
           this.InfoId = 5
           this.getNews(this.InfoId);
          //  this.resultcategory = result
           this.loading = false
         })
     }
     else if (this.admin.sector_id == 4) {
       this.apiGetData.getNews(this.InfoId)
         .subscribe(result => {
           this.InfoId = 4
           this.getNews(this.InfoId);
          //  this.resultcategory = result
           this.loading = false
         })
     }
     else if (this.admin.sector_id == 3) {
       this.apiGetData.getNews(this.InfoId)
         .subscribe(result => {
           this.InfoId = 3
           this.getNews(this.InfoId);
          //  this.resultcategory = result
           this.loading = false
         })
     }
     else if (this.admin.sector_id == 2) {
       this.apiGetData.getNews(this.InfoId)
         .subscribe(result => {
           this.InfoId = 2
           this.getNews(this.InfoId);
          //  this.resultcategory = result
           this.loading = false
         })
     }
     else {
       this.apiGetData.getNews(this.InfoId)
         .subscribe(result => {
           this.InfoId = 1
           this.getNews(this.InfoId);
          //  this.resultcategory = result
           this.loading = false
         })
     }
     console.log('NewsSectorID',this.admin);
    // this.InfoId = 1;
    // this.getNews(this.InfoId);
      })
    }

  userInfo(value) {
    this.apiGetData.queryUserInfo(value).subscribe((response) => {
      this.Info = response;
      this.sectorInfo = response.sector.fullName;
      this.sectorID = response.sector.id;

      console.log("Info = ", this.Info);
      console.log("Info = ", this.sectorInfo);
      console.log("Sector = ", this.sectorID);
    });
  }
  getNews(value) {
    
    this.apiGetData.getNews(value).subscribe((response) => {
      this.news = response;
      this.loading = true;
      console.log("News", this.news);
      localStorage.setItem("news_id", JSON.stringify(this.news.id));
    });
  }

  // addForm() {
  //   this.addDataForm = this.fb.group({
  //     topic: new FormControl("", [Validators.required]),
  //     detail: new FormControl("", [Validators.required]),
  //     sector_id: new FormControl(this.InfoId),
  //   });


  // }
  
  addData(value) {

    alert(JSON.stringify(value));
    // this.addDataForm.reset();
    this.loading = false;
    this.apiAddData.addNews(value,this.addDataForm.value.files).subscribe(response => {
      console.log("response", response);
      this.status = response;
      this.state = this.status.success;
      console.log("status = ", this.status.success);
      if (this.state == true) {
        console.log("SSstatus = ", this.state);

      }
      this.isSubmitted = true;
      this.modelRef.hide()
      this.getLocalStorage(this.email);
      //this.files = [];
    });
    this.addDataForm.reset();
    alert("เพิ่มเรียบร้อย");
  }

  get f() {
    return this.addDataForm.controls;
  }
  
  onSubmit() {
    this.isSubmitted = true;
    // stop here if form is invalid
    if (this.addDataForm.invalid) {
      return;
    } else if (this.addDataForm.valid) {

      this.addData(this.addDataForm.value);
    }
    this.addDataForm.reset
    // display form values on success
  }
  
  toNewInfo(news_id) {

    this.apiGetData.getNewInfo(news_id).subscribe((response) => {
      this.newsInfo = response;
      this.newsInfo = response.map((result) => {
        return { ...result, image: `http://localhost/TOTFinancial/public/img/${result.image}` };
      });
      this.detailModal.show();
    });
    console.log("news id=>", news_id);
    // this.router.navigate(["news/new-info",news_id]);
  }

  getNewsInfo(value) {
    this.apiGetData.getNewInfo(value).subscribe((response) => {
      this.newsInfo = response.map((result) => {
        return { ...result, image: `http://localhost/TOTFinancial/public/img/${result.image}` };
      });
      console.log("newsInfo =>", this.newsInfo.image);
      this.viewImageModal.show();
    });
  }

  onSelectFile(event) {
    // this.files = event.target.files;
    const file = (event.target as HTMLInputElement).files;
    this.addDataForm.patchValue({
      files: file
    });
    this.addDataForm.get('files').updateValueAndValidity()
  }

  // upload() {
  //   alert("alert")
  //   this.isSubmitted = true;

  //   // stop here if form is invalid
  //   if (this.addDataForm.invalid) {
  //      alert('xxxxx')
  //     return;
  //   } else if (this.addDataForm.valid) {
  //     const formData = new FormData();
  //     for (var i = 0; i < this.files.length; i++) {
  //       formData.append(`filename[${i}]`, this.files[i]);
  //     }
  //     console.log("this.files", this.files);

  //     formData.append("sector_id", this.addDataForm.value.sector_id);
  //     formData.append("topic", this.addDataForm.value.topic);
  //     formData.append("detail", this.addDataForm.value.detail);
  //     this.apiAddData.addNews(formData, this.files).subscribe((result) => {
  //       console.log("ddsdsdsdssdds",result);
  //     });
  //   }
  // }
    

  confirm(regulation_id, regulation_name) {
    this.confirmModal.show();
    this.tmp = regulation_id;
    this.tmpName = regulation_name;
  }
  
  Deletemodal(id){
    console.log("id",id)
    this.confirmModal.show();
    this.del = id;
  }

  onCheckChange(value) {
    this.onChangeStatus = value.id;
    console.log("value.id =>", value.id);
    this.homeStatusForm();
  }
  homeStatusForm() {
    this.addHomeStatus = this.fb.group({
      homeStatus: new FormControl("", this.onChangeStatus),
    });
  }

  changeHomeStatus() {
    alert("home status");
    const formData = new FormData();

    formData.append("homeStatus", this.addHomeStatus.value.homeStatus);
    console.log("fomr data=>", formData);
  }

  onUpdate() {}
  
  onDelete() {
    this.loading = false
    this.confirmModal.hide();
    this.apiAddData.removeNews(this.del).subscribe((response) => {
      this.getLocalStorage(this.email)
    })
  }
  EditFormModal(createmodal: TemplateRef<any>, value) {
    this.modelRef = this.modalService.show(
      createmodal,
      Object.assign({}, { class: "gray modal-md modal-dialog-centered" })
    );

    this.editForm = this.fb.group({
      id: new FormControl(value.id),
      topic: new FormControl(null, [Validators.required]),
      detail: new FormControl(this.InfoId),

    });

    this.editForm.patchValue({
      topic: value.topic,
      detail: value.detail,
    });
    console.log("val -> id", value.id);

    console.log("edit form", this.editForm);
  }

  EditNews(value) {
    this.loading = false
    this.isSubmitted = true;
    if (this.editForm.invalid) {
      // alert('xxxxx')
      return;
    }
    alert(JSON.stringify(value));
    this.modelRef.hide();
    this.apiAddData.editNews(value).subscribe((response) => {
      console.log("response", response);
      this.getLocalStorage(this.email)
    });
    // setTimeout(() => {
    //   this.getNews(this.InfoId);


    // }, 1000);

  }
  openModal(template: TemplateRef<any>, topic, detail,files,) {
    this.topic = topic;
    this.detail = detail;
    this.files = files;
    this.modelRef = this.modalService.show(template);
  }

  get g() {
    return this.editForm.controls;
  }

}
