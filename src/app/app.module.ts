import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { ModalModule } from "ngx-bootstrap/modal";
import {NgSelectModule} from '@ng-select/ng-select';



import {HttpClientModule} from '@angular/common/http'

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { RegisterService } from './services/register.service';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';


import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage'
import {AngularFireDatabaseModule} from '@angular/fire/database'


const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { ImageComponent } from './views/image/image.component';
import { LogoutComponent } from './views/logout/logout.component';
import { ForgetPasswordComponent } from './views/forget-password/forget-password.component';

const connect = {
    apiKey: "AIzaSyBO-rNMppAQZVXBttX_mdc46zY9IyOC5lY",
    authDomain: "financialtot.firebaseapp.com",
    databaseURL: "https://financialtot.firebaseio.com",
    projectId: "financialtot",
    storageBucket: "financialtot.appspot.com",
    messagingSenderId: "776952845665",
    appId: "1:776952845665:web:bc6eee1d2bbc485a666120",
    measurementId: "G-ZJZR7P8L46"
}



@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    AngularFireModule.initializeApp(connect),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule


  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    ForgetPasswordComponent,
  ],
  providers: [{

    provide: LocationStrategy,
    useClass: HashLocationStrategy,

  },
  {
  provide: FirestoreSettingsToken, useValue:{}

  }
],


  bootstrap: [ AppComponent ]
})
export class AppModule { }
