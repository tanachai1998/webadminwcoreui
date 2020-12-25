import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ValidateAdminService {
  password(email: (email: any, password: any) => void, password: any) {
    throw new Error("Method not implemented.");
  }
  email(email: any, password: any) {
    throw new Error("Method not implemented.");
  }
  constructor(private http: HttpClient) {}
  @Inject("BASE_URL") private baseUrl: string;

  validateUser(value) {
    // alert(this.baseUrl);
    const formData = {
      email: value.email,
      password: value.password,
    };
    return this.http.post<any>(
      "http://localhost/TOTFinancial/public/api/validUser",
      formData
    );
  }
  getbyemail(data) {
    const formData = {
      email: data
    };
    // console.log("datadata",data);
    return this.http.post<any>(
      "http://localhost/TOTFinancial/public/api/postemailtoget",
      formData
    );
  }
  getsector(dataa){
    const from ={
      sector: dataa
    };
    // return this.http.post<any>(,);
  }
  // validateUser() {
  //   return this.http.get('http://localhost/TOTFinancial/public/api/validUser');
  // }
}
