import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { GrowlService } from '../../service/auth/growl.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-grow',
  templateUrl: './grow.component.html',
  styleUrl: './grow.component.scss',
  animations: [
    trigger('animationState', [
      state('success', style({})),
      state('error', style({
        // height: '60px',
        // opacity: 0.5,
        // backgroundColor: 'yellow'
      })),
      transition('success => error', [
        animate('900ms ease-in-out')
      ]),
      transition('error => success', [
        animate('900ms ease-in-out')
      ]),
    ])
  ]
})
export class GrowComponent implements OnInit {
  public successStaatusAlert!:boolean
  public message:string = ''

  successSubscription!: Subscription;
  errorSubscription!: Subscription;
  
  state = ''
  constructor(
    private notification:GrowlService
  ){}

  ngOnInit() {
    this.successSubscription = this.notification.successAnimation$.subscribe(
      state => this.successStaatusAlert = state
    );
    this.errorSubscription = this.notification.errorAnimation$.subscribe(
      state => { this.successStaatusAlert = state, console.log(state)} 
    );

    console.log('successStaatusAlert',this.successStaatusAlert)
  }


  ngOnDestroy() {
    this.successSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }

  showSuccessAnimation() {
    this.notification.showSuccessAnimation();
  }

  showErrorAnimation() {
    this.notification.showErrorAnimation();
  }
}
