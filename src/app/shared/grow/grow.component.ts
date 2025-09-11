import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { GrowlService } from '../../service/auth/growl.service';
import { Subscription } from 'rxjs';

animations: [
  trigger(
    'animationState', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('500ms', style({ opacity: 1 }))
    ]),
    transition(':leave', [
      style({ opacity: 1 }),
      animate('900ms', style({ opacity: 0 }))
    ])
  ]
  )
]

@Component({
  selector: 'app-grow',
  templateUrl: './grow.component.html',
  styleUrl: './grow.component.scss',
  animations: [
    trigger(
      'animationState', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('900ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('900ms', style({ opacity: 0 }))
      ])
    ]
    )
  ]
})
export class GrowComponent implements OnInit {
  public successStaatusAlert!:boolean
  public ngclassStatus!:boolean
  public message:string = ''

  successSubscription!: Subscription;
  errorSubscription!: Subscription;
  
  constructor(
    private notification:GrowlService
  ){}

  ngOnInit() {
    this.successSubscription = this.notification.successAnimation$.subscribe(
      state => { this.successStaatusAlert = state[0]
                  this.ngclassStatus = state[0]
                  this.message = state[1]
                  this.changeStatus()} 
    );

    this.errorSubscription = this.notification.errorAnimation$.subscribe(
      state => { this.successStaatusAlert = true,
                  this.ngclassStatus = state[0],
                  this.message = state[1]
                  this.changeStatus()
                  console.log('successStaatusAlert',state)} 
    );
  }

  changeStatus():void{
    setTimeout(() => (this.successStaatusAlert = false), 5000);
  }


  ngOnDestroy() {
    this.successSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }

}
