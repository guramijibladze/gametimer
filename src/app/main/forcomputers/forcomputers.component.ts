import { Component, OnDestroy, OnInit } from '@angular/core';
import { ComputersRooms, roomsReservation } from '../model';
import { ComputerRoomsService } from '../service/computer-rooms.service';
import { DatePipe } from '@angular/common';
import { GrowlService } from '../../service/auth/growl.service';

type TimerRoomKind = 'computer' | 'wheel';

interface PersistedRoomState {
  roomKind: TimerRoomKind;
  room: Omit<ComputersRooms, 'timer' | 'timersIdArr'>;
}

interface PersistedTimerSnapshot {
  savedAt: number;
  rooms: PersistedRoomState[];
}

@Component({
  selector: 'app-forcomputers',
  templateUrl: './forcomputers.component.html',
  styleUrl: './forcomputers.component.scss',
})
export class ForcomputersComponent implements OnInit, OnDestroy {
  isOpen = true;
  public hours:number = 0
  public minutes:any = 0
  public clientName = '';
  public startcontinue:boolean = true
  public orderedjuss:string = ''
  public infoUpdateButton:boolean = false
  public checkbox:boolean = false
  public selectedArr:any[] = []
  public moneyForRoomsCash:number = 0
  public moneyForRoomsCard:number = 0
  public moneyForSnacksCash:number = 0
  public moneyForSnacksCard:number = 0
  public reservationModalIsHidden:boolean = false
  public selectedComputerRoom:any 
  public currentTimerCheckbox:boolean = false

  //ჯავშნები
  public reservationPersonName:string = ''
  public reservationPersonPhoneNumber:string = ''
  public reservationTime:string = ''
  public reservationText:string = ''
  public selectedReservationRoom = ''

  //ფიტპასი
  public fitpass = 0
  // //დაჯავშნილის ცვლილება
  // public clickReservationInfo:boolean = false

  timer: any
  conicgradient:any
  conicgradientPercent:number = 0
 
  private computerroomsID:number = 0
  private reservationID:number = 0
  private updateRoomsID:number = 0
  private readonly timerStorageKey = 'gametimer.activeRooms.v1'
  private modalScrollPosition = 0
  private modalScrollAnchor:HTMLElement | null = null
  private modalScrollAnchorTop = 0
  private bodyScrollStyles: { position: string; top: string; width: string } | null = null

  constructor(
    private computerRoomsService: ComputerRoomsService,
    private notificationService:GrowlService
  ){}

  ngOnInit() {
    this.restoreActiveTimers()
    this.getCurrentDate();
  }

  ngOnDestroy():void {
    this.unlockPageScroll();
    [...this.computersArrr, ...this.rommsWithWell].forEach(room => {
      if (room.timer) clearInterval(room.timer)
    })
  }

  public theadNames:string[] = ['პიროვნება', 'ტელეფონი', 'დრო', 'ტექსტი', '' ]
  public tbodyNames: roomsReservation[] = []

  computersArrr:ComputersRooms[] = [
    { 
      roomsID:1, 
      clientname: '',
      name: 'ოთახი N1', 
      startButton: false,
      pausecontinuoe:false, 
      roomsReservation:false,
      ordertime: '',
      openDayTime:'',
      endtime: '',
      times: { selectedhour: '', currenthours: 0, minutes: 0, seconds: 0 },
      ativestatus:true,
      fitpassQuantity: 0,
      moneyForRooms:{cash: 0, card: 0},
      moneyForSnacks:{cash: 0, card: 0},
      status:'vip',
      gameTimerType:false,
      orderedjuss: '',
      timer: 0,
      timersIdArr: [],
      progress: 0,
      televiziontRoom:true
    },
    { roomsID:2, clientname: '', name: 'ოთახი N2', startButton: false, pausecontinuoe:false, roomsReservation:false, ordertime: '', openDayTime:'', endtime: '',
      times: { selectedhour: '', currenthours: 0, minutes: 0, seconds: 0 }, 
      ativestatus:true,
      fitpassQuantity: 0,
      moneyForRooms:{cash: 0, card: 0},
      moneyForSnacks:{cash: 0, card: 0},
      status:'vip', gameTimerType:false, orderedjuss: '', timer: 0, timersIdArr: [],
      progress: 0},
    { roomsID:3, clientname: '', name: 'ოთახი N3', startButton: false, pausecontinuoe:false, roomsReservation:false, ordertime: '',openDayTime:'', endtime: '',
      times: { selectedhour: '', currenthours: 0, minutes: 0, seconds: 0 }, ativestatus:true, fitpassQuantity: 0, moneyForRooms:{cash: 0, card: 0},
      moneyForSnacks:{cash: 0, card: 0}, status:'vip', gameTimerType:false, orderedjuss: '', timer: 0, timersIdArr: [],
      progress: 0},
    { roomsID:4, clientname: '', name: 'ოთახი N4', startButton: false, pausecontinuoe:false, roomsReservation:false, ordertime: '',openDayTime:'', endtime: '',
      times: { selectedhour: '', currenthours: 0, minutes: 0, seconds: 0 }, ativestatus:true, fitpassQuantity: 0, moneyForRooms:{cash: 0, card: 0},
      moneyForSnacks:{cash: 0, card: 0}, status:'vip', gameTimerType:false, orderedjuss: '', timer: 0, timersIdArr: [],
      progress: 0},
    { roomsID:5, clientname: '', name: 'ოთახი N5', startButton: false, pausecontinuoe:false, roomsReservation:false, ordertime: '',openDayTime:'', endtime: '',
      times: { selectedhour: '', currenthours: 0, minutes: 0, seconds: 0 }, ativestatus:true, fitpassQuantity: 0, moneyForRooms:{cash: 0, card: 0},
      moneyForSnacks:{cash: 0, card: 0}, status:'vip', gameTimerType:false, orderedjuss: '', timer: 0, timersIdArr: [],
      progress: 0,
      televiziontRoom:true},
    { roomsID:6, clientname: '', name: 'ოთახი N6', startButton: false, pausecontinuoe:false, roomsReservation:false, ordertime: '', openDayTime:'',endtime: '',
      times: { selectedhour: '', currenthours: 0, minutes: 0, seconds: 0 }, ativestatus:true, fitpassQuantity: 0, moneyForRooms:{cash: 0, card: 0},
      moneyForSnacks:{cash: 0, card: 0}, status:'vip', gameTimerType:false, orderedjuss: '', timer: 0, timersIdArr: [],
      progress: 0,
      televiziontRoom:true},
      { roomsID:7, clientname: '', name: 'ოთახი N7', startButton: false, pausecontinuoe:false, roomsReservation:false, ordertime: '', openDayTime:'',endtime: '',
      times: { selectedhour: '', currenthours: 0, minutes: 0, seconds: 0 }, ativestatus:true, fitpassQuantity: 0, moneyForRooms:{cash: 0, card: 0},
      moneyForSnacks:{cash: 0, card: 0}, status:'vip', gameTimerType:false, orderedjuss: '', timer: 0, timersIdArr: [],
      progress: 0},
      { roomsID:8, clientname: '', name: 'ოთახი N8', startButton: false, pausecontinuoe:false, roomsReservation:false, ordertime: '', openDayTime:'',endtime: '',
      times: { selectedhour: '', currenthours: 0, minutes: 0, seconds: 0 }, ativestatus:true, fitpassQuantity: 0, moneyForRooms:{cash: 0, card: 0},
      moneyForSnacks:{cash: 0, card: 0}, status:'vip', gameTimerType:false, orderedjuss: '', timer: 0, timersIdArr: [],
      progress: 0},
      { roomsID:9, clientname: '', name: 'ოთახი N10', startButton: false, pausecontinuoe:false, roomsReservation:false, ordertime: '', openDayTime:'',endtime: '',
      times: { selectedhour: '', currenthours: 0, minutes: 0, seconds: 0 }, ativestatus:true, fitpassQuantity: 0, moneyForRooms:{cash: 0, card: 0},
      moneyForSnacks:{cash: 0, card: 0}, status:'vip', gameTimerType:false, orderedjuss: '', timer: 0, timersIdArr: [],
      progress: 0,
      televiziontRoom:true}
  ]

  rommsWithWell:ComputersRooms[] = [
    { roomsID:1, clientname: '', roomsType:'steeringWeel', name: 'საჭე N1', startButton: false, pausecontinuoe:false, roomsReservation:false, ordertime: '', openDayTime:'',endtime: '',
      times: { selectedhour: '', currenthours: 0, minutes: 0, seconds: 0 }, ativestatus:true, fitpassQuantity: 0, moneyForRooms:{cash: 0, card: 0},
      moneyForSnacks:{cash: 0, card: 0}, status:'vip', gameTimerType:false, orderedjuss: '', timer: 0, timersIdArr: [],
      progress: 0},
    { roomsID:2, clientname: '',roomsType:'steeringWeel', name: 'საჭე N2', startButton: false, pausecontinuoe:false, roomsReservation:false, ordertime: '', openDayTime:'',endtime: '',
      times: { selectedhour: '', currenthours: 0, minutes: 0, seconds: 0 }, ativestatus:true, fitpassQuantity: 0, moneyForRooms:{cash: 0, card: 0},
      moneyForSnacks:{cash: 0, card: 0}, status:'vip', gameTimerType:false, orderedjuss: '', timer: 0, timersIdArr: [],
      progress: 0},
    { roomsID:3, clientname: '', roomsType:'steeringWeel', name: 'საჭე N3', startButton: false, pausecontinuoe:false, roomsReservation:false, ordertime: '', openDayTime:'',endtime: '',
      times: { selectedhour: '', currenthours: 0, minutes: 0, seconds: 0 }, ativestatus:true, fitpassQuantity: 0, moneyForRooms:{cash: 0, card: 0},
      moneyForSnacks:{cash: 0, card: 0}, status:'vip', gameTimerType:false, orderedjuss: '', timer: 0, timersIdArr: [],
      progress: 0},
    { roomsID:4, clientname: '',roomsType:'steeringWeel', name: 'საჭე N4', startButton: false, pausecontinuoe:false, roomsReservation:false, ordertime: '', openDayTime:'',endtime: '',
      times: { selectedhour: '', currenthours: 0, minutes: 0, seconds: 0 }, ativestatus:true, fitpassQuantity: 0, moneyForRooms:{cash: 0, card: 0},
      moneyForSnacks:{cash: 0, card: 0}, status:'vip', gameTimerType:false, orderedjuss: '', timer: 0, timersIdArr: [],
      progress: 0},
    { roomsID:5, clientname: '', roomsType:'steeringWeel',  name: 'მეტა ქვესტი', startButton: false, pausecontinuoe:false, roomsReservation:false, ordertime: '', openDayTime:'',endtime: '',
      times: { selectedhour: '', currenthours: 0, minutes: 0, seconds: 0 }, ativestatus:true, fitpassQuantity: 0, moneyForRooms:{cash: 0, card: 0},
      moneyForSnacks:{cash: 0, card: 0}, status:'vip', gameTimerType:false, orderedjuss: '', timer: 0, timersIdArr: [],
      progress: 0}
  ]


  //მონიშნული ობიექტის აიდი
  roomsType:ComputersRooms[] = []
  public startTime(roomsID:number, computerRoom:any, event?:Event):void{
    this.rememberModalScrollPosition(event)
    this.computerroomsID = roomsID
    this.selectedComputerRoom = computerRoom
    this.roomsType = computerRoom.roomsType == 'steeringWeel' ? this.rommsWithWell : this.computersArrr

    if(this.roomsType[roomsID-1]?.ordertime){
      this.startcontinue = false
    }
  }

  public updateinfo(computerRoom:ComputersRooms, event?:Event):void{
    this.rememberModalScrollPosition(event)
    this.startcontinue = false
    this.infoUpdateButton = true
    this.updateRoomsID = computerRoom.roomsID
    this.computerroomsID = computerRoom.roomsID
    this.selectedComputerRoom = computerRoom
    this.roomsType = computerRoom.roomsType === 'steeringWeel' ? this.rommsWithWell : this.computersArrr
    this.checkbox = true
    this.currentTimerCheckbox = computerRoom.gameTimerType
    this.fitpass = computerRoom.fitpassQuantity
    this.clientName = computerRoom.clientname
    this.moneyForRoomsCash = computerRoom.moneyForRooms.cash
    this.moneyForRoomsCard = computerRoom.moneyForRooms.card
    this.moneyForSnacksCash = computerRoom.moneyForSnacks.cash
    this.moneyForSnacksCard = computerRoom.moneyForSnacks.card
    this.orderedjuss = computerRoom.orderedjuss
  }

  public lockPageScroll():void {
    if (this.bodyScrollStyles) return

    const body = document.body
    this.bodyScrollStyles = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    }
    body.style.position = 'fixed'
    body.style.top = `-${this.modalScrollPosition}px`
    body.style.width = '100%'
  }

  public unlockPageScroll():void {
    if (!this.bodyScrollStyles) return

    const body = document.body
    body.style.position = this.bodyScrollStyles.position
    body.style.top = this.bodyScrollStyles.top
    body.style.width = this.bodyScrollStyles.width
    this.bodyScrollStyles = null
    this.restorePageScroll()
  }

  private restorePageScroll(attempt = 0):void {
    requestAnimationFrame(() => {
      const anchor = this.modalScrollAnchor
      if (anchor?.isConnected) {
        const scrollDelta = anchor.getBoundingClientRect().top - this.modalScrollAnchorTop
        if (Math.abs(scrollDelta) > 1) window.scrollTo(0, window.scrollY + scrollDelta)
      } else {
        window.scrollTo(0, this.modalScrollPosition)
      }

      if (attempt < 5) {
        this.restorePageScroll(attempt + 1)
      } else {
        this.modalScrollAnchor = null
      }
    })
  }

  private rememberModalScrollPosition(event?:Event):void {
    this.modalScrollPosition = window.scrollY
    this.modalScrollAnchor = event?.currentTarget instanceof HTMLElement ? event.currentTarget : null
    this.modalScrollAnchorTop = this.modalScrollAnchor?.getBoundingClientRect().top ?? 0
  }

  public update():void{
    const room = this.roomsType.find(item => item.roomsID === this.updateRoomsID)
    if (room) {
      room.fitpassQuantity = this.fitpass
      room.clientname = this.clientName
      room.moneyForRooms.cash = this.moneyForRoomsCash
      room.moneyForRooms.card = this.moneyForRoomsCard
      room.moneyForSnacks.cash = this.moneyForSnacksCash
      room.moneyForSnacks.card = this.moneyForSnacksCard
      room.orderedjuss = this.orderedjuss
    }

    this.mdoalclose()
    this.persistActiveTimers()
  }

  public saveTime(str?:string):void{
    let progress = 0
    this.infoUpdateButton = false

    if(str =='save' || str == 'refresh'){
      // საათის და წუთების ჩამატება
      this.roomsType.forEach((item, index) => {
        if(item.roomsID == this.computerroomsID){
          
          //საათების და წუთების არჩევის ლოგიკა
          if(str == "save"){
            if(this.hours != 0 && this.minutes == 0 ){     
              item.times.selectedhour = this.hours + ':' + this.minutes
              item.times.currenthours = this.hours- 1;
              item.times.minutes = 59;
              item.times.seconds = 59;
              item.clientname = this.clientName
              item.ativestatus = false
              item.fitpassQuantity = this.fitpass
              item.moneyForRooms.cash = this.moneyForRoomsCash
              item.moneyForRooms.card = this.moneyForRoomsCard
              item.moneyForSnacks.cash = this.moneyForSnacksCash
              item.moneyForSnacks.card = this.moneyForSnacksCard
              item.openDayTime = localStorage.getItem('openDayTime')
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
              item.fitpassQuantity = this.fitpass
              item.moneyForRooms.cash = this.moneyForRoomsCash
              item.moneyForRooms.card = this.moneyForRoomsCard
              item.moneyForSnacks.cash = this.moneyForSnacksCash
              item.moneyForSnacks.card = this.moneyForSnacksCard
              item.openDayTime = localStorage.getItem('openDayTime')
              item.ordertime = this.getCurrentDate()
              progress = this.getAllTimersInSeconds()
            }else if(item.gameTimerType == true){
              item.clientname = this.clientName
              item.ativestatus = false
              item.fitpassQuantity = this.fitpass
              item.moneyForRooms.cash = this.moneyForRoomsCash
              item.moneyForRooms.card = this.moneyForRoomsCard
              item.moneyForSnacks.cash = this.moneyForSnacksCash
              item.moneyForSnacks.card = this.moneyForSnacksCard
              item.openDayTime = localStorage.getItem('openDayTime')
              item.orderedjuss = this.orderedjuss
              item.ordertime = this.getCurrentDate()
            }else if(this.hours == 0 && this.minutes == 0 && item.gameTimerType == false && item.ativestatus){
              let message = 'დრო არ აგირჩევია ბაჭყატ!!!'
              this.notificationService.showErrorAnimation(message)
              this.mdoalclose()
              return
            }
          }

          if (item.timer) {
            clearInterval(item.timer);
          }
          this.resetModalParameters()
          if (str === 'refresh' && !item.gameTimerType) {
            const remainingSeconds = item.times.currenthours * 3600 + item.times.minutes * 60 + item.times.seconds
            progress = remainingSeconds > 0 ? (100 - item.progress) / remainingSeconds : 0
          }
          //ტაიმერი და მიმდინარე დრო
          if(item.gameTimerType == true){

            item.timer = setInterval(() => {
              item.times.seconds++

              if(item.times.minutes == 59 && item.times.seconds == 59){
                item.times.currenthours++
                item.times.minutes = 0
                item.times.seconds = 0
              }

              if(item.times.seconds == 60){
                item.times.minutes += 1
                item.times.seconds = 0
              }

              this.persistActiveTimers()
            }, 1000)
            item.timersIdArr.push(item.timer)
            this.checkRoomsArrIdsAndNotifi()
          }else{

            item.timer = setInterval(() => {
              item.times.seconds--;
              item.progress += progress;
              // console.log('progress',item.progress)
              //დროის ამოწურვა
              if (item.times.seconds == 0 && item.times.minutes == 0 && item.times.currenthours == 0) {
                this.endTime(item, item.timer);
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

              this.persistActiveTimers()
            }, 1000)
            item.timersIdArr.push(item.timer)
            this.checkRoomsArrIdsAndNotifi()
          }
        }
    
      })
      this.persistActiveTimers()
    }
  }


  //დასრულების ივენთი
  public cancelTime(computerRoom:ComputersRooms, timer:number):void{
    clearInterval(timer) 

    if(computerRoom.ativestatus){
      return
    }

    let endTime = this.getCurrentDate()

    computerRoom.endtime = endTime
    this.computerRoomsService.postTimer({...computerRoom}).subscribe({
      next : (res) => {
        let successMessage = 'შეკვეთა ჩაიწერა წარმატებით'
        this.notificationService.showSuccessAnimation(successMessage)
      },
      error: (e) => {
        let successMessage = 'არ ჩეიწერა წარმატებით'
        this.notificationService.showErrorAnimation(successMessage)
      },
      complete: () => {}
    })

    this.resetModalParameters(computerRoom)
    
  }

  //გადაყავს მიმდინარე დროზე
  public changametimertype():any{

    this.roomsType.forEach((item) => {
      if(item.roomsID == this.computerroomsID){
        item.gameTimerType = !item.gameTimerType
        item.gameTimerType ? this.infoUpdateButton = true : this.infoUpdateButton = false
      }
    })

  }


  //დროის ამოწურვა
  private endTime(room:ComputersRooms, timer:number):void{
    this.infoUpdateButton = false
    let endTime = this.getCurrentDate()
    room.endtime = endTime
    this.startcontinue = true
  
    clearInterval(timer)
    this.persistActiveTimers()

  }


  
  private getCurrentDate():any{
    let parseDate:any
    let pipe = new DatePipe('en-US');
    let today = new Date();
    let ChangedFormat = pipe.transform(today, 'MMM d, y, h:mm:ss a');
    parseDate = ChangedFormat
    
    return parseDate
  }

    //დროის დამატება ოთახზე
    public addContinuetime():void{

      if(!this.hours && !this.minutes){
        let message = 'არც დრო შეგიყვანია არც წუთები და დამატებას აჭერ დახურვის მაგივრად'
        this.notificationService.showErrorAnimation(message)
        this.mdoalclose()
        return
      }
    
      this.startcontinue = false
      clearInterval(this.roomsType[this.computerroomsID-1].timer)
      let progress = 0
      if(this.hours || this.minutes ){

          //საათების და წუთების დამატების ლოგიკა
          this.roomsType.forEach((item) => {
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

              clearInterval(item.timer)
              this.minutes = 0
              this.hours = 0
              this.startcontinue = true
              item.timer = 0

              item.timer = setInterval(() => {
                item.times.seconds--;
                item.progress += progress;
                
                //დროის ამოწურვა
                if (item.times.seconds == 0 && item.times.minutes == 0 && item.times.currenthours == 0) {
                  this.endTime(item, item.timer);
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

                this.persistActiveTimers()
              }, 1000)
              item.timersIdArr = item.timersIdArr.filter((id, index) => index == 1)
              item.timersIdArr.push(item.timer)
              this.checkRoomsArrIdsAndNotifi()
              this.persistActiveTimers()
            }

          })
    }
  }

  public mdoalclose(){

    if(this.selectedComputerRoom && this.selectedComputerRoom.ativestatus){
      this.roomsType[this.computerroomsID - 1].gameTimerType = false
    }

    this.infoUpdateButton = false
    this.checkbox = false
    this.startcontinue = true
    this.fitpass = 0

    this.moneyForRoomsCash = 0
    this.moneyForRoomsCard = 0
    this.moneyForSnacksCash = 0
    this.moneyForSnacksCard = 0
    this.minutes = 0
    this.hours = 0
    this.clientName = ''
    this.orderedjuss = ''
    this.currentTimerCheckbox = false
  }


  // ჯავშანი
  public selectedReservationRoomsID(id:number, comuterRooms:any){
    this.reservationID = id
    this.selectedReservationRoom = comuterRooms.name
    this.showReservation(id)
  }

  public addaReservation():void{

    if(!this.reservationTime){
      let message = 'დრო არ აგირჩევია ბაჭყატ!!!'
      this.notificationService.showErrorAnimation(message)
      return
    }

    const reservationInfo = {
      roomsID: this.reservationID,
      person: this.reservationPersonName,
      tel: this.reservationPersonPhoneNumber,
      time: this.reservationTime,
      text: this.reservationText
    }

    this.computerRoomsService.addReservation(reservationInfo).subscribe({
      next : (res) => {

        this.roomsType.forEach((item) => {
          if(this.reservationID == item.roomsID){
            item.roomsReservation = true
          }
        })

        this.showReservation(reservationInfo.roomsID)
      },
      error: (e) => console.error(e),
    })

  }


  public deleteReservedItem(item:any):void{

    this.computerRoomsService.deleteReservation(item.id).subscribe({
      next : (res) => {
        this.showReservation(this.reservationID)

      },
      error: (e) => console.error(e),
      complete: () => {
      }
    })
  }


    //გადაყავს დრო წამებში
    private getAllTimersInSeconds(str?:string):number{
      if(str){
        let progress = 0
         this.computersArrr.map((item:any) => {
          if(item.roomsID == this.computerroomsID) {
            
            item.times.progress = 0
            // console.log('getAllTimersInSeconds', item)
            progress = (1 / (item.times.currenthours * 3600 + item.times.minutes * 60) * 100)
          }
        })
        return progress
      }else{
        // console.log(1 / (this.hours * 3600 + this.minutes * 60) * 100)
        return (1 / (this.hours * 3600 + this.minutes * 60) * 100) 
      }
      
    }
  

    private resetModalParameters(computerRoom?:ComputersRooms):void{
      if(computerRoom){
        computerRoom.times.currenthours = 0
        computerRoom.times.minutes = 0
        computerRoom.times.seconds = 0
        computerRoom.startButton = false
        computerRoom.progress = 0
        computerRoom.times.selectedhour = ''
        computerRoom.ordertime = ''
        computerRoom.ativestatus = true
        computerRoom.clientname = ''
        computerRoom.gameTimerType = false
        computerRoom.timersIdArr = []
      }

      this.infoUpdateButton = false
      this.fitpass = 0
      this.moneyForRoomsCash = 0
      this.moneyForRoomsCard = 0
      this.moneyForSnacksCash = 0
      this.moneyForSnacksCard = 0
      this.minutes = 0
      this.hours = 0
      this.clientName = ''
      this.orderedjuss = ''
      this.startcontinue = true
      this.checkbox = false
      this.currentTimerCheckbox = false

      if (computerRoom) {
        this.persistActiveTimers()
      }
      
    }

    private showReservation(roomsID:number):void{

      this.reservationPersonName = ''
      this.reservationPersonPhoneNumber = ''
      this.reservationTime = ''
      this.reservationText = ''
      this.tbodyNames = []

      this.computerRoomsService.getreservations().subscribe({
        next : (res) => {

          res.forEach((item:roomsReservation) => {
            if(roomsID == item.roomsID){
              this.tbodyNames.push(item)
            }
          })

          //ცვლის ჯავშნის სტატუსს
          if(this.tbodyNames.length == 0){
            this.computersArrr[roomsID-1].roomsReservation = false
          }else{
            this.computersArrr[roomsID-1].roomsReservation = true
          }
        },
        error: (e) => console.error(e),
        complete: () => {
          // console.log('complete')
        }
      })
    }

    private checkRoomsArrIdsAndNotifi():void{

      this.computersArrr.forEach(room => {
        if(room.timersIdArr.length > 1){
          let roomsName = room.name
          let message = `${roomsName}-ზე ხარვეზია, სავარაუდოდ დროს არასწორად ითვლის!!!`
          this.notificationService.showErrorAnimation(message)
        }
      })

    }

    private persistActiveTimers():void {
      const rooms:PersistedRoomState[] = []
      const allRooms = [
        ...this.computersArrr.map(room => ({ room, roomKind: 'computer' as const })),
        ...this.rommsWithWell.map(room => ({ room, roomKind: 'wheel' as const })),
      ]

      allRooms.forEach(({ room, roomKind }) => {
        if (room.ativestatus || !room.ordertime) return

        const savedRoom:Partial<ComputersRooms> = { ...room }
        delete savedRoom.timer
        delete savedRoom.timersIdArr
        rooms.push({ roomKind, room: savedRoom as Omit<ComputersRooms, 'timer' | 'timersIdArr'> })
      })

      const snapshot:PersistedTimerSnapshot = { savedAt: Date.now(), rooms }
      localStorage.setItem(this.timerStorageKey, JSON.stringify(snapshot))
    }

    private restoreActiveTimers():void {
      const stored = localStorage.getItem(this.timerStorageKey)
      if (!stored) return

      try {
        const snapshot = JSON.parse(stored) as PersistedTimerSnapshot
        const elapsedSeconds = Math.max(0, Math.floor((Date.now() - snapshot.savedAt) / 1000))

        snapshot.rooms.forEach(({ roomKind, room: savedRoom }) => {
          const rooms = roomKind === 'wheel' ? this.rommsWithWell : this.computersArrr
          const room = rooms.find(item => item.roomsID === savedRoom.roomsID)
          if (!room) return

          Object.assign(room, savedRoom)
          room.timer = 0
          room.timersIdArr = []

          const currentSeconds = room.times.currenthours * 3600 + room.times.minutes * 60 + room.times.seconds
          if (!room.gameTimerType && currentSeconds > 0 && elapsedSeconds > 0) {
            room.progress = Math.min(100, room.progress + ((100 - room.progress) / currentSeconds) * elapsedSeconds)
          }
          const adjustedSeconds = room.gameTimerType
            ? currentSeconds + elapsedSeconds
            : Math.max(0, currentSeconds - elapsedSeconds)
          room.times.currenthours = Math.floor(adjustedSeconds / 3600)
          room.times.minutes = Math.floor((adjustedSeconds % 3600) / 60)
          room.times.seconds = adjustedSeconds % 60

          if (!room.gameTimerType && adjustedSeconds === 0) {
            room.endtime = room.endtime || this.getCurrentDate()
            return
          }

          this.roomsType = rooms
          this.computerroomsID = room.roomsID
          this.saveTime('refresh')
        })
        this.persistActiveTimers()
      } catch {
        localStorage.removeItem(this.timerStorageKey)
      }
    }
}

