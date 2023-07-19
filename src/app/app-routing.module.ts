import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './admin/layouts/layouts.component';
import { HomeComponent } from './admin/home/home.component';
import { LoginComponent } from './admin/login/login.component';
import { AuthGuard } from './admin/login/guard/auth.guard';
import { ProductsComponent } from './admin/products/products.component';
import { ProductImagesComponent } from './admin/products/product-images/product-images.component';

const routes: Routes = [
  {
    path:'admin-login',
    component:LoginComponent,
    loadChildren: () => import('./admin/login/login.module')
    .then(m => m.LoginModule)
  },
  {
    path:'admin',
    component:LayoutsComponent,
    canActivateChild : [AuthGuard],
    children:[
      {
        path:'',
        component:HomeComponent,
        loadChildren: ()=> import('./admin/home/home.module')
        .then(m => m.HomeModule)
      },
      {
        path:'products',
        children:[
          {
            path:'',
            component:ProductsComponent,
            loadChildren: ()=> import('./admin/products/products.module')
            .then(m => m.ProductsModule)
          },
          {
            path:':id/images',
            component:ProductImagesComponent,
            loadChildren: ()=> import('./admin/products/product-images/product-images.module')
            .then(m => m.ProductImagesModule)
          }
        ]
        
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
