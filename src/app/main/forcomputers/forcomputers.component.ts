import { Component } from '@angular/core';
import { ComputersRooms } from '../model';
import { ComputerRoomsService } from '../service/computer-rooms.service';

@Component({
  selector: 'app-forcomputers',
  templateUrl: './forcomputers.component.html',
  styleUrl: './forcomputers.component.scss'
})
export class ForcomputersComponent {

  hours:number = 0
  minutes:any = '00'
  // beer:number = 0

  timer: any
  conicgradient:any
  conicgradientPercent:number = 0
 
  private computerroomsID:number = 0

  constructor(
    private computerRoomsService: ComputerRoomsService
  ){}

  computersArrr:ComputersRooms[] = [
    { 
      roomsID:1, 
      name: 'ოთახი N1', 
      startButton: false,
      pausecontinuoe:false, 
      times: { selectedhour: '', currenthours: 0, minutes: 0, seconds: 0 },
      status:'vip',
      timer: 0,
      progress: 0
    },
    { roomsID:2, name: 'ოთახი N2', startButton: false, pausecontinuoe:false, times: { selectedhour: '', currenthours: 0, minutes: 0, seconds: 0 }, 
      status:'vip', timer: 0,
      progress: 0},
    { roomsID:3, name: 'ოთახი N3', startButton: false, pausecontinuoe:false, times: { selectedhour: '', currenthours: 0, minutes: 0, seconds: 0 }, status:'vip', timer: 0,
    progress: 0},
    { roomsID:4, name: 'ოთახი N4', startButton: false, pausecontinuoe:false, times: { selectedhour: '', currenthours: 0, minutes: 0, seconds: 0 }, status:'vip', timer: 0,
    progress: 0},
    { roomsID:5, name: 'ოთახი N5', startButton: false, pausecontinuoe:false, times: { selectedhour: '', currenthours: 0, minutes: 0, seconds: 0 }, status:'vip', timer: 0,
    progress: 0},
    { roomsID:6, name: 'ოთახი N5', startButton: false, pausecontinuoe:false, times: { selectedhour: '', currenthours: 0, minutes: 0, seconds: 0 }, status:'', timer: 0,
    progress: 0}
  ]


  public startTime(roomsID:number):void{
    this.computerroomsID = roomsID
  }

  public pause(boxroomsID:number):void{

    this.computersArrr.forEach((item:any) => {
       item.roomsID == boxroomsID ? item.pausecontinuoe = !item.pausecontinuoe : ''
    })

  }


  public saveTime(str?:string):void{
    let progress = 0
    if(str =='save'){
      // საათის და წუთების ჩამატება
      this.computersArrr.forEach((item, index) => {
   
        if(item.roomsID == this.computerroomsID){
          
          
          //საათების და წუთების არჩევის ლოგიკა
          if(this.hours != 0 && this.minutes == 0 ){     
            item.times.selectedhour = this.hours + ':' + this.minutes
            item.times.currenthours = this.hours- 1;
            item.times.minutes = 59;
            item.times.seconds = 59;
            progress = this.getAllTimersInSeconds()
          }else if(this.minutes == 30){
            item.times.selectedhour = this.hours + ':' + this.minutes
            item.times.currenthours = this.hours;
            item.times.minutes = 29;
            item.times.seconds = 59;
            progress = this.getAllTimersInSeconds()
          }else{
            console.log()
            alert('დრო არ აგირჩევია ბაჭყატ!!!')
            return
          }

          //დაწყების ღილაკის გამორთვა
          item.startButton = true

          item.timer = setInterval(() => {
            item.times.seconds--;
            item.progress += progress;
            console.log('item.progress',item.progress)
            
            //დროის ამოწურვა
            if (item.times.seconds == 0 && item.times.minutes == 0 && item.times.currenthours == 0) {
              this.endTime(item.timer);
              return;
            }

            //საათის დაკლება
            if ( item.times.currenthours >= 1 && item.times.minutes == 0 && item.times.seconds == 0) {
              item.times.minutes = 60
              item.times.currenthours--;
            }

            //წამზომის 60 დან დაწყება
            if (item.times.seconds == -1) {
              if ( item.times.minutes >= 1) item.times.minutes--;
              // if (this.hours == 0 && this.minutes == 0) this.minutes = 59;

              item.times.seconds = 59;
            }

            // this.getCircleProgress(item.progress)
          }, 1000)
        }

      })
    }

  }

  public cancelTime(roomsID:number, timer:number):void{
    console.log('cancelTime', this.computersArrr[roomsID-1])
    clearInterval(timer)

    this.computerRoomsService.postTimer({...this.computersArrr[roomsID-1]}).subscribe( response => {
      console.log('siccessed')
    })

    this.computersArrr[roomsID-1].times.currenthours = 0
    this.computersArrr[roomsID-1].times.minutes = 0
    this.computersArrr[roomsID-1].times.seconds = 0
    this.computersArrr[roomsID-1].startButton = false
    this.computersArrr[roomsID-1].progress = 0
    this.computersArrr[roomsID-1].progress = 0
    
  }

  //გადაყავს დრო წამებში
  private getAllTimersInSeconds():number{
    return (1 / (this.hours * 3600 + this.minutes * 60) * 100) 
  }

  private endTime(roomsID:any):void{
    clearInterval(roomsID)
    
    // let objcet = {

    // }
    // this.computerRoomsService.createTimer(objcet).subscribe( response => {

    // })
  }

}


// { "roomsID":1, 
// "name": "ოთახი N1", 
// "startButton": false,
// "pausecontinuoe":false, 
// "times": { "selectedhour": "", "currenthours": 0, "minutes": 0, "seconds": 0 },
// "status":"vip",
// "timer": 0,
// "progress": 0
// }