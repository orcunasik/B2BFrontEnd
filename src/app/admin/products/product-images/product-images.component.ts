import { Component, OnInit } from '@angular/core';
import { ProductImagesService } from './services/product-images.service';
import { ActivatedRoute } from '@angular/router';
import { ProductImageModel } from './models/product-images-model';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.scss']
})
export class ProductImagesComponent implements OnInit {

  fileImages :any[] =[]; 
  productImages : ProductImageModel[] = [];
  productId:number = 0;
  constructor(
    private productImageService: ProductImagesService,
    private activateRoute : ActivatedRoute,
    private errorService : ErrorService
  ){}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((res:any)=>{
      this.productId = res.id;
      this.getList();
    });
  }

  getList(){
    this.productImageService.getList(this.productId).subscribe((res:any)=>{
      this.productImages = res.data;
    },(err)=>{
      this.errorService.errorHandler(err);
    })
  }

  uploadImages(){
    let formData = new FormData();
    formData.append("productId",this.productId.toString());
    for (let i = 0; i < this.fileImages.length; i++) {
      formData.append("images",this.fileImages[i],this.fileImages[i].fileName);
    }
    this.productImageService.add(formData).subscribe((res:any)=>{
      this.getList();
    },(err)=>{
      this.errorService.errorHandler(err);
    })
  }

  deleteImage(productImage : ProductImageModel){
    this.productImageService.delete(productImage).subscribe((res:any)=>{
      this.getList();
    },(err)=>{
      this.errorService.errorHandler(err);
    })
  }

  getImages(event : any){
    this.fileImages = event.target.files;
  }

  setMainImage(id:number){
    this.productImageService.setMainImage(id).subscribe((res:any)=>{
      this.getList();
    },(err)=>{
      this.errorService.errorHandler(err);
    })
  }

}
