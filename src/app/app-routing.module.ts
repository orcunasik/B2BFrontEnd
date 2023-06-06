import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './admin/layouts/layouts.component';
import { HomeComponent } from './admin/home/home.component';

const routes: Routes = [
  {
    path:'admin',
    component:LayoutsComponent,
    children:[
      {
        path:'',
        component:HomeComponent,
        loadChildren: ()=> import('./admin/home/home.module')
        .then(m => m.HomeModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
