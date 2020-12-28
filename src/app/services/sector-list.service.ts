import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SectorListService {

  constructor(private http: HttpClient) { }
  @Inject('BASE_URL') private baseUrl: string;

  getSector() {
    return this.http.get('http://localhost/TOTFinancial/public/api/getSector');
  }
}
