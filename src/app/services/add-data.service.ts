import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AddDataService {
  constructor(private http: HttpClient) {}

  addCategory(value,sector_id) {
    const formData = {
      type: value.category,
      sector_id: sector_id,
    };
    return this.http.post(
      "http://localhost/TOTFinancial/public/api/addCategory",
      formData
    );
  }
  addRegulation(value,category_id,sector_id) {
    const formData = {
      type: value.type,
      sector_id: sector_id,
      category_id: category_id,
      year_id: value.year,
    };
    console.log('fomrData =>',formData)
    return this.http.post(
      "http://localhost/TOTFinancial/public/api/addRegulation",
      formData
    );
  }

  addYear(value,sector_id) {
    const formData = {
      year: value.year,
      sector_id: sector_id,
    };
    console.log('sector_id in service', sector_id);
    return this.http.post<any>(
      "http://localhost/TOTFinancial/public/api/addYear",
      formData
    );
  }

  checkYear(value,sector_id) {

    const formData = {
      year: value,
      sector_id: sector_id,
    };
    console.log('fomr',formData)
    return this.http.post<any>(
      "http://localhost/TOTFinancial/public/api/checkYear",
      formData
    );
  }

  checkCategory(value,sector_id){

    const formData = {
      type: value,
      sector_id: sector_id,
    };
    console.log('fomr',formData)

    return this.http.post<any>(
      "http://localhost/TOTFinancial/public/api/checkCategory",
      formData
    );
  }

  checkRegulation(value,year_id,category_id,sector_id){
    console.log('con Val',value)
    const formData = {
      type: value,
      year_id: year_id,
      category_id: category_id,
      sector_id: sector_id,
    };
    console.log('form Dataa=>>.',formData);
    return this.http.post<any>(
      "http://localhost/TOTFinancial/public/api/checkRegulation",
      formData
    );

  }


  addInfo(value,regulation_id) {
    const formData = {
      topic: value.topic,

      subTopic: value.detail,
      regulation_id: regulation_id

    };
    return this.http.post(
      "http://localhost/TOTFinancial/public/api/addFile",
      formData
    );
  }

  addNews(value, files: File){
   //alert(files);
    // const formData = {
    //   sector_id: value.sector_id,
    //   topic: value.topic,
    //   detail: value.detail,
    //   image: files[0],
    //   homeStatus: value.homeStatus
    // }
  
    const formData = new FormData();
    formData.append('sector_id',value.sector_id);
    formData.append('topic',value.topic);
    formData.append('detail',value.detail);
    formData.append("image", files[0]);

    return this.http.post( "http://localhost/TOTFinancial/public/api/addNews",formData);
  }

  editNews(value){
    const formData = {
      id: value.id,
      topic: value.topic,
      detail: value.detail,
      
      

    };
    console.log("editnews",formData)
    return this.http.post( "http://localhost/TOTFinancial/public/api/editNews",formData);

  }



  addFiles(value){
    alert(JSON.stringify(value.get('topic')));
    return this.http.post(
      "http://localhost/TOTFinancial/public/api/uploadFile",
      value
    );
  }

  addStructureimg(value,files: File){
    alert("222222")
    const formData = new FormData();
    formData.append('sector_id',value.sector_id);
    formData.append("imageFile", files[0]);

    console.log("addStructureimg",formData)

    return this.http.post("http://localhost/TOTFinancial/public/api/addStructureimg",formData);
  }

  editYear(value){
      const formData = {
        id : value.id,
        year: value.year,
        sector_id: value.sector_id
      }

      console.log('form',formData);
    return this.http.post<any>('http://localhost/TOTFinancial/public/api/editYear' , formData );
  }

editCategory(value){
  const formData = {
    id: value.id,
    type: value.category,
    sector_id: value.sector_id


  }
  console.log('Edit category val',formData);

  return this.http.post<any>('http://localhost/TOTFinancial/public/api/editCategory' , formData );

}
editRegulation(value){
  const formData = {
    id: value.id,
    type: value.type,
    year_id: value.year,
    sector_id: value.sector_id,
    category_regulation_id: value.category_id,
  }
  console.log('Edit regulation val',formData);

  return this.http.post<any>('http://localhost/TOTFinancial/public/api/editRegulation' , formData );
}

editFile(value){
  alert(JSON.stringify(value.get('topic')));
  alert(JSON.stringify(value.get('file_id')));




    return this.http.post<any>('http://localhost/TOTFinancial/public/api/editFile' , value);


}




  removeImage(id){
    return this.http.get<any>('http://localhost/TOTFinancial/public/api/removeImage/'+ id);
  }

  removeCategory(category_id){
    return this.http.get<any>('http://localhost/TOTFinancial/public/api/removeCategory/'+ category_id);
  }

  removeType(regulation_id){
    return this.http.get<any>('http://localhost/TOTFinancial/public/api/removeType/'+ regulation_id);
  }


  removeYear(year_id){
    return this.http.get<any>('http://localhost/TOTFinancial/public/api/removeYear/'+ year_id);

  }

  removeFile(file_id){
    return this.http.get<any>('http://localhost/TOTFinancial/public/api/removeFile/'+ file_id);
  }
  removeFiles(file_id){
    return this.http.get<any>('http://localhost/TOTFinancial/public/api/removeFiles/'+ file_id);
  }

  removeNews(news_id){
    return this.http.get<any>('http://localhost/TOTFinancial/public/api/removeNews/'+ news_id);
  }

  removeStructureImage(id){
    alert(id)
    return this.http.get<any>('http://localhost/TOTFinancial/public/api/removeStructureImage/'+ id);
  }

}
