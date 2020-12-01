import { Injectable,Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { map, switchMap  } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  login$: Observable<any>;
  getLogin$: Observable<any>;

  custId$:any;

  constructor(
    private http: HttpClient,
    private af: AngularFirestore,
    private afa: AngularFireAuth
  ) {
    this.getLogin$ = this.af.collection('users').valueChanges();

    // this.custId$ = this.afa.currentUser;
  }
  @Inject('BASE_URL') private baseUrl: string

  addUser(value,uid) {
    // alert(this.baseUrl);
    const formData = {
      name : value.name,
      surname: value.surName,
      email: value.email,
      password: value.password,
      sector_id: value.sector_id,
      uid: uid,

    }
    return this.http.post('http://localhost/TOTFinancial/public/api/addUsers',formData)
  }


  addUsers(first, last, user, username, uid){
    return  this.af.collection<any>('users').add({
         firstName: first,
         lastName: last,
         email: user,
         username: username,
         uid: uid
     })
    }




}
