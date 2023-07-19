import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ProductImageModel } from '../models/product-images-model';

@Injectable({
  providedIn: 'root'
})
export class ProductImagesService {

  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private httpClient : HttpClient
  ) { }

  add(formData : any){
    let api = this.apiUrl + "ProductImages/add/";
    return this.httpClient.post(api,formData);
  }

  delete(productImage : ProductImageModel){
    let api = this.apiUrl + "ProductImages/delete/";
    return this.httpClient.delete(api,{body:productImage});
  }

  getList(productId:number){
    let api = this.apiUrl + "ProductImages/GetListByProductId/" + productId;
    return this.httpClient.get(api);
  }

  setMainImage(id:number){
    let api = this.apiUrl + "ProductImages/SetMainImage/" + id;
    return this.httpClient.get(api);
  }
}
