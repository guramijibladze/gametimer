import { Component, OnInit } from '@angular/core';
import { ComputerRoomsService } from '../service/computer-rooms.service';
import { incommingDataByMonth, tbodyNames } from '../model';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../service/auth/auth.service';
import { Subscription } from 'rxjs';
import { GrowlService } from '../../service/auth/growl.service';
import { OrderStatisticService } from '../service/order-statistic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.scss'
})
export class StatisticComponent implements OnInit{
  
  public moneyFromComputerRooms:number = 0
  public moneyFromSnacks:number = 0
  public amount:number = 0
  public amountWithCard:number = 0
  public amountWithCash:number = 0
  public moneyForRoomsCash:number = 0
  public moneyForRoomsCard:number = 0
  public moneyForSnacksCash:number = 0
  public moneyForSnacksCard:number = 0
  public orderedjuss = ''
  public currentDate = ''
  public fitpassQuontity = 0
  public theadNames:string[] = ['#', 'ოთხი', 'ოთახის სტატუსი', 'შეკვეთის თარიღი', 'დასრულების თარიღი', 'კლიენტის სახელი',
  'თანხა ჯამში', 'ფიტპასი', 'შეკვეთები', '' ]
  public tbodyNames: any[] = []
  public closingTimeForTheDay!:string | null
  public fitpass:number = 0
  public fitpassInMoney:number = 0

  private computerRoomsSubscription?:Subscription
  private computerRoomsDeleteSubscription?:Subscription
  private getAllDataBymonth?:Subscription
  private postAnalizedmonthlyData?:Subscription
  private selectedRow:any
  private openDayTime:any
  private allData:any[] = []

  constructor(
    private computerRoomsService: ComputerRoomsService,
    private authService: AuthService,
    private notificationService: GrowlService,
    private orderStatisticService:OrderStatisticService,
    private router: Router,
  ){}

  public getData(){
    let pipe = new DatePipe('en-US');
    let ChangedFormat = pipe.transform(this.currentDate, 'MMM d, y');
    console.log(ChangedFormat)
    this.getcomputerRooms(ChangedFormat)
    
  }

  public getcomputerRooms(ChangedFormat?:any):void{
    let pipe = new DatePipe('en-US');
    let getObject = {
      ordertime: ChangedFormat ? ChangedFormat : this.getCurrentDate()
    }

    this.tbodyNames = []
    this.computerRoomsSubscription = this.computerRoomsService.getcomputerRooms().subscribe( response => {

      response.map((item:tbodyNames) => {
        if( pipe.transform(item.openDayTime, 'MMM d, y') == pipe.transform(getObject.ordertime, 'MMM d, y') ){
            this.tbodyNames.push({
              amount: Number(item.moneyForRooms.cash) + Number(item.moneyForRooms.card) + Number(item.moneyForSnacks.cash) + Number(item.moneyForSnacks.card),
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
        this.moneyForRoomsCash = item.moneyForRooms.cash
        this.moneyForRoomsCard = item.moneyForRooms.card
        this.moneyForSnacksCash = item.moneyForSnacks.cash
        this.moneyForSnacksCard = item.moneyForSnacks.card
        this.fitpass = item.fitpassQuantity
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
      openDayTime:'',
      endtime: '',
      moneyForRooms: {
        cash: 0,
        card: 0
      },
      moneyForSnacks: {
        cash: 0,
        card: 0
      },
      ativestatus:true,
      fitpassQuantity: 0,
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
        sendObject.moneyForRooms.cash = this.moneyForRoomsCash
        sendObject.moneyForRooms.card = this.moneyForRoomsCard
        sendObject.moneyForSnacks.cash = this.moneyForSnacksCash
        sendObject.moneyForSnacks.card = this.moneyForSnacksCard
        sendObject.orderedjuss = this.orderedjuss,
        sendObject.roomsID = item.roomsID,
        sendObject.pausecontinuoe = item.pausecontinuoe,
        sendObject.ordertime = item.ordertime,
        sendObject.openDayTime = this.openDayTime,
        sendObject.endtime = item.endtime,
        sendObject.ativestatus = item.ativestatus,
        sendObject.fitpassQuantity = this.fitpass ? this.fitpass : item.fitpassQuantity,
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
      next : (res) => {
        let successMessage = 'წარმატებით განახლდა'
        this.notificationService.showSuccessAnimation(successMessage)
      },
      error: (e) => {
        let successMessage = 'განახლებისას მოხდა შეცდომა'
        this.notificationService.showSuccessAnimation(successMessage)
      },
      complete: () => { closebutton?.click(),
        this.getcomputerRooms() }})
  }

  public getDayInfo():void{
  
    this.amount = 0
    this.amountWithCard = 0
    this.amountWithCash = 0
    // this.moneyFromComputerRooms = 0
    this.closingTimeForTheDay = localStorage.getItem('openDayTime')

    this.fitpassQuontity = this.tbodyNames.reduce((accumulator:number, curentItem:tbodyNames) => accumulator + Number(curentItem.fitpassQuantity), 0)
    this.fitpassInMoney = this.fitpassQuontity * 5

    this.amount = this.tbodyNames.reduce((accumulator, currentValue:tbodyNames) => 
        (accumulator + Number(currentValue.moneyForRooms.cash) + Number(currentValue.moneyForRooms.card) + Number(currentValue.moneyForSnacks.cash) + Number(currentValue.moneyForSnacks.card)), this.amount)

    this.amountWithCard = this.tbodyNames.reduce((accumulator, currentValue:tbodyNames) => 
        (accumulator + Number(currentValue.moneyForRooms.card) + Number(currentValue.moneyForSnacks.card)), this.amountWithCard)

    this.amountWithCash = this.tbodyNames.reduce((accumulator, currentValue:tbodyNames) => 
        (accumulator + Number(currentValue.moneyForRooms.cash) + Number(currentValue.moneyForSnacks.cash)), this.amountWithCash)

    this.moneyFromComputerRooms = this.tbodyNames.reduce((accumulator, curentItem:tbodyNames) => accumulator + Number(curentItem.moneyForRooms.card)  + 
        Number(curentItem.moneyForRooms.cash), 0)

    this.moneyFromSnacks = this.tbodyNames.reduce((accumulator:number, curentItem:tbodyNames) => accumulator + Number(curentItem.moneyForSnacks.card) + 
        Number(curentItem.moneyForSnacks.cash) , 0)

    console.log(this.fitpassQuontity)
  }


  public deleteItem(item:any):void{
    let rowID = item.id
    this.computerRoomsDeleteSubscription = this.computerRoomsService.deleteItemTable(rowID).subscribe( {
      next : (res) => {
        let successMessage = 'წარმატებით წაიშალა'
        this.notificationService.showSuccessAnimation(successMessage)
        this.getcomputerRooms()
      },
      error: (e) => console.error(e),
      complete: () => {
        console.log('complete',item)
      }
    })
  
  }

  public dayOff():void{

    let ChekTime = this.chekTimeByMonth()
    console.log('getDataByMonth', ChekTime)

    if(ChekTime.trueOrFalse){
      let newArr = [];
      let incommingFromRooms = 0;
      let icommingFromSnacks = 0;
      let fitpassQuantity = 0;
      let sum = 0;

      let successMessage = 'ცოტა უნდა დმელოდო, მიმდონარებობს თვის მონაცემების გაანალიზება და შენახვა!!!'
      this.notificationService.showSuccessAnimation(successMessage)

      this.getAllDataByMonth()
      newArr = this.allData.filter((item) => {
        return item.openDayTime.includes(ChekTime.month);
      })
  
      // console.log('complete',newArr)
      // if(newArr.length > 0){
      //   newArr.forEach(item => {
      //     // this.deleteItem(item.id)
      //     this.computerRoomsDeleteSubscription = this.computerRoomsService.deleteItemTable(item.id).subscribe( {
      //       next : (res) => {
      //         // let successMessage = 'წარმატებით წაიშალა'
      //         // this.notificationService.showSuccessAnimation(successMessage)
      //         // this.getcomputerRooms()
      //       },
      //       error: (e) => console.error(e),
      //       complete: () => {
      //         console.log('complete',item)
      //       }
      //     })
      //   })
      // }
  
  //ამოწმებს მონაცემს გამართულია თუ არა
      newArr.forEach(item => {
        if(isNaN(item.moneyForSnacks.card)){
          console.log('NAN!!!!', item)
          item.moneyForSnacks.card = parseFloat(item.moneyForSnacks.card.replace(',', '.'))
        }

        if(isNaN(item.moneyForSnacks.cash)){
          console.log('NAN!!!!', item)
          item.moneyForSnacks.cash = parseFloat(item.moneyForSnacks.cash.replace(',', '.'))
        }

        if(isNaN(item.moneyForRooms.cash)){
          console.log('NAN!!!!', item)
          item.moneyForRooms.cash = parseFloat(item.moneyForRooms.cash.replace(',', '.'))
        }

        if(isNaN(item.moneyForRooms.card)){
          console.log('NAN!!!!', item)
          item.moneyForRooms.card = parseFloat(item.moneyForRooms.card.replace(',', '.'))
        }
      })

      //ამოჭრის წელს თარიღიდან
      let extractedYear = new Date(newArr[0]?.openDayTime).getFullYear();
      console.log(extractedYear)
  
      incommingFromRooms = newArr.reduce((accumulator, currentValue:tbodyNames) => 
        (accumulator + Number(currentValue.moneyForRooms.cash) + Number(currentValue.moneyForRooms.card)), 0)
  
      icommingFromSnacks = newArr.reduce((accumulator, currentValue:tbodyNames) => 
        (accumulator + Number(currentValue.moneyForSnacks.cash || 0) + Number(currentValue.moneyForSnacks.card || 0)), 0)
      console.log('icommingFromSnacks',icommingFromSnacks)

      fitpassQuantity = newArr.reduce((accumulator, currentValue:tbodyNames) => 
        (accumulator + Number(currentValue?.fitpassQuantity)), 0)
  
      
      if(isNaN(fitpassQuantity)){
        sum = incommingFromRooms + icommingFromSnacks 
      }else{
        sum = incommingFromRooms + icommingFromSnacks +  (fitpassQuantity * 5)
      }
  
      incommingFromRooms = Number(incommingFromRooms.toFixed(1)); 
      icommingFromSnacks = Number(icommingFromSnacks.toFixed(1)); 
      fitpassQuantity = Number(fitpassQuantity.toFixed(1)); 

      this.postMonthData(ChekTime.month, extractedYear, incommingFromRooms,icommingFromSnacks,fitpassQuantity, sum)

      console.log(incommingFromRooms, '/', icommingFromSnacks, '/', fitpassQuantity, '/', sum)
    }else{
      this.authService.logout()
      localStorage.removeItem('openDayTime');
    }

  }

  private postMonthData(ChekTime:string, extractedYear:number, incomRom:number, incomSnacks:number, incomFitpas:number, sum:number){

    let incommingObject:incommingDataByMonth = {
      month:ChekTime,
      year: extractedYear,
      incommingFromRooms: incomRom,
      incommingFromSnecks: incomSnacks,
      fitpass: incomFitpas, 
      sum:sum
    }
    // console.log(incommingObject)

    this.postAnalizedmonthlyData = this.orderStatisticService.postAnalizedData(incommingObject).subscribe({
      next: (res) => {
        let message = 'მონაცემები წარმატებით ჩაიწერა!!';
        this.notificationService.showSuccessAnimation(message)
      },
      error: () => {
        let message = 'მონაცემების ჩატვირთვა ვერ მოხდა!!';
        this.notificationService.showErrorAnimation(message)
      },
      complete: () => {
        // this.router.navigate(['main/order-statistic'])
        // this.authService.logout()
        // localStorage.removeItem('openDayTime');
      }
    })

  }

  private getCurrentDate():string{
    let parseDate:any
    let pipe = new DatePipe('en-US');
    let today = new Date();
    let ChangedFormat = pipe.transform(today, 'MMM d, y');
    parseDate = ChangedFormat
    
    return parseDate
  }

  private chekTimeByMonth():{trueOrFalse:boolean,month: string}{

    const monthTranslator:any = {
      'Jan': '31',
      'Feb': '28',
      'Mar': '31',
      'Apr': '30',
      'May': '31',
      'Jun': '30',
      'Jul': '31',
      'Aug': '31',
      'Sep': '30',
      'Oct': '31',
      'Nov': '30',
      'Dec': '31'
    };

    let month = this.openDayTime.split(' ')[0]
    let time = this.openDayTime.split(',')[0]
    let timeFrommonth = time.split(' ')[1]

    let trueOrFalse = false
    
    for (const property in monthTranslator) {
 
        if(property == month){
          console.log(monthTranslator[property], timeFrommonth)
          if(monthTranslator[property] == timeFrommonth){
            trueOrFalse = true
          }
        }
    }

    return {
      trueOrFalse: trueOrFalse,
      month: month
    }
  }

  private getAllDataByMonth(){
    this.computerRoomsService.allData$.subscribe({
      next: (data) => {
        this.allData = data
      }
    })
  }

  ngOnInit() {
    this.getcomputerRooms()
    this.openDayTime = localStorage.getItem('openDayTime')
  }

  ngOnDestroy() {
    this.computerRoomsSubscription ? this.computerRoomsSubscription.unsubscribe() : ''
    this.computerRoomsDeleteSubscription ? this.computerRoomsDeleteSubscription.unsubscribe() : ''
    this.getAllDataBymonth ? this.getAllDataBymonth.unsubscribe() : ''
    this.postAnalizedmonthlyData ? this.postAnalizedmonthlyData.unsubscribe() : ''
   }
}
