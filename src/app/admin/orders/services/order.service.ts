import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OrderModel } from '../models/order-model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    @Inject("apiUrl") private apiUrl : string,
    private httpClient : HttpClient
  ) { }

  getList(){
    let api = this.apiUrl + "Orders/GetListDto";
    return this.httpClient.get(api);
  }
  
  getById(id:number){
    let api = this.apiUrl + "Orders/GetByIdDto/" + id;
    return this.httpClient.get(api);
  }

  update(order : OrderModel){
    let api = this.apiUrl + "Orders/Update";
    return this.httpClient.put(api,order);
  }
}
