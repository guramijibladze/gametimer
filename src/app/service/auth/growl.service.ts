import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrowlService {

  private successSource = new Subject<[boolean, string]>();
  private errorSource = new Subject<[boolean, string]>();

  successAnimation$ = this.successSource.asObservable();
  errorAnimation$ = this.errorSource.asObservable();

  showSuccessAnimation(item:any) {
    this.successSource.next([true, item]);
  }

  // hideSuccessAnimation() {
  //   this.successSource.next(false);
  // }

  showErrorAnimation(item:string) {
    this.errorSource.next([false, item]);
    console.log('showErrorAnimation', item)

    // setTimeout(() => this.hideErrorAnimation(), 3000);
  }

  // hideErrorAnimation() {
  //   this.errorSource.next(true);
  // }
}
