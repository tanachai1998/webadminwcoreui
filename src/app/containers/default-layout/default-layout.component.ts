import { Component } from "@angular/core";
import { navItems } from "../../_nav";
import { FeedDataService } from "../../services/feed-data.service";
import { Subscription } from "rxjs";
import { MessageService } from "../../services/message.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: "app-dashboard",
  templateUrl: "./default-layout.component.html",
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems;
  sector: Info;
  userID: any;
  noti: number;
  message: any;
  subscription: Subscription;
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  constructor(
    private apiData: FeedDataService,
    private messageService: MessageService,
    public afAuth: AngularFireAuth,
    private _AuthService:AuthService,
  ) {
    // this.userID = localStorage.getItem("id");

    // console.log("message");
    // this.afAuth.authState.subscribe((result) => {
    //   console.log(result);
    //   this.subscription = this.messageService

    //     .getMessage()
    //     .subscribe((message) => {
    //       // alert(JSON.stringify(message));
    //       if (message) {
            this.apiData.queryUserInfo(4).subscribe((response) => {
              this.sector = response;
              console.log(JSON.stringify(response));
              // alert(JSON.stringify(response));
              console.log("sector", this.sector);

              this.navItems = navItems.map((result) => {
                if (result.name == "test") {
                  return { ...result, name: this.sector.sector.fullName };
                } else {
                  return { ...result };
                }
              });
            });
        //   } else {
        //     this.navItems = navItems;
        //     // clear messages when empty message received
        //     // this.message = [];
        //   }
        // });
    // });

    console.log("user ID", this.userID);

    // });
    // async
    //   this.sector = await this.apiData.queryUserInfo(1).toPromise();

    // this.navItems = navItems.map((result) => {
    //     if (result.name == "test") {
    //       return { ...result, name: this.sector.sector.fullName};
    //     } else {
    //       return { ...result };
    //     }
    //   });

    // this.navItems = navItems.map((result) => {
    //   if (result.name == "test") {
    //     return { ...result, name: this.sector.sector.fullName};
    //   } else {
    //     return { ...result };
    //   }
    // });
    this.noti = 3;
  }
  logOut(){
    this._AuthService.SignOut();
  }

}


interface Info {
  id: number;
  name: string;
  surName: string;
  email: string;
  password: string;
  sector_id: number;
  created_at: string;
  updated_at: string;
  sector: Sector;
}

interface Sector {
  id: number;
  type: string;
  fullName: string;
  created_at: string;
  updated_at: string;
}
