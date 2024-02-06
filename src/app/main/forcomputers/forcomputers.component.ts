import { Component } from '@angular/core';

@Component({
  selector: 'app-forcomputers',
  templateUrl: './forcomputers.component.html',
  styleUrl: './forcomputers.component.scss'
})
export class ForcomputersComponent {

  hours:number = 0
  minutes:number = 0
  timer: any;
 
  private computerId:number = 0

  computersArrr:any[] = [
    { id:1, 
      name: 'ოთახი N1', 
      pausecontinuoe:false, 
      times: { hours: 0, minutes: 0, seconds: 0 },
      status:'vip',
      timer: 0
    },
    { id:2, name: 'ოთახი N2', pausecontinuoe:false, times: { hours: 0, minutes: 0, seconds: 0 }, 
      status:'vip', timer: 0},
    { id:3, name: 'ოთახი N3', pausecontinuoe:false, times: { hours: 0, minutes: 0, seconds: 0 }, status:'vip', timer: 0},
    { id:4, name: 'ოთახი N4', pausecontinuoe:false, times: { hours: 0, minutes: 0, seconds: 0 }, status:'vip', timer: 0},
    { id:5, name: 'ოთახი N5', pausecontinuoe:false, times: { hours: 0, minutes: 0, seconds: 0 }, status:'vip', timer: 0},
    { id:6, name: 'ოთახი N5', pausecontinuoe:false, times: { hours: 0, minutes: 0, seconds: 0 }, status:'', timer: 0}
  ]

  // private roomsID:number[] = []

  public cancelTime():void{

  }

  startTime(id:number):void{
    this.computerId = id
    // this.roomsID.push(this.computerId)
  }

  pause(boxid:number):void{

    this.computersArrr.forEach((item:any) => {
       item.id == boxid ? item.pausecontinuoe = !item.pausecontinuoe : ''
    })

  }

  saveTime(str?:string):void{
 
    if(str =='save'){
      // საათის და წუთების ჩამატება
      this.computersArrr.forEach((item) => {

        if(item.id == this.computerId){
          
          if(item.times.hours != 0 && item.times.minutes == 0 ){
            item.times.hours = this.hours- 1;
          }else{
            item.times.hours
          }

          if(item.times.minutes != 0 && item.times.hours == 0){
            item.times.minutes = this.minutes-1
          }else{
            item.times.minutes = 59
          }
          
          item.times.seconds = 59

          item.timer = setInterval(() => {
            item.times.seconds--
            
            //დროის ამოწურვა
            if (item.times.seconds == 0 && item.times.minutes == 0 && item.times.hours == 0) {
              this.endTime(item.timer);
              return;
            }

            //საათის დაკლება
            if ( item.times.hours >= 1 && item.times.minutes == 0 && item.times.seconds == 0) {
              item.times.minutes = 60
              item.times.hours--;
            }

            //წამზომის 60 დან დაწყება
            if (item.times.seconds == -1) {
              if ( item.times.minutes >= 1) item.times.minutes--;
              // if (this.hours == 0 && this.minutes == 0) this.minutes = 59;

              item.times.seconds = 59;
            }

          }, 1000)
        }

      })
    }

  }



  private endTime(id:any):void{
    console.log('endTime', id);
    clearInterval(id)
  }

}
