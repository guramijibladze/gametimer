import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grow',
  templateUrl: './grow.component.html',
  styleUrl: './grow.component.scss',
  animations: [
    trigger('animationState', [
      state('success', style({
        height: '60px',
        opacity: 1,
        backgroundColor: 'green',
        coloe: '#fff'
      })),
      state('error', style({
        height: '60px',
        opacity: 0.5,
        backgroundColor: 'yellow'
      })),
      transition('success => error', [
        animate('0.5s')
      ]),
      transition('error => success', [
        animate('0.3s')
      ]),
    ])
  ]
})
export class GrowComponent implements OnInit {
  animationState = 'error'

  ngOnInit() {
    console.log('animation')
    setTimeout(() => {
      this.animationState = 'success';
      console.log('animation')
    }, 3000);
  }
}
