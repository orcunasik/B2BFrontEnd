import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './services/user.service';
import { UserModel } from './models/user-model';
import { AdminDecodeService } from '../login/services/admin-decode.service';
import { AuthService } from '../login/services/auth.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userId : number = 0;
  userName : string = "";

  constructor(
    private toastr : ToastrService,
    private userService : UserService,
    private adminDecodeService: AdminDecodeService,
    private authService : AuthService,
    private errorService : ErrorService
  ){}

  ngOnInit(): void {
    this.getUserId();
    this.getUserName();
  }

  getUserId(){
    this.userId = this.adminDecodeService.getUserId();
  }

  getUserName(){
    this.userName = this.adminDecodeService.getUserName();
  }

  update(updateForm : any){
    let user : UserModel = new UserModel();
    user.id = this.userId;
    user.name = this.userName;
    user.password = updateForm.value.password;
    user.newPassword = updateForm.value.newPassword;
    this.userService.update(user).subscribe((res)=>{
      this.toastr.info("Kullanıcı Bilgileri Güncellendi! Tekrar Giriş Yapmalısınız!!");
      this.authService.logout()
    },(err)=>{
      this.errorService.errorHandler(err);
    });
  }
}
