import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { PriceListDetailModel } from '../models/price-list-detail-model';

@Injectable({
  providedIn: 'root'
})
export class PriceListDetailService {

  constructor(
    @Inject("apiUrl") private apiUrl : string,
    private httpClient : HttpClient
  ) { }

  getList(priceListId : number){
    let api = this.apiUrl + "PriceListDetails/GetListDto/" + priceListId;
    return this.httpClient.get(api);
  }

  getById(id:number){
    let api = this.apiUrl + "PriceListDetails/GetById/" + id;
    return this.httpClient.get(api);
  }

  delete(priceListDetail:PriceListDetailModel){
    let api = this.apiUrl + "PriceListDetails/Delete";
    return this.httpClient.delete(api,{body:priceListDetail});
  }

  add(priceListDetail:PriceListDetailModel){
    let api = this.apiUrl + "PriceListDetails/Add";
    return this.httpClient.post(api,priceListDetail);
  }

  update(priceListDetail:PriceListDetailModel){
    let api = this.apiUrl + "PriceListDetails/Update";
    return this.httpClient.put(api,priceListDetail);
  }
}
