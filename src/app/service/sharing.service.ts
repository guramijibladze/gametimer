import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharingService {

  private sendObjcet = new Subject<any>();

  getInfo$ = this.sendObjcet.asObservable();

  constructor() { }
}
