export interface ComputersRooms{
    roomsID:number,
    clientname:string,
    name:string,
    startButton:boolean,
    pausecontinuoe:boolean,
    ordertime:any,
    openDayTime:any,
    endtime:any,
    times:Times,
    ativestatus:boolean,
    amountofmoneywithcash:number,
    amountofmoneywithcard:number,
    status:string,
    gameTimerType:boolean,
    timer:any,
    progress:any,
    orderedjuss:string
  }
  
export interface Times{
    selectedhour:string
    currenthours:number,
    minutes:number,
    seconds: number
  }

  export interface tbodyNames{
    id:number,
    roomsID:number,
    clientname:string,
    name:string,
    startButton:boolean,
    pausecontinuoe:boolean,
    openDayTime:any,
    ordertime:any,
    endtime:any,
    times:Times,
    ativestatus:boolean,
    // paywithcard:boolean,
    // paywithcash:boolean,
    amountofmoneywithcash:number,
    amountofmoneywithcard:number,
    status:string,
    gameTimerType:boolean,
    timer:any,
    progress:any,
    orderedjuss:string
  }