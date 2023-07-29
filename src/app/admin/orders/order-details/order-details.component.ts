import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDetailService } from './services/order-detail.service';
import { OrderDetailModel } from './models/order-detail-model';
import { ErrorService } from 'src/app/services/error.service';
import { OrdersService } from '../services/order.service';
import { OrderModel } from '../models/order-model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  orderDetails : OrderDetailModel[] = [];
  order : OrderModel = new OrderModel();

  orderId : number = 0;
  constructor(
    private activatedRoute : ActivatedRoute,
    private orderDetailService : OrderDetailService,
    private errorService : ErrorService,
    private orderService : OrdersService
  ){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res:any)=>{
      this.orderId = res.id;
      this.getList();
      this.getOrder();
    });
  }

  getOrder(){
    this.orderService.getById(this.orderId).subscribe((res:any)=>{
      this.order = res.data;
    },(err)=>{
      this.errorService.errorHandler(err);
    });
  }
  getList(){
    this.orderDetailService.getList(this.orderId).subscribe((res:any)=>{
      this.orderDetails = res.data;
    },(err)=>{
      this.errorService.errorHandler(err);
    });
  }
}

