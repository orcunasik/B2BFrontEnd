import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { LayoutsModule } from './layouts/layouts.module';
import { LoginModule } from './login/login.module';
import { ProductsModule } from './products/products.module';
import { PriceListsModule } from './price-lists/price-lists.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { ProfileModule } from './profile/profile.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule,
    LayoutsModule,
    LoginModule,
    ProductsModule,
    CustomersModule,
    OrdersModule,
    ProfileModule
  ],
  exports:[
    HomeModule,
    LayoutsModule,
    LoginModule,
    ProductsModule,
    PriceListsModule,
    CustomersModule,
    OrdersModule,
    ProfileModule
  ]
})
export class AdminModule { }
