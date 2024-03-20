import { Component } from '@angular/core';
import { ComputerRoomsService } from '../service/computer-rooms.service';
import { ComputersRooms, tbodyNames } from '../model';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.scss'
})
export class StatisticComponent {
  private selectedRow:any
  public amountofmoneywithcash = 0
  public amountofmoneywithcard = 0
  public orderedjuss = ''
  public currentDate = ''
  
  public theadNames:string[] = ['#', 'ოთხი', 'ოთახის სტატუსი', 'შეკვეთის თარიღი', 'დასრულების თარიღი', 'კლიენტის სახელი', 'გადახდის მეთოდი',
  'თანხა ჯამში','შეკვეთები', '' ]
  public tbodyNames: any[] = []

  constructor(
    private computerRoomsService: ComputerRoomsService,
    private router: Router,
    private authService: AuthService
  ){}

  ngOnInit() {
    this.getcomputerRooms()
  }

  public getData(){
    let pipe = new DatePipe('en-US');
    let ChangedFormat = pipe.transform(this.currentDate, 'MMM d, y');
    this.getcomputerRooms(ChangedFormat)
    console.log(ChangedFormat)
  }

  public getcomputerRooms(ChangedFormat?:any):void{
    let pipe = new DatePipe('en-US');
    let getObject = {
      ordertime: ChangedFormat ? ChangedFormat : this.getCurrentDate()
    }

    this.tbodyNames = []
    this.computerRoomsService.getcomputerRooms().subscribe( response => {
      
      response.map((item:tbodyNames) => {
        if( pipe.transform(item.ordertime, 'MMM d, y') == getObject.ordertime){
            this.tbodyNames.push({
              amount: Number(item.amountofmoneywithcard) + Number(item.amountofmoneywithcash),
              ...item,
            })
        }
      })

    })
  }

  public selectedItem(item:any){
    this.selectedRow = item
    console.log('pay!!!', item)
  }

  public pay(id:number):void{
    this.tbodyNames.forEach((item:tbodyNames) => {
      if(id == item.id){
        this.amountofmoneywithcash = item.amountofmoneywithcash
        this.amountofmoneywithcard = item.amountofmoneywithcard
        this.orderedjuss = item.orderedjuss
      }
    })
    
  }


  public putselectedrow():void{
    let closebutton = document.getElementById('closebutton')
    let rowId = this.selectedRow.id

    let sendObject = {
      roomsID: 0,
      pausecontinuoe: false,
      ordertime: '',
      endtime: '',
      amountofmoneywithcash: 0,
      amountofmoneywithcard: 0,
      ativestatus:true,
      status:'',
      gameTimerType:false,
      timer: 0,
      progress: 0,
      times: { selectedhour: '', currenthours: 0, minutes: 0, seconds: 0 },
      clientname: '',
      name: '', 
      orderedjuss: ''
    }



    this.tbodyNames.forEach((item:tbodyNames) => {
      if(rowId == item.id){
        sendObject.amountofmoneywithcash = this.amountofmoneywithcash
        sendObject.amountofmoneywithcard = this.amountofmoneywithcard
        sendObject.orderedjuss = this.orderedjuss,
        sendObject.roomsID = item.roomsID,
        sendObject.pausecontinuoe = item.pausecontinuoe,
        sendObject.ordertime = item.ordertime,
        sendObject.endtime = item.endtime,
        sendObject.ativestatus = item.ativestatus,
        sendObject.status = item.status,
        sendObject.gameTimerType = item.gameTimerType,
        sendObject.timer = item.timer,
        sendObject.progress = item.progress,
        sendObject.times.selectedhour = item.times.selectedhour,
        sendObject.times.currenthours = item.times.currenthours,
        sendObject.times.minutes = item.times.minutes,
        sendObject.times.seconds = item.times.seconds,
        sendObject.clientname = item.clientname,
        sendObject.name = item.name,
        sendObject.orderedjuss = this.orderedjuss
      }
    })

    this.computerRoomsService.putcomputerRooms(rowId, sendObject).subscribe({  
      next : (res) => console.log('responese', res),
      error: (e) => console.error(e),
      complete: () => { closebutton?.click(),
        this.getcomputerRooms() }})
  }

  public amount:number = 0
  public amountWithCard:number = 0
  public amountWithCash:number = 0
  public getDayInfo():void{
    this.amount = 0
    this.amountWithCard = 0
    this.amountWithCash = 0

    this.amount = this.tbodyNames.reduce((accumulator, currentValue:tbodyNames) => 
        (accumulator + Number(currentValue.amountofmoneywithcard) + Number(currentValue.amountofmoneywithcash)), this.amount)

    this.amountWithCard = this.tbodyNames.reduce((accumulator, currentValue:tbodyNames) => 
        (accumulator + Number(currentValue.amountofmoneywithcard)), this.amountWithCard)

    this.amountWithCash = this.tbodyNames.reduce((accumulator, currentValue:tbodyNames) => 
        (accumulator + Number(currentValue.amountofmoneywithcash) ), this.amountWithCash)
  }

  public dayOff():void{
    this.authService.logout()
  }

  private getCurrentDate():string{
    let parseDate:any
    let pipe = new DatePipe('en-US');
    let today = new Date();
    let ChangedFormat = pipe.transform(today, 'MMM d, y');
    parseDate = ChangedFormat
    
    return parseDate
  }
}
