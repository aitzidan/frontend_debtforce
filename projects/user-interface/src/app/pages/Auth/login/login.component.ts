import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/navbar.service';
import { HeaderService } from 'src/app/header.service';
import { UtilisateursService } from 'src/app/Api/utilisateurs.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor( public nav: NavbarService, public header:HeaderService,private userApi: UtilisateursService,
    public router:Router ,
    private notify : NotificationService
     ) {}
  hide = true;
  isDisable = false;
  token:any;
  Login(name:string,password:string){
    this.isDisable = true;
    const formData = new FormData();
    formData.append('login',name);
    formData.append('password',password);
    this.userApi.Login(formData).subscribe(
      (res: any) => {
        if(res.codeStatut==="OK"){
          console.log(res);
          localStorage.setItem('token', res.token); 
          console.log("it s")
          this.router.navigate(['/view-statistiques']);

        }else{
          // console.log(res);
          
          this.notify.showError(res.message);
          this.isDisable = false;
        }
      },
      (error: any) => {
        this.isDisable = false;
        this.notify.showError2();
      }
    );
  }
  ngOnInit() {
    this.nav.hide();
    this.header.hide();
    this.token = localStorage.getItem('token');
    if (!this.token) {
      localStorage.clear();
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/view-statistiques']);
    }
  }
}
