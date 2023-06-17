import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { ErrorService } from 'src/app/services/error.service';
import { ProductModel } from './models/product-model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products : ProductModel[] = [];
  constructor(
    private productService : ProductService,
    private errorService : ErrorService
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

}
