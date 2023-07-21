import { Component } from '@angular/core';
import { PriceListDetailModel } from './models/price-list-detail-model';
import { PriceListDetailService } from './services/price-list-detail.service';
import { ErrorService } from 'src/app/services/error.service';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/services/helper.service';
import { catchError, tap, throwError } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../products/services/product.service';
import { ProductModel } from '../../products/models/product-model';


@Component({
  selector: 'app-price-list-detail',
  templateUrl: './price-list-detail.component.html',
  styleUrls: ['./price-list-detail.component.scss']
})
export class PriceListDetailComponent {

  products : ProductModel[] = [];
  priceListDetails : PriceListDetailModel[] = [];
  priceListDetail : PriceListDetailModel = new PriceListDetailModel();

  filterText : string = "";
  priceListId : number = 0;
  constructor(
    private priceListDetailService : PriceListDetailService,
    private errorService : ErrorService,
    private toastrService : ToastrService,
    private helperService : HelperService,
    private activatedRoute : ActivatedRoute,
    private productService : ProductService
  ){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res :any) =>{
      this.priceListId = res.id;
      this.getList();
      this.getProductList();
    })
  }

  exportExcel(){
    let element = document.getElementById("excelTable");
    let title = "Fiyat Listesi Detayı";
    this.helperService.exportExcel(element,title);
  }

  getList(){
    this.priceListDetailService.getList(this.priceListId)
      .pipe(
        catchError(err =>{
          this.errorService.errorHandler(err);
          return throwError(() => err);
        })
      )
      .subscribe((res : any)=>{
        this.priceListDetails = res.data;
      });
  }

  getProductList(){
    this.productService.getList().subscribe((res: any)=>{
      this.products = res.data;
    },(err)=>{
      this.errorService.errorHandler(err);
    })
  }

  delete(priceListDetail : PriceListDetailModel){
    this.priceListDetailService.delete(priceListDetail)
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
    let priceListDetail : PriceListDetailModel = new PriceListDetailModel();
    priceListDetail.productId = addForm.value.productId;
    priceListDetail.price= addForm.value.price;
    priceListDetail.priceListId = this.priceListId;
    priceListDetail.id = 0;
    this.priceListDetailService.add(priceListDetail)
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

  // getPriceListDetail(priceListDetail:PriceListDetailModel){
  //   this.priceListDetailService.getById(priceListDetail.id)
  //     .pipe(
  //       catchError(err =>{
  //         this.errorService.errorHandler(err);
  //         return throwError(() =>err);
  //       })
  //     )
  //     .subscribe((res:any)=>{
  //       this.priceListDetail = res.data;
  //     });
  // }

  update(priceListDetail : PriceListDetailModel){
    this.priceListDetailService.update(priceListDetail)
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
