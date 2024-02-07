import { Component } from '@angular/core';
import { ComputersRooms } from '../model';

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

  computersArrr:ComputersRooms[] = [
    { id:1, 
      name: 'ოთახი N1', 
      startButton: false,
      pausecontinuoe:false, 
      times: { hours: 0, minutes: 0, seconds: 0 },
      status:'vip',
      timer: 0
    },
    { id:2, name: 'ოთახი N2', startButton: false, pausecontinuoe:false, times: { hours: 0, minutes: 0, seconds: 0 }, 
      status:'vip', timer: 0},
    { id:3, name: 'ოთახი N3', startButton: false, pausecontinuoe:false, times: { hours: 0, minutes: 0, seconds: 0 }, status:'vip', timer: 0},
    { id:4, name: 'ოთახი N4', startButton: false, pausecontinuoe:false, times: { hours: 0, minutes: 0, seconds: 0 }, status:'vip', timer: 0},
    { id:5, name: 'ოთახი N5', startButton: false, pausecontinuoe:false, times: { hours: 0, minutes: 0, seconds: 0 }, status:'vip', timer: 0},
    { id:6, name: 'ოთახი N5', startButton: false, pausecontinuoe:false, times: { hours: 0, minutes: 0, seconds: 0 }, status:'', timer: 0}
  ]


  public startTime(id:number):void{
    this.computerId = id
  }

  public pause(boxid:number):void{

    this.computersArrr.forEach((item:any) => {
       item.id == boxid ? item.pausecontinuoe = !item.pausecontinuoe : ''
    })

  }

  public saveTime(str?:string):void{
 
    if(str =='save'){
      // საათის და წუთების ჩამატება
      this.computersArrr.forEach((item) => {
   
        if(item.id == this.computerId){
          //დაწყების ღილაკის გამორთვა
          item.startButton = true
          
          //საათების და წუთების არჩევის ლოგიკა
          if(this.hours != 0 && this.minutes == 0 ){          
            item.times.hours = this.hours- 1;
            item.times.minutes = 59;
            item.times.seconds = 59;
          }else if(this.minutes == 30){
            item.times.hours = this.hours;
            item.times.minutes = 29;
            item.times.seconds = 59;
          }


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

  public cancelTime(id:number, timer:number):void{
    clearInterval(timer)
    this.computersArrr[id-1].times.hours = 0
    this.computersArrr[id-1].times.minutes = 0
    this.computersArrr[id-1].times.seconds = 0
    this.computersArrr[id-1].startButton = false
  }

  private endTime(id:any):void{
    clearInterval(id)
  }

}
