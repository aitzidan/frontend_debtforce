import { Component } from '@angular/core';
import { NavbarService } from 'projects/back-office/src/app/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor( public nav: NavbarService ) {}
  route:string = '/AddModelFacturation';
}
