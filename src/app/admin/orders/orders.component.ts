import { Component, OnInit } from '@angular/core';
import { OrderModel } from './models/order-model';
import { OrdersService } from './services/order.service';
import { ErrorService } from 'src/app/services/error.service';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/services/helper.service';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders : OrderModel[] = [];
  order : OrderModel = new OrderModel();

  filterText : string = "";
  statusText : string = "Tümü";

  constructor(
    private orderService : OrdersService,
    private errorService : ErrorService,
    private toastrService : ToastrService,
    private helperService : HelperService
  ){}

  ngOnInit(): void {
    this.getList();
  }

  exportExcel(){
    let element = document.getElementById("excelTable");
    let title = "Siparişler";
    this.helperService.exportExcel(element,title);
  }

  getList(){
    this.orderService.getList()
      .pipe(
        catchError(err =>{
          this.errorService.errorHandler(err);
          return throwError(() => err);
        })
      )
      .subscribe((res : any)=>{
        this.orders = res.data;
      });
  }

  update(order : OrderModel, status : string){
    order.status = status;
    this.orderService.update(order)
      .pipe(
        tap((res: any)=>{
          this.toastrService.info(res.message);
          this.getList();
        }),
        catchError(err => {
          this.errorService.errorHandler(err);
          return throwError(() => err);
        })
      )
    .subscribe();
  }

}
