import { Component } from '@angular/core';
// import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-forcomputers',
  templateUrl: './forcomputers.component.html',
  styleUrl: './forcomputers.component.scss'
})
export class ForcomputersComponent {

  hours:number = 0
  seconds:number = 0
 
  private computerId:number | undefined = undefined

  computersArrr:any[] = [
    { id:1, 
      name: 'ოთახი N1', 
      pausecontinuoe:false, 
      times: { hours: 0, seconds: 0 },
      status:'vip'
    },
    { id:2, name: 'ოთახი N2', pausecontinuoe:false, times: { hours: 0, seconds: 0 }, status:'vip'},
    { id:3, name: 'ოთახი N3', pausecontinuoe:false, times: { hours: 0, seconds: 0 }, status:'vip'},
    { id:4, name: 'ოთახი N4', pausecontinuoe:false, times: { hours: 0, seconds: 0 }, status:'vip'},
    { id:5, name: 'ოთახი N5', pausecontinuoe:false, times: { hours: 0, seconds: 0 }, status:'vip'},
    { id:6, name: 'ოთახი N5', pausecontinuoe:false, times: { hours: 0, seconds: 0 }, status:''}
  ]

  startTime(id:number):void{
    // let myModal = new bootstrap.Modal(document.getElementById('myModal'), {
    //   keyboard: false
    // })
    this.computerId = id
    console.log(this.computerId)
  }

  pause(boxid:number):void{

    this.computersArrr.forEach((item:any) => {
       item.id == boxid ? item.pausecontinuoe = !item.pausecontinuoe : ''
    })

  }

  saveTime(str?:string):void{
 
    if(str =='save'){
      // console.log(str,num)
      this.computersArrr.forEach((item) => {

        if(item.id == this.computerId){
          item.times.hours = this.hours,
          item.times.seconds = this.seconds * 3600
        }

      })
    }
    console.log(this.computersArrr)
  }

  stopTime():void{
    // clearInterval(myVar)
  }

}
