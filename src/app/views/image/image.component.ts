import { Component, OnInit,ViewChild } from '@angular/core';
import { FeedDataService } from "../../services/feed-data.service";
import { ModalDirective } from "ngx-bootstrap/modal";
import { AddDataService } from "../../services/add-data.service";
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
  NgForm,
} from "@angular/forms";


@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  @ViewChild("editModal") public editModal: ModalDirective;
  @ViewChild("viewImageModal") public viewImageModal: ModalDirective;


  addDataForm: FormGroup;
  InfoId: any;
  Info:any;
  sectorID: any;
  sectorInfo: any;
  imageInfo:any;
  isSubmitted:any;
  status: Object;
  state: any;
  loading = false;
  sectorImg: any[]=[];



  constructor( private apiGetData: FeedDataService,
    private fb: FormBuilder,
    private apiImageData: AddDataService,
  ) { }

  ngOnInit(): void {
    this.getLocalStorage();
  }

  getLocalStorage() {
    // this.InfoId = localStorage.getItem("sectorId");
    // this.InfoId1 = localStorage.getItem("id");
    // this.userInfo(this.InfoId1);
    this.InfoId = 1;
    this.getImage(this.InfoId);
  }

  userInfo(value) {
    // this.InfoSurname = localStorage.getItem('surname');
    // this.InfoType = localStorage.getItem('type');
    // alert(JSON.stringify(value));
    this.apiGetData.queryUserInfo(value).subscribe((response) => {
      this.Info = response;
      this.sectorInfo = response.sector.fullName;
      this.sectorID = response.sector.id;

      console.log("Info = ", this.Info);
      console.log("Info = ", this.sectorInfo);
      console.log("Sector = ", this.sectorID);
    });
  }
  getImage(value) {
    this.apiGetData.getSectorImage(value).subscribe((response) => {
      console.log('res=>',response);
      this.sectorImg = response.map((result) => {
        return { ...result, imageFile: `http://localhost/TOTFinancial/public/img/${result.imageFile}` };
      });

      this.loading = true;
      // alert(response);
      // console.log("Category", response);
      console.log("Structure image", this.sectorImg);
      // console.log("News topic", response.type);
      // localStorage.setItem("sectorImg_id", JSON.stringify(this.sectorImg.id));
      // this.category_id = this.category.id;
    // console.log('category id=>',this.category.id)

      // console.log(value);
      // alert(JSON.stringify(response));
    });
  }

  addForm() {
    // alert("test")
    this.addDataForm = this.fb.group({
      topic: new FormControl("", [Validators.required]),
      detail: new FormControl("", [Validators.required]),
      // fileName: new FormControl (''),
      sector_id: new FormControl(this.InfoId),
    });

    // console.log('value');
  }
  addData(value) {
    alert(JSON.stringify(value));
    this.addDataForm.reset();
    this.apiImageData.addNews(value).subscribe((response) => {
      console.log('response',response);
      // console.log(value);

      // return response;
      // this.status = response;
      // this.state = this.status.success;
      // console.log("status = ", this.status.success);
      // if (this.state == true) {
      //   console.log("SSstatus = ", this.state);

      //   this.topicModal.hide();
      //   this.getNews(this.InfoId);
      // }
      // alert(JSON.stringify(this.user.message));
    });
    // this.onRoute();
  }

  get f() {
    return this.addDataForm.controls;
  }
  onSubmit() {
    this.isSubmitted = true;

    // stop here if form is invalid
    if (this.addDataForm.invalid) {
      // alert('xxxxx')
      return;
    } else if (this.addDataForm.valid) {
      // alert('yyyyyyy')
      // alert(
      //   "SUCCESS!! :-)\n\n" + JSON.stringify(this.addUserForm.value, null, 4)
      // );
      this.addData(this.addDataForm.value);
      // this.onRoute();
    }
    // display form values on success
  }

  getImageInfo(value){
    this.viewImageModal.show();
  }



}
