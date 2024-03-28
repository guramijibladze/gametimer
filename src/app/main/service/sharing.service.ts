import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharingService {
  private subject = new Subject<void>();

  constructor() { }

  sendClickEvent(): void {
    console.log('Doing something...');
    this.subject.next()
    // this.getClickEvent()
  }

  getClickEvent(): Observable<any>{ 
    console.log('Doing getClickEvent');
    return this.subject.asObservable();
  }
}
