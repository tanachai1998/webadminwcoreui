import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface UserData {
  name: string;
  email: string;
  regDate: string;
  city: string;
  age: number;
}


export interface TableData extends Array<UserData> {}


@Injectable({
  providedIn: 'root'
})
export class FeedDataService {

  dataUrl = 'assets/data.json';

  constructor(
    private http: HttpClient

  ) { }

  queryUserInfo(userId){
    // alert(userId);
    return this.http.get<any>('http://localhost/TOTFinancial/public/api/getUserInfo/' + userId);
  }

  queryUid(uid){
    return this.http.get<any>('http://localhost/TOTFinancial/public/api/getUserByUid/'+ uid);
  }


  getCategory(sector_id){
    return this.http.get<any>('http://localhost/TOTFinancial/public/api/getCategory/'+ sector_id);

  }
  getRegulationType(category_id,sector_id){
    return this.http.get<any>('http://localhost/TOTFinancial/public/api/getRegulationType/'+ category_id + '/sectorID/' + sector_id);

  }
  getImageData(sectorId){
    return this.http.get<any>('http://localhost/TOTFinancial/public/api/getCategory/'+ sectorId);
  }

  getRegulationInfo(sectorId){

    return this.http.get<any>('http://localhost/TOTFinancial/public/api/getFile/'+ sectorId);

  }

  getYearList(sector_id){
    return this.http.get<any>('http://localhost/TOTFinancial/public/api/getYear/'+ sector_id);
  }


  getNews(sector_id){
    return this.http.get<any>('http://localhost/TOTFinancial/public/api/getNews/'+ sector_id);
  }

  getNewInfo(news_id){
    return this.http.get<any>('http://localhost/TOTFinancial/public/api/getNewsInfo/'+ news_id);
  }

  getFile(regulation_type){
    return this.http.get<any>('http://localhost/TOTFinancial/public/api/getFile/'+ regulation_type );

  }

  getFiles(regulation_file_id){
    return this.http.get<any>('http://localhost/TOTFinancial/public/api/getFiles/'+ regulation_file_id );

  }

  getStructureImage(sector_id){
    console.log('sector_id->',sector_id);
    return this.http.get<any[]>('http://localhost/TOTFinancial/public/api/getStructureImage/'+ sector_id );
  }

  getSectorImage(sector_id){
    console.log('sector_id->',sector_id);
    return this.http.get<any[]>('http://localhost/TOTFinancial/public/api/getSectorImage/'+ sector_id );
  }



  getData() {
    return this.http.get<TableData>(this.dataUrl)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}
