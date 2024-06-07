import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrowlService {

  private successSource = new Subject<boolean>();
  private errorSource = new Subject<boolean>();

  successAnimation$ = this.successSource.asObservable();
  errorAnimation$ = this.errorSource.asObservable();

  showSuccessAnimation() {
    // console.log(message)
    this.successSource.next(true);
    setTimeout(() => this.hideSuccessAnimation(), 3000);
  }

  hideSuccessAnimation() {
    this.successSource.next(false);
  }

  showErrorAnimation() {
    console.log('showErrorAnimation',this.errorSource)
    this.errorSource.next(false);
    setTimeout(() => this.hideErrorAnimation(), 3000);
  }

  hideErrorAnimation() {
    this.errorSource.next(true);
  }
}
