import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { ErrorService } from 'src/app/services/error.service';
import { ProductModel } from './models/product-model';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { HelperService } from 'src/app/services/helper.service';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products : ProductModel[] = [];
  product : ProductModel = new ProductModel();
  filterText: string = "";
  constructor(
    private productService : ProductService,
    private errorService : ErrorService,
    private toastrService : ToastrService,
    private helperService : HelperService
  ){}

  ngOnInit(): void {
    this.getList();
  }

  exportExcel(){
    let element = document.getElementById("excelTable");
    let title = "Ürünler";
    this.helperService.exportExcel(element,title);
  }

  getList(){
    this.productService.getList()
      .pipe(
        catchError(err =>{
          this.errorService.errorHandler(err);
          return throwError(() => err);
        })
      )
      .subscribe((res : any)=>{
        this.products = res.data;
      });
  }

  delete(product : ProductModel){
    this.productService.delete(product)
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
    let product : ProductModel = new ProductModel();
    product.name = addForm.value.productName;
    product.id = 0;
    this.productService.add(product)
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

  getProduct(product:ProductModel){
    this.productService.getById(product.id)
      .pipe(
        catchError(err =>{
          this.errorService.errorHandler(err);
          return throwError(() =>err);
        })
      )
      .subscribe((res:any)=>{
        this.product = res.data;
      });
  }

  update(){
    this.productService.update(this.product)
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
}
