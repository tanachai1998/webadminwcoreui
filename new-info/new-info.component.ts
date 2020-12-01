// import { Component, OnInit, ViewChild } from "@angular/core";
// import { ModalDirective } from "ngx-bootstrap/modal";

// import {
//   FormBuilder,
//   FormControl,
//   Validators,
//   FormGroup,
// } from "@angular/forms";

// import {AddDataService} from '../../../services/add-data.service';
// import {FeedDataService} from '../../../services/feed-data.service';
// import { ActivatedRoute } from '@angular/router';


// @Component({
//   selector: "app-new-info",
//   templateUrl: "./new-info.component.html",
//   styleUrls: ["./new-info.component.css"],
// })
// export class NewInfoComponent implements OnInit {

//   @ViewChild('topicModal') public topicModal:ModalDirective;
//   @ViewChild('editModal') public editModal:ModalDirective;

//   InfoId: any;
//   newInfo: any;
//   sectorInfo: any;
//   news_id: any;
//   constructor(
//     private apiGetData: FeedDataService,
//     private apiEditData: AddDataService,
//     private fb:FormBuilder,
//     private route: ActivatedRoute
//   ) {}

//   ngOnInit(): void {
//     this.getLocalStorage();
//   }

//   getLocalStorage(){
//     this.InfoId = localStorage.getItem("sectorId");

//     this.route.params.subscribe(params=>{
//       this.news_id = params['news_id']
//     })
//     console.log('type category id =>',this.news_id);

//     // this.InfoId1 = localStorage.getItem("id");
//     // this.userInfo(this.InfoId1);
//     this.getNews(this.InfoId,this.news_id);
//   }

//   getNews(value,newsId){
//     this.apiGetData.getNew(value,newsId).subscribe(response=>{

//       this.newInfo = response;
//       this.sectorInfo = response.sector.fullName;

//       console.log('New Info =>',this.newInfo);
//       console.log('Sector Info =>',this.sectorInfo);


//     });
//   }

// }
