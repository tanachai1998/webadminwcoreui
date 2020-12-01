// import { Component, OnInit, ViewChild } from "@angular/core";
// import { TableData, DataTableService } from "./datatable.service";
// import { FeedDataService } from "../../../services/feed-data.service";
// import { SectorListService } from "../../../services/sector-list.service";

// import { ModalDirective } from "ngx-bootstrap/modal";

// @Component({
//   templateUrl: "datatable.component.html",
//   providers: [DataTableService, FeedDataService],
// })
// export class DataTableComponent implements OnInit {
//   @ViewChild("topicModal") public topicModal: ModalDirective;
//   @ViewChild("subTopicModal") public subTopicModal: ModalDirective;
//   @ViewChild("dataModal") public dataModal: ModalDirective;

//   error: any;
//   public data: TableData;
//   public filterQuery = "";
//   userID;
//   InfoId: any;
//   Info: any;
//   regulationType: any;
//   isExtend: boolean = false;
//   isExtend2: boolean = false;
//   swap: boolean = false;
//   tmp: boolean = true;

//   constructor(
//     private dataTableService: DataTableService,
//     private apiUserInfo: FeedDataService
//   ) {
//     this.dataTableService.getData().subscribe(
//       (data: TableData) => {
//         setTimeout(() => {
//           this.data = [...data];
//         }, 1000);
//       }, // success path
//       (error) => (this.error = error) // error path
//     );
//   }

//   ngOnInit(): void {
//     this.getLocalStorage();
//     this.getRegulationType();
//   }

//   hideAndSeek(status: number) {
//     console.log("status =>", status);
//     if (status == 0) {
//       this.subTopicModal.show();
//       this.topicModal.hide();
//     } else if (status == 1) {
//       this.dataModal.show();
//       this.subTopicModal.hide();
//     }
//   }

//   addExtensionBtn(state: number) {
//     if (state == 1) {
//       this.isExtend = !this.isExtend;

//     } else if (state == 2) {

//       this.isExtend2 = !this.isExtend2;

//     }
//   }

//   getLocalStorage() {
//     this.InfoId = localStorage.getItem("id");
//     this.userInfo(this.InfoId);
//   }

//   userInfo(value) {
//     // this.InfoSurname = localStorage.getItem('surname');
//     // this.InfoType = localStorage.getItem('type');
//     // alert(JSON.stringify(value));
//     this.apiUserInfo.queryUserInfo(value).subscribe((response) => {
//       this.Info = response;
//       console.log("Info = ", this.Info);
//     });
//   }
//   // getRegulationType() {
//   //   this.apiUserInfo.getRegulationType().subscribe((response) => {
//   //     this.regulationType = response;
//   //     // alert(response);
//   //     console.log("response", response);
//   //     // console.log(value);
//   //     // alert(JSON.stringify(response));
//   //   });
//   // }

//   public toInt(num: string) {
//     return +num;
//   }

//   public sortByWordLength = (a: any) => {
//     return a.name.length;
//   };

//   public getDate(regDate: string) {
//     const date = new Date(regDate);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "2-digit",
//     });
//   }
// }
