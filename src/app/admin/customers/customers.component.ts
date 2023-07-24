import { Component } from '@angular/core';
import { CustomerModel } from './models/customer-model';
import { CustomersService } from './services/customers.service';
import { ErrorService } from 'src/app/services/error.service';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/services/helper.service';
import { catchError, tap, throwError } from 'rxjs';
import { NgForm } from '@angular/forms';
import { PriceListService } from '../price-lists/services/price-list.service';
import { PriceListModel } from '../price-lists/models/price-list-model';
import { CustomerRelationshipModel } from './models/customer-relationship-model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {

  customers : CustomerModel[] = [];
  priceLists : PriceListModel[] = [];
  customer : CustomerModel = new CustomerModel();

  filterText : string = "";

  constructor(
    private customerService : CustomersService,
    private errorService : ErrorService,
    private toastrService : ToastrService,
    private helperService : HelperService,
    private priceListService : PriceListService
  ){}

  ngOnInit(): void {
    this.getList();
    this.getPriceList();
  }

  exportExcel(){
    let element = document.getElementById("excelTable");
    let title = "Müşteri Listesi";
    this.helperService.exportExcel(element,title);
  }

  getList(){
    this.customerService.getList()
      .pipe(
        catchError(err =>{
          this.errorService.errorHandler(err);
          return throwError(() => err);
        })
      )
      .subscribe((res : any)=>{
        this.customers = res.data;
      });
  }

  getPriceList(){
    this.priceListService.getList()
      .pipe(
        catchError(err =>{
          this.errorService.errorHandler(err);
          return throwError(() => err);
        })
      )
      .subscribe((res : any)=>{
        this.priceLists = res.data;
      });
  }

  delete(customer : CustomerModel){
    this.customerService.delete(customer)
      .pipe(
        tap((res : any)=>{
          this.toastrService.info(res.message);
          this.getList();
        }),
        catchError(err =>{
          this.errorService.errorHandler(err);
          return throwError(() => err);
        })
      )
    .subscribe();
  }

  add(addForm : NgForm){
    let customerModel : CustomerModel = new CustomerModel();
    customerModel.name = addForm.value.name;
    customerModel.email = addForm.value.email;
    customerModel.password = addForm.value.password;

    this.customerService.add(customerModel)
      .pipe(
        tap((res :any) =>{
          this.toastrService.success(res.message);
          this.getList();
          addForm.reset();
          document.getElementById("addModelCloseBtn").click();
        }),
        catchError(err => {
          this.errorService.errorHandler(err);
          return throwError(() => err);
        })
      )
      .subscribe();
  }

  getCustomer(customer:CustomerModel){
    this.customerService.getDtoById(customer.id)
      .pipe(
        catchError(err =>{
          this.errorService.errorHandler(err);
          return throwError(() =>err);
        })
      )
      .subscribe((res:any)=>{
        this.customer = res.data;
      });
  }

  update(){
    this.customerService.update(this.customer)
      .pipe(
        tap((res: any)=>{
          this.toastrService.success(res.message);
          this.getList();
          document.getElementById("updateModelCloseBtn").click();
        }),
        catchError(err => {
          this.errorService.errorHandler(err);
          return throwError(() => err);
        })
      )
    .subscribe();
  }

  updateRelationship(){
    let customerRelationshipModel = new CustomerRelationshipModel();
    customerRelationshipModel.customerId = this.customer.id;
    customerRelationshipModel.priceListId = this.customer.priceListId;
    customerRelationshipModel.discount = this.customer.discount;
    this.customerService.updateRelationship(customerRelationshipModel)
      .pipe(
        tap((res: any)=>{
          this.toastrService.info(res.message);
          this.getList();
          document.getElementById("updateRelationshipModelCloseBtn").click();
        }),
        catchError(err => {
          this.errorService.errorHandler(err);
          return throwError(() => err);
        })
      )
    .subscribe();
  }

  changePassword(password : any){
    let customer = new CustomerModel();
    customer.id = this.customer.id;
    customer.password = password.value;
    this.customerService.changePasswordByAdminPanel(customer)
      .pipe(
        tap((res: any)=>{
          this.toastrService.info(res.message);
          this.getList();
          document.getElementById("updatePasswordModelCloseBtn").click();
        }),
        catchError(err => {
          this.errorService.errorHandler(err);
          return throwError(() => err);
        })
      )
    .subscribe();
  }
}
