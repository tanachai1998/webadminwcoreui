import { Component, OnInit, ViewChild } from "@angular/core";
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
  // selector: 'app-structure-image',
  templateUrl: './structure-image.component.html',
  styleUrls: ['./structure-image.component.css']
})
export class StructureImageComponent implements OnInit {
  // @ViewChild('topicModal') public topicModal: ModalDirective;
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
  structureImg: any[]=[];
  constructor(
    private apiGetData: FeedDataService,
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
    this.apiGetData.getStructureImage(value).subscribe((response) => {
      console.log('res=>',response);
      this.structureImg = response.map((result) => {
        return { ...result, imageFile: `http://localhost/TOTFinancial/public/img/${result.imageFile}` };
      });

      this.loading = true;
      // alert(response);
      // console.log("Category", response);
      console.log("Structure image", this.structureImg);
      // console.log("News topic", response.type);
      // localStorage.setItem("structureImg_id", JSON.stringify(this.structureImg.id));
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


  // toNewInfo(news_id) {
  //   // alert("xxx");

  //   this.apiGetData.getNewInfo(news_id).subscribe((response) =>{
  //     this.newsInfo = response;
  //     console.log('newsInfo =>' , this.newsInfo.image);
  //     this.detailModal.show();

  //   });
  //   console.log('news id=>',news_id)
  //   // this.router.navigate(["news/new-info",news_id]);
  // }

  // getNewsInfo(value){
  //   this.apiGetData.getNewInfo(value).subscribe((response) =>{
  //     this.newsInfo = response;
  //     console.log('newsInfo =>' , this.newsInfo.image);
  //     this.viewImageModal.show();

  //   });
  // }

  // onSelectFile(event){
  //   this.files = event.target.files;

  // }



  // upload(){

  //   this.isSubmitted = true;

  //   // stop here if form is invalid
  //   if (this.addDataForm.invalid) {
  //     // alert('xxxxx')
  //     return;
  //   } else if (this.addDataForm.valid) {

  //   const formData = new FormData();
  //   for (var i = 0; i < this.files.length; i++) {
  //     formData.append(`filename[${i}]`, this.files[i]);
  //   }
  //   console.log("this.files", this.files);

  //   formData.append("sector_id", this.addDataForm.value.sector_id);
  //   formData.append("topic", this.addDataForm.value.topic);
  //   formData.append("detail", this.addDataForm.value.detail);
  //   this.apiImageData.addNews(formData).subscribe((result) => {
  //     console.log(result);
  //   });
  // }
  // }

  // confirm(regulation_id, regulation_name) {
  //   this.confirmModal.show();
  //   this.tmp = regulation_id;
  //   this.tmpName = regulation_name;
  // }




  // onCheckChange(value){
  //   this.onChangeStatus = value.id;
  //   console.log('value.id =>',value.id);
  //   this.homeStatusForm();
  // }
  // homeStatusForm(){
  //   this.addHomeStatus = this.fb.group({
  //     homeStatus: new FormControl("", this.onChangeStatus),

  //   });
  // }

  // changeHomeStatus(){
  //   alert('home status')
  //   const formData = new FormData();

  //   formData.append("homeStatus", this.addHomeStatus.value.homeStatus);
  //   console.log('fomr data=>',formData);
  // }


  // onUpdate() {}
  // onDelete() {
  //   console.log("tmp => ", this.tmp);

  //   this.apiImageData.removeType(this.tmp).subscribe((response) => {});
  //   this.confirmModal.hide();
  //   // alert('xx')
  //   // this.getNews(this.category_id, this.InfoId);
  // }

//   angular.module('ng').filter('cut', function () {
//     return function (value, wordwise, max, tail) {
//         if (!value) return '';

//         max = parseInt(max, 10);
//         if (!max) return value;
//         if (value.length <= max) return value;

//         value = value.substr(0, max);
//         if (wordwise) {
//             var lastspace = value.lastIndexOf(' ');
//             if (lastspace !== -1) {
//               //Also remove . and , so its gives a cleaner result.
//               if (value.charAt(lastspace-1) === '.' || value.charAt(lastspace-1) === ',') {
//                 lastspace = lastspace - 1;
//               }
//               value = value.substr(0, lastspace);
//             }
//         }

//         return value + (tail || ' …');
//     };
// });



}
