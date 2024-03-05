import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  visible: boolean=true;

  constructor() { this.visible = false; }

  hide() { this.visible = false;return false }

  show() { this.visible = true;return true }

  toggle() { this.visible = !this.visible; }
}
