import { Component, OnInit } from '@angular/core';
import { ComputersRooms } from '../model';
import { ComputerRoomsService } from '../service/computer-rooms.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-forcomputers',
  templateUrl: './forcomputers.component.html',
  styleUrl: './forcomputers.component.scss'
})
export class ForcomputersComponent implements OnInit {
  public hours:number = 0
  public minutes:any = 0
  public clientName = '';
  public startcontinue:boolean = true
  public amountofmoneywithcash:number = 0
  public amountofmoneywithcard:number = 0
  public orderedjuss:string = ''
  public infoUpdateButton:boolean = false

  timer: any
  conicgradient:any
  conicgradientPercent:number = 0
 
  private computerroomsID:number = 0

  constructor(
    private computerRoomsService: ComputerRoomsService
  ){}

  ngOnInit() {
    this.getCurrentDate()
  }

  computersArrr:ComputersRooms[] = [
    { 
      roomsID:1, 
      clientname: '',
      name: 'ოთახი N1', 
      startButton: false,
      pausecontinuoe:false, 
      ordertime: '',
      endtime: '',
      times: { selectedhour: '', currenthours: 0, minutes: 0, seconds: 0 },
      ativestatus:true,
      amountofmoneywithcash:0,
      amountofmoneywithcard:0,
      status:'vip',
      gameTimerType:false,
      orderedjuss: '',
      timer: 0,
      progress: 0
    },
    { roomsID:2, clientname: '', name: 'ოთახი N2', startButton: false, pausecontinuoe:false, ordertime: '', endtime: '',
      times: { selectedhour: '', currenthours: 0, minutes: 0, seconds: 0 }, 
      ativestatus:true,
      amountofmoneywithcash:0,
      amountofmoneywithcard:0,
      status:'vip', gameTimerType:false, orderedjuss: '', timer: 0,
      progress: 0},
    { roomsID:3, clientname: '', name: 'ოთახი N3', startButton: false, pausecontinuoe:false, ordertime: '', endtime: '',
      times: { selectedhour: '', currenthours: 0, minutes: 0, seconds: 0 }, ativestatus:true, amountofmoneywithcash:0,
      amountofmoneywithcard:0, status:'vip', gameTimerType:false, orderedjuss: '', timer: 0,
      progress: 0},
    { roomsID:4, clientname: '', name: 'ოთახი N4', startButton: false, pausecontinuoe:false, ordertime: '', endtime: '',
      times: { selectedhour: '', currenthours: 0, minutes: 0, seconds: 0 }, ativestatus:true, amountofmoneywithcash:0,
      amountofmoneywithcard:0, status:'vip', gameTimerType:false, orderedjuss: '', timer: 0,
      progress: 0},
    { roomsID:5, clientname: '', name: 'ოთახი N5', startButton: false, pausecontinuoe:false, ordertime: '', endtime: '',
      times: { selectedhour: '', currenthours: 0, minutes: 0, seconds: 0 }, ativestatus:true, amountofmoneywithcash:0,
      amountofmoneywithcard:0, status:'vip', gameTimerType:false, orderedjuss: '', timer: 0,
    progress: 0},
    { roomsID:6, clientname: '', name: 'ოთახი N5', startButton: false, pausecontinuoe:false, ordertime: '', endtime: '',
      times: { selectedhour: '', currenthours: 0, minutes: 0, seconds: 0 }, ativestatus:true, amountofmoneywithcash:0,
      amountofmoneywithcard:0, status:'', gameTimerType:false, orderedjuss: '', timer: 0,
      progress: 0}
  ]



  //მონიშნული ობიექტის აიდი
  public startTime(roomsID:number):void{
    this.computerroomsID = roomsID

    if( this.computersArrr[roomsID-1].ordertime){
      this.startcontinue = false
    }
  }

  public pause(boxroomsID:number):void{

    this.computersArrr.forEach((item:any) => {
       item.roomsID == boxroomsID ? item.pausecontinuoe = !item.pausecontinuoe : ''
    })

  }

  public updateinfo(){
    this.startcontinue = false
    this.infoUpdateButton = true

    //მოდალში ანახებს ამ ოთახზე არჩეულ ინფოს
    this.computersArrr.forEach((item:ComputersRooms) => {
      if(this.computerroomsID == item.roomsID){
        this.clientName = item.clientname
        // this.hours = item.times.currenthours
        // this.minutes = item.times.minutes
        this.amountofmoneywithcash = item.amountofmoneywithcash
        this.amountofmoneywithcard = item.amountofmoneywithcard
        this.orderedjuss = item.orderedjuss
      }
    })
  }

  public update():void{
    console.log(this.computerroomsID)
    this.computersArrr.forEach((item:ComputersRooms) => {
      if(this.computerroomsID == item.roomsID){
        item.clientname = this.clientName
        // this.hours = item.times.currenthours
        // this.minutes = item.times.minutes
        item.amountofmoneywithcash = this.amountofmoneywithcash
        item.amountofmoneywithcard = this.amountofmoneywithcard
        item.orderedjuss = this.orderedjuss
      }
    })
  }

  public saveTime(str?:string):void{
    let progress = 0
    this.infoUpdateButton = false

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
            item.clientname = this.clientName
            item.ativestatus = false
            item.amountofmoneywithcard = this.amountofmoneywithcard
            item.amountofmoneywithcash = this.amountofmoneywithcash
            item.orderedjuss = this.orderedjuss
            item.ordertime = this.getCurrentDate()
            progress = this.getAllTimersInSeconds()
          }else if(this.minutes == 30){
            item.times.selectedhour = this.hours + ':' + this.minutes
            item.times.currenthours = this.hours;
            item.times.minutes = 29;
            item.times.seconds = 59;
            item.clientname = this.clientName
            item.ativestatus = false
            item.orderedjuss = this.orderedjuss
            item.amountofmoneywithcard = this.amountofmoneywithcard
            item.amountofmoneywithcash = this.amountofmoneywithcash
            item.ordertime = this.getCurrentDate()
            progress = this.getAllTimersInSeconds()
          }else if(this.minutes ){

          }else{
            alert('დრო არ აგირჩევია ბაჭყატ!!!')
            return
          }

          //დაწყების ღილაკის გამორთვა
          // item.startButton = true
          
          item.timer = setInterval(() => {
            item.times.seconds--;
            item.progress += progress;
            
            //დროის ამოწურვა
            if (item.times.seconds == 0 && item.times.minutes == 0 && item.times.currenthours == 0) {
              this.endTime(item.roomsID, item.timer);
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

              item.times.seconds = 59;
            }
            // console.log(item.times)
          }, 1000)
        }
      })
    }

  }

  //დასრულების ივენთი
  public cancelTime(roomsID:number, timer:number):void{
    this.infoUpdateButton = false
    let endTime = this.getCurrentDate()
    this.computersArrr[roomsID-1].endtime = endTime
    this.computerRoomsService.postTimer({...this.computersArrr[roomsID-1]}).subscribe({
      next : (res) => console.log('responese', res),
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
    })

    clearInterval(timer) 
    this.resetModalParameters(roomsID)
    
  }

  //გადაყავს მიმდინარე დროზე
  gametimertypeArr:any[] = []
  public chagnegametimertype():any{
    // console.log('chagnegametimertype',this.computerroomsID)
    this.computersArrr.forEach((item) => {
      if(item.roomsID == this.computerroomsID){
        item.gameTimerType = !item.gameTimerType
      }
    })
    console.log('chagnegametimertype',this.computersArrr)
    // if
  }


  //დროის ამოწურვა
  private endTime(roomsID:any, timer:number):void{
    this.infoUpdateButton = false
    let endTime = this.getCurrentDate()
    this.computersArrr[roomsID-1].endtime = endTime
    this.computersArrr[roomsID-1].ativestatus = true
    this.startcontinue = true
    console.log('endTime!!!!!', {...this.computersArrr[roomsID-1]})

    this.computerRoomsService.postTimer({...this.computersArrr[roomsID-1]}).subscribe({
      next : (res) => console.log('responese', res),
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
    })

    clearInterval(timer)
    this.resetModalParameters(roomsID)

  }


  
  private getCurrentDate():any{
    let parseDate:any
    let pipe = new DatePipe('en-US');
    let today = new Date();
    let ChangedFormat = pipe.transform(today, 'MMM d, y, h:mm a');
    parseDate = ChangedFormat
    
    return parseDate
  }

    //დროის დამატება ოთახზე
    public addContinuetime():void{
    
      this.startcontinue = false
      clearInterval(this.computersArrr[this.computerroomsID-1].timer)
      let progress = 0
      if(this.hours || this.minutes ){

          //საათების და წუთების დამატების ლოგიკა
          this.computersArrr.forEach((item) => {
            if(item.roomsID == this.computerroomsID){
              if(this.hours != 0 && this.minutes == 0 ){
                item.times.currenthours += Number(this.hours);
                item.times.minutes += Number(this.minutes);
                item.times.seconds = 59;
                item.progress = 0
                progress = this.getAllTimersInSeconds('addtime')
              }else if(this.minutes == 30){
                // item.times.currenthours += Number(this.hours);

                if(item.times.minutes > 30){
                  // let currentMinutes = item.times.minutes - 30
                  item.times.currenthours ++;
                  item.times.minutes = item.times.minutes - 30
                }else{
                  item.times.minutes += Number(this.minutes);
                }

                item.times.seconds = 59;
                item.progress = 0
                progress = this.getAllTimersInSeconds('addtime')
              }else{
                alert('დრო არ აგირჩევია ბაჭყატ!!!')
                return
              }
  
              item.timer = setInterval(() => {
                item.times.seconds--;
                item.progress += progress;
                
                //დროის ამოწურვა
                if (item.times.seconds == 0 && item.times.minutes == 0 && item.times.currenthours == 0) {
                  this.endTime(item.timer, item.timer);
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
    
                  item.times.seconds = 59;
                }
              }, 1000)
            }

          })
    }
  }

  public mdoalclose(){
    this.infoUpdateButton = false
  }

    //გადაყავს დრო წამებში
    private getAllTimersInSeconds(str?:string):number{
      if(str){
        let progress = 0
         this.computersArrr.map((item:any) => {
          if(item.roomsID == this.computerroomsID) {
            
            item.times.progress = 0
            console.log('getAllTimersInSeconds', item)
            progress = (1 / (item.times.currenthours * 3600 + item.times.minutes * 60) * 100)
          }
        })
        return progress
      }else{
        return (1 / (this.hours * 3600 + this.minutes * 60) * 100) 
      }
      
    }
  

    private resetModalParameters(roomsID:number):void{
      this.computersArrr[roomsID-1].times.currenthours = 0
      this.computersArrr[roomsID-1].times.minutes = 0
      this.computersArrr[roomsID-1].times.seconds = 0
      this.computersArrr[roomsID-1].startButton = false
      this.computersArrr[roomsID-1].progress = 0
      this.computersArrr[roomsID-1].times.selectedhour = ''
      this.computersArrr[roomsID-1].ordertime = ''
      this.computersArrr[roomsID-1].ativestatus = true
      this.computersArrr[roomsID-1].clientname = ''
      this.amountofmoneywithcash = 0
      this.amountofmoneywithcard = 0
      this.minutes = 0
      this.hours = 0
      this.clientName = ''
      this.orderedjuss = ''
      this.startcontinue = true
    }
}

