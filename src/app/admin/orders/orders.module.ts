import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { OrderPipe } from './pipe/order.pipe';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { OrderDetailsModule } from './order-details/order-details.module';

const routes : Routes = [
  {
    path : '',
    component : OrdersComponent
  }
]

@NgModule({
  declarations: [
    OrdersComponent,
    OrderPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    SweetAlert2Module,
    RouterModule.forChild(routes),
    OrderDetailsModule
  ],
  exports : [
    OrdersComponent,
    OrderDetailsModule
  ]
})
export class OrdersModule { }
