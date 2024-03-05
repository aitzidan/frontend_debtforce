import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
  ) {}

  public token: any;
  public isRootRoute: boolean = false;

  

  ngOnInit(): void {
    
  }
  title = 'dt_force_app';
}
