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
  InfoId1: any;
  editForm: FormGroup;
  modelRef: BsModalRef;

  test: any = [];
  Info: any;
  regulationType: any;
  news: any;
  newsInfo: any;
  sectorInfo: any;
  sectorID: any;
  status: any;
  state: any;
  isSubmitted: boolean;
  fileToUpload: File = null;
  loading = false;
  files = [];
  tmp: any;
  tmpName: any;

  onChangeStatus: any;
  constructor(
    private apiGetData: FeedDataService,
    private fb: FormBuilder,
    private apiAddData: AddDataService,
    private router: Router,
    private modalService: BsModalService

  ) {}

  ngOnInit(): void {
    this.getLocalStorage();
    this.addForm();
  }

  getLocalStorage() {

    this.InfoId = 1;
    this.getNews(this.InfoId);
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
      console.log("News topic", response.type);
      localStorage.setItem("news_id", JSON.stringify(this.news.id));

    });
  }

  addForm() {
    this.addDataForm = this.fb.group({
      topic: new FormControl("", [Validators.required]),
      detail: new FormControl("", [Validators.required]),
      sector_id: new FormControl(this.InfoId),
    });

  }
  addData(value) {
    alert(JSON.stringify(value));
    this.addDataForm.reset();
    this.apiAddData.addNews(value).subscribe((response) => {
      console.log("response", response);
      this.status = response;
      this.state = this.status.success;
      console.log("status = ", this.status.success);
      if (this.state == true) {
        console.log("SSstatus = ", this.state);

        this.topicModal.hide();
        this.getNews(this.InfoId);
      }
    });
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
    // display form values on success
  }
  toNewInfo(news_id) {

    this.apiGetData.getNewInfo(news_id).subscribe((response) => {
      this.newsInfo = response;
      console.log("newsInfo =>", this.newsInfo.image);
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
    this.files = event.target.files;
  }

  upload() {
    this.isSubmitted = true;

    // stop here if form is invalid
    if (this.addDataForm.invalid) {
      // alert('xxxxx')
      return;
    } else if (this.addDataForm.valid) {
      const formData = new FormData();
      for (var i = 0; i < this.files.length; i++) {
        formData.append(`filename[${i}]`, this.files[i]);
      }
      console.log("this.files", this.files);

      formData.append("sector_id", this.addDataForm.value.sector_id);
      formData.append("topic", this.addDataForm.value.topic);
      formData.append("detail", this.addDataForm.value.detail);
      this.apiAddData.addNews(formData).subscribe((result) => {
        console.log(result);
      });
    }
  }

  confirm(regulation_id, regulation_name) {
    this.confirmModal.show();
    this.tmp = regulation_id;
    this.tmpName = regulation_name;
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
    console.log("tmp => ", this.tmp);

    this.apiAddData.removeType(this.tmp).subscribe((response) => {});
    this.confirmModal.hide();
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
    this.isSubmitted = true;
    if (this.editForm.invalid) {
      // alert('xxxxx')
      return;
    }
    alert(JSON.stringify(value));
    this.modelRef.hide();
    this.apiAddData.editNews(value).subscribe((response) => {
      console.log("response", response);
    });
    setTimeout(() => {
      this.getNews(this.InfoId);


    }, 1000);

  }



  get g() {
    return this.editForm.controls;
  }

}
