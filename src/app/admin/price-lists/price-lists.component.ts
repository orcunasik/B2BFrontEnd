import { Component, OnInit } from '@angular/core';
import { PriceListModel } from './models/price-list-model';
import { PriceListService } from './services/price-list.service';
import { ErrorService } from 'src/app/services/error.service';
import { HelperService } from 'src/app/services/helper.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-price-lists',
  templateUrl: './price-lists.component.html',
  styleUrls: ['./price-lists.component.scss']
})
export class PriceListsComponent implements OnInit {

  priceLists : PriceListModel[] = [];
  priceList : PriceListModel = new PriceListModel();

  filterText : string = "";

  constructor(
    private priceListService : PriceListService,
    private errorService : ErrorService,
    private toastrService : ToastrService,
    private helperService : HelperService
  ){}

  ngOnInit(): void {
    this.getList();
  }

  exportExcel(){
    let element = document.getElementById("excelTable");
    let title = "Fiyat Listesi";
    this.helperService.exportExcel(element,title);
  }

  getList(){
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

  delete(priceList : PriceListModel){
    this.priceListService.delete(priceList)
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
    let priceList : PriceListModel = new PriceListModel();
    priceList.name = addForm.value.priceListName;
    priceList.id = 0;
    this.priceListService.add(priceList)
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

  getPriceList(priceList:PriceListModel){
    this.priceListService.getById(priceList.id)
      .pipe(
        catchError(err =>{
          this.errorService.errorHandler(err);
          return throwError(() =>err);
        })
      )
      .subscribe((res:any)=>{
        this.priceList = res.data;
      });
  }

  update(){
    this.priceListService.update(this.priceList)
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
