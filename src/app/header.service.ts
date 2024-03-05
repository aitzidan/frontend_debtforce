import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  visible: boolean=true;
  
  private dynamicLinksSubject = new BehaviorSubject<{ link: string, route: string }[]>([]);

  setLinks(links: { link: string, route: string }[]): void {
    this.dynamicLinksSubject.next(links);
  }

  getLinksObservable(): Observable<{ link: string, route: string }[]> {
    return this.dynamicLinksSubject.asObservable();
  }
  clearLinks(): void {
    this.dynamicLinksSubject.next([]);
  }


  constructor() { 
    this.visible = false;
    }

  hide() { this.visible = false; }

  show() { this.visible = true; }

  toggle() { this.visible = !this.visible; }
}
export function thisRouteFrom(){
    
}
