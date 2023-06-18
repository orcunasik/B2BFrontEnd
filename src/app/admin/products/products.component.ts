import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { ErrorService } from 'src/app/services/error.service';
import { ProductModel } from './models/product-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products : ProductModel[] = [];
  filterText: string = "";
  constructor(
    private productService : ProductService,
    private errorService : ErrorService,
    private toastrService : ToastrService
  ){}

  ngOnInit(): void {
    this.getList();
  }

  getList(){
    this.productService.getList().subscribe((res : any)=>{
      this.products = res.data;
      console.log(this.products);
    },(err) =>{
      this.errorService.errorHandler(err);
    })
  }
  delete(product : ProductModel){
    this.productService.delete(product).subscribe((res:any)=>{
      this.toastrService.info(res.message);
      this.getList();
    },(err)=>{
      this.errorService.errorHandler(err);
    });
  }
}
