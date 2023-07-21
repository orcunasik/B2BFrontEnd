import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceListsComponent } from './price-lists.component';
import { RouterModule, Routes } from '@angular/router';
import { PriceListsPipe } from './pipe/price-lists.pipe';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

const routes : Routes=[
  {
    path:'',
    component: PriceListsComponent
  }
]

@NgModule({
  declarations: [
    PriceListsComponent,
    PriceListsPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    SweetAlert2Module
  ],
  exports:[
    PriceListsComponent
  ]
})
export class PriceListsModule { }
