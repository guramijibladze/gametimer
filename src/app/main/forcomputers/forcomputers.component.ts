import { Component, DoCheck, OnInit } from '@angular/core';
import { ComputersRooms, roomsReservation } from '../model';
import { ComputerRoomsService } from '../service/computer-rooms.service';
import { DatePipe } from '@angular/common';
import { GrowlService } from '../../service/auth/growl.service';

@Component({
  selector: 'app-forcomputers',
  templateUrl: './forcomputers.component.html',
  styleUrl: './forcomputers.component.scss',
  // animations: [
  //   trigger('openClose', [
  //     state('true', style({ height: '*' })),
  //     state('false', style({ height: '0px' })),
  //     transition('false <=> true', [ animate(500) ])
  //   ])
  // ]
})
export class ForcomputersComponent implements OnInit {
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

  // //დაჯავშნილის ცვლილება
  // public clickReservationInfo:boolean = false

  timer: any
  conicgradient:any
  conicgradientPercent:number = 0
 
  private computerroomsID:number = 0
  private reservationID:number = 0
  private updateRoomsID:number = 0

  constructor(
    private computerRoomsService: ComputerRoomsService,
    // private sharingService: SharingService,
    private notificationService:GrowlService
  ){}

  ngOnInit() {
    this.getCurrentDate()
    // localStorage.setItem('reservationArr', JSON.stringify(this.reservationArr))
    // document.addEventListener('visibilitychange', this.visible.bind(this))
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
      moneyForRooms:{cash: 0, card: 0},
      moneyForSnacks:{cash: 0, card: 0},
      status:'vip',
      gameTimerType:false,
      orderedjuss: '',
      timer: 0,
      progress: 0
    },
    { roomsID:2, clientname: '', name: 'ოთახი N2', startButton: false, pausecontinuoe:false, roomsReservation:false, ordertime: '', openDayTime:'', endtime: '',
      times: { selectedhour: '', currenthours: 0, minutes: 0, seconds: 0 }, 
      ativestatus:true,
      moneyForRooms:{cash: 0, card: 0},
      moneyForSnacks:{cash: 0, card: 0},
      status:'vip', gameTimerType:false, orderedjuss: '', timer: 0,
      progress: 0},
    { roomsID:3, clientname: '', name: 'ოთახი N3', startButton: false, pausecontinuoe:false, roomsReservation:false, ordertime: '',openDayTime:'', endtime: '',
      times: { selectedhour: '', currenthours: 0, minutes: 0, seconds: 0 }, ativestatus:true, moneyForRooms:{cash: 0, card: 0},
      moneyForSnacks:{cash: 0, card: 0}, status:'vip', gameTimerType:false, orderedjuss: '', timer: 0,
      progress: 0},
    { roomsID:4, clientname: '', name: 'ოთახი N4', startButton: false, pausecontinuoe:false, roomsReservation:false, ordertime: '',openDayTime:'', endtime: '',
      times: { selectedhour: '', currenthours: 0, minutes: 0, seconds: 0 }, ativestatus:true, moneyForRooms:{cash: 0, card: 0},
      moneyForSnacks:{cash: 0, card: 0}, status:'vip', gameTimerType:false, orderedjuss: '', timer: 0,
      progress: 0},
    { roomsID:5, clientname: '', name: 'ოთახი N5', startButton: false, pausecontinuoe:false, roomsReservation:false, ordertime: '',openDayTime:'', endtime: '',
      times: { selectedhour: '', currenthours: 0, minutes: 0, seconds: 0 }, ativestatus:true, moneyForRooms:{cash: 0, card: 0},
      moneyForSnacks:{cash: 0, card: 0}, status:'vip', gameTimerType:false, orderedjuss: '', timer: 0,
    progress: 0},
    { roomsID:6, clientname: '', name: 'ოთახი N6', startButton: false, pausecontinuoe:false, roomsReservation:false, ordertime: '', openDayTime:'',endtime: '',
      times: { selectedhour: '', currenthours: 0, minutes: 0, seconds: 0 }, ativestatus:true, moneyForRooms:{cash: 0, card: 0},
      moneyForSnacks:{cash: 0, card: 0}, status:'vip', gameTimerType:false, orderedjuss: '', timer: 0,
      progress: 0},
      { roomsID:7, clientname: '', name: 'ოთახი N7', startButton: false, pausecontinuoe:false, roomsReservation:false, ordertime: '', openDayTime:'',endtime: '',
      times: { selectedhour: '', currenthours: 0, minutes: 0, seconds: 0 }, ativestatus:true, moneyForRooms:{cash: 0, card: 0},
      moneyForSnacks:{cash: 0, card: 0}, status:'vip', gameTimerType:false, orderedjuss: '', timer: 0,
      progress: 0},
      { roomsID:8, clientname: '', name: 'ოთახი N8', startButton: false, pausecontinuoe:false, roomsReservation:false, ordertime: '', openDayTime:'',endtime: '',
      times: { selectedhour: '', currenthours: 0, minutes: 0, seconds: 0 }, ativestatus:true, moneyForRooms:{cash: 0, card: 0},
      moneyForSnacks:{cash: 0, card: 0}, status:'vip', gameTimerType:false, orderedjuss: '', timer: 0,
      progress: 0}
  ]


  //მონიშნული ობიექტის აიდი
  public startTime(roomsID:number, computerRoom:any):void{
    this.computerroomsID = roomsID
    this.selectedComputerRoom = computerRoom
    console.log('selectedComputerRoom',this.selectedComputerRoom)

    if( this.computersArrr[roomsID-1].ordertime){
      this.startcontinue = false
    }
  }

  public refresh(box:ComputersRooms):void{
    this.computerroomsID = box.roomsID
    let text = 'ეს ღილაკი გამოიყენე მხოლოდ მაშინ თუ ტაიმერმა გაჭედა!!!'
    if(confirm(text) == true){
      this.saveTime('refresh')
    }
    
  }

  public updateinfo(updateRoomsID:number){
    this.startcontinue = false
    this.infoUpdateButton = true
    this.updateRoomsID = updateRoomsID

    //მოდალში ანახებს ამ ოთახზე არჩეულ ინფოს
    this.computersArrr.forEach((item:ComputersRooms) => {
      if(this.updateRoomsID == item.roomsID){
        this.checkbox = true
        !item.gameTimerType ? this.currentTimerCheckbox = false : this.currentTimerCheckbox = true
        
        this.clientName = item.clientname
        this.moneyForRoomsCash = item.moneyForRooms.cash
        this.moneyForRoomsCard = item.moneyForRooms.card
        this.moneyForSnacksCash = item.moneyForSnacks.cash
        this.moneyForSnacksCard = item.moneyForSnacks.card
        this.orderedjuss = item.orderedjuss
      }
    })
  }

  public update():void{
    this.computersArrr.forEach((item:ComputersRooms) => {
      if(this.updateRoomsID == item.roomsID){
        item.clientname = this.clientName
        item.moneyForRooms.cash = this.moneyForRoomsCash
        item.moneyForRooms.card = this.moneyForRoomsCard
        item.moneyForSnacks.cash = this.moneyForSnacksCash
        item.moneyForSnacks.card = this.moneyForSnacksCard
        item.orderedjuss = this.orderedjuss
      }
    })

    this.mdoalclose()
  }

  public saveTime(str?:string):void{
    let progress = 0
    this.infoUpdateButton = false

    if(str =='save' || str == 'refresh'){
      // საათის და წუთების ჩამატება
      this.computersArrr.forEach((item, index) => {
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
              item.moneyForRooms.cash = this.moneyForRoomsCash
              item.moneyForRooms.card = this.moneyForRoomsCard
              item.moneyForSnacks.cash = this.moneyForSnacksCash
              item.moneyForSnacks.card = this.moneyForSnacksCard
              item.openDayTime = localStorage.getItem('openDayTime')
              item.orderedjuss = this.orderedjuss
              item.ordertime = this.getCurrentDate()
            }else if(this.hours == 0 && this.minutes == 0 && item.gameTimerType == false ){
              let message = 'დრო არ აგირჩევია ბაჭყატ!!!'
              this.notificationService.showErrorAnimation(message)
              this.mdoalclose()
              return
            }
          }

          this.resetModalParameters()
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

            }, 1000)
          }else{
            item.timer = setInterval(() => {
              item.times.seconds--;
              item.progress += progress;
              // console.log('progress',item.progress)
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
              // console.log(item)
            }, 1000)
            
          }
        }
      })
    }
  }


  //დასრულების ივენთი
  public cancelTime(roomsID:number, timer:number):void{
    
    if(this.computersArrr[roomsID-1].ativestatus == true){
      return
    }

    this.infoUpdateButton = false
    let endTime = this.getCurrentDate()
    this.computersArrr[roomsID-1].endtime = endTime
    this.computerRoomsService.postTimer({...this.computersArrr[roomsID-1]}).subscribe({
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

    clearInterval(timer) 
    this.resetModalParameters(roomsID)
    
  }

  //გადაყავს მიმდინარე დროზე
  public changametimertype():any{

    this.computersArrr.forEach((item) => {
      if(item.roomsID == this.computerroomsID){
        item.gameTimerType = !item.gameTimerType
        item.gameTimerType ? this.infoUpdateButton = true : this.infoUpdateButton = false
      }
    })

  }


  //დროის ამოწურვა
  private endTime(roomsID:any, timer:number):void{
    this.infoUpdateButton = false
    let endTime = this.getCurrentDate()
    this.computersArrr[roomsID-1].endtime = endTime
    // this.computersArrr[roomsID-1].ativestatus = true
    this.startcontinue = true
    // console.log('endTime!!!!!', {...this.computersArrr[roomsID-1]})

    // this.computerRoomsService.postTimer({...this.computersArrr[roomsID-1]}).subscribe({
    //   next : (res) => {
        
    //   },
    //   error: (e) => console.error(e),
    //   complete: () => {}
    // })

    clearInterval(timer)
    // this.resetModalParameters(roomsID)

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
  
              this.minutes = 0
              this.hours = 0
              this.startcontinue = true
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

    if(this.selectedComputerRoom && this.selectedComputerRoom.ativestatus){
      this.computersArrr[this.computerroomsID - 1].gameTimerType = false
    }

    this.infoUpdateButton = false
    this.checkbox = false
    this.startcontinue = true

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

        this.computersArrr.forEach((item) => {
          if(this.reservationID == item.roomsID){
            item.roomsReservation = true
          }
        })

        // // console.log(this.computersArrr[0])
        this.showReservation(reservationInfo.roomsID)
      },
      error: (e) => console.error(e),
      complete: () => {
        // console.log('complete')
      }
    })

  }


  public deleteReservedItem(item:any):void{

    this.computerRoomsService.deleteReservation(item.id).subscribe({
      next : (res) => {

        // // console.log(this.computersArrr[0])
        this.showReservation(this.reservationID)
        // this.computersArrr.forEach((item) => {
        //   if(item.)
        // })
      },
      error: (e) => console.error(e),
      complete: () => {
        // console.log('complete')
      }
    })
  }


  //ამოწმებს დროს როცა სხვა ტაბიდა ბრუნდები იგივე გვერდზე
  // private visible(){
  //   if(document.hidden){
  //     // console.log('hidden')
  //   }else{
  //     let minutes = 0
  //     let seconds = 0
      
  //     const currentDate = new Date(this.getCurrentDate()).getTime(); 

  //     this.computersArrr.forEach((item) => {
  //       let ChangedFormat = new Date(String(item.ordertime)).getTime()
  //       const differenceTime = currentDate - ChangedFormat

  //       if(!item.ativestatus){
  //         if(!item.gameTimerType){
  //           // let allDifferenceminutesInSeconds = 0
            
  //           minutes = Math.floor((differenceTime % (1000 * 60 * 60)) / (1000 * 60));
  //           seconds = Math.floor((differenceTime % (1000 * 60)) / 1000)
  //           // allDifferenceminutesInSeconds = minutes * 60;
  //           // console.log('allDifferenceminutesInSeconds', allDifferenceminutesInSeconds)
  
  //           if(minutes > 0){
  //             if(Number(item.times.selectedhour.split(":")[0]) != 0){
  //               if(Number(item.times.selectedhour.split(":")[1]) == 0){
  //                 console.log('1:00')

  //                 let progres = 0
  //                 // progres  = (allDifferenceminutesInSeconds * item.progress  ) / 100
  //                 item.times.minutes = 59 - minutes
  //                 item.times.seconds = 59 - seconds
  //                 item.progress += progres
  
  //               }else{
  //                 console.log('1:30')

  //                 if(item.times.currenthours == 0){
  //                   item.times.minutes = 88 - minutes
  //                 }else{
  //                   item.times.minutes = 29 - minutes
  //                 }
  
  //                 item.times.seconds = 60 - seconds

  //                 // item.progress = (1 / (item.times.currenthours * 3600 + item.times.minutes * 60) * 100)
  //               }
               
  //             }else{
  //               console.log('0:30')
  
  //               item.times.minutes = Number(item.times.selectedhour.split(":")[1]) - minutes
  //               item.times.seconds = 60 - seconds
  //               // item.progress = (1 / (item.times.currenthours * 3600 + item.times.minutes * 60) * 100)
  //             }
            
  //           }
  //         }else{
  //           minutes = Math.floor((differenceTime % (1000 * 60 * 60)) / (1000 * 60));
  //           seconds = Math.floor((differenceTime % (1000 * 60)) / 1000)

  //           if(minutes > 0){
  //             item.times.minutes = minutes
  //             item.times.seconds = seconds
  //           }
  //         }

  //       }
  //     })
   
  //   }
  // }


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
  

    private resetModalParameters(roomsID?:number):void{

      if(roomsID){
        this.computersArrr[roomsID-1].times.currenthours = 0
        this.computersArrr[roomsID-1].times.minutes = 0
        this.computersArrr[roomsID-1].times.seconds = 0
        this.computersArrr[roomsID-1].startButton = false
        this.computersArrr[roomsID-1].progress = 0
        this.computersArrr[roomsID-1].times.selectedhour = ''
        this.computersArrr[roomsID-1].ordertime = ''
        this.computersArrr[roomsID-1].ativestatus = true
        this.computersArrr[roomsID-1].clientname = ''
        this.computersArrr[roomsID-1].gameTimerType = false
      }

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
}

