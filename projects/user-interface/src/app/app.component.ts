import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd , ActivatedRoute  } from '@angular/router';
import { NavbarService } from 'src/app/navbar.service';
import { HeaderService } from 'src/app/header.service';
import { UtilisateursService } from './Api/utilisateurs.service';
// import { NotificationService } from 'src/app/services/notification.service'
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponentBackOffice implements OnInit{
  constructor(
    private dialog: MatDialog,
    public nav: NavbarService,
    public header: HeaderService,
    private route: ActivatedRoute,
    public router: Router,
    private userApi: UtilisateursService,
    // public notify : NotificationService
  ) {}
  public token: any;
  public isRootRoute: boolean = false;
  checkWs(){
    this.userApi.checkAuth().subscribe(
      (res: any) => {
        if(res.codeStatut != "OK"){
          localStorage.clear();
          this.router.navigate(['/login']);
          this.closeAllDialogs();
        }
      }
      ,(error: any) => {
        localStorage.clear();
        this.router.navigate(['/login']);
        this.closeAllDialogs();
      }
    );
  }
  path:any
  closeAllDialogs() {
    this.dialog.closeAll();
  }
  
  
  ngOnInit(): void {
    console.log('is back office')
    this.checkWs();
    // if(this.router.url != "/"){
    this.checkWs();
    this.token = localStorage.getItem('token');
    if (!this.token) {
      localStorage.clear();
      this.router.navigate(['/login']);
    } else {
      this.showHideNavbarSidebar();
    }
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showHideNavbarSidebar();
      }
    });

    setInterval(()=>{
      this.checkWs();
    },500000)
  }

  showHideNavbarSidebar(): void {
    try {
      this.isRootRoute = this.router.url === '/login';
      this.nav.visible = !this.isRootRoute;
      this.header.visible = !this.isRootRoute;
    } catch (error) {
      console.error('An error occurred in showHideNavbarSidebar:', error);
    }  
  }
  title = 'dt_force_app';
}
