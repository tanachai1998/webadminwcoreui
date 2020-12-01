import { FeedDataService } from './services/feed-data.service'
import { Component } from '@angular/core';


export class GetData {


  userID;
  InfoId: any;
  Info: any;
  regulationType: any;

  constructor(private apiGetData: FeedDataService){

  }

  getLocalStorage() {
    this.InfoId = localStorage.getItem("id");
    this.userInfo(this.InfoId);
  }

  userInfo(value) {
    // this.InfoSurname = localStorage.getItem('surname');
    // this.InfoType = localStorage.getItem('type');
    // alert(JSON.stringify(value));
    this.apiGetData.queryUserInfo(value).subscribe((response) => {
      this.Info = response;
      console.log("Info = ", this.Info);
    });
  }
  getRegulationType() {
    this.apiGetData.getRegulationType().subscribe((response) => {
      this.regulationType = response;
      // alert(response);
      console.log("response", response);
      // console.log(value);
      // alert(JSON.stringify(response));
    });
  }

}
