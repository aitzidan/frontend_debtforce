import { Component, OnInit,OnDestroy  } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/header.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor( public header: HeaderService,public router:Router,private headerService:HeaderService, private jwtHelper: JwtHelperService, ) {}
  
  dynamicLinks: { link: string, route: string }[] = [];
  private linksSubscription: Subscription | null = null;
  token:any;
  ShowDrop:boolean = false;
  toggleDropdown(){
    this.ShowDrop = !this.ShowDrop;
  }
  Logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  
  ngOnInit(): void {
    this.linksSubscription = this.headerService.getLinksObservable().subscribe(links => {
      this.dynamicLinks = links;
    });
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      // console.log(decodedToken);
      this.token=decodedToken.id
    } else {
      console.log('Token not found.');
    }
     
  }

  ngOnDestroy(): void {
    if (this.linksSubscription) {
      this.linksSubscription.unsubscribe();
    }
  }
}
