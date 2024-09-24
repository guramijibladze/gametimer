export interface ComputersRooms{
    roomsID:number,
    clientname:string,
    name:string,
    startButton:boolean,
    roomsReservation:boolean,
    pausecontinuoe:boolean,
    ordertime:any,
    openDayTime:any,
    endtime:any,
    times:Times,
    ativestatus:boolean,
    status:string,
    gameTimerType:boolean,
    timer:any,
    progress:any,
    orderedjuss:string,
    fitpassQuantity:number,
    moneyForRooms:ForRooms,
    moneyForSnacks:Snacks,
}

export interface roomsReservation{
  roomsID:number,
  person:string,
  tel:string,
  time:string,
  text:string
}

interface ForRooms{
  cash:number,
  card:number
}

interface Snacks{
  cash:number,
  card:number
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
    fitpassQuantity:number,
    moneyForRooms:ForRooms,
    moneyForSnacks:Snacks,
    status:string,
    gameTimerType:boolean,
    timer:any,
    progress:any,
    orderedjuss:string
  }

  export interface monthIncomintData{
    id:number,
    month:string,
    incommingFromRooms:string,
    incommingFromSnecks:string,
    fitpass:number | null,
    sum:string
  }


  export interface incommingDataByMonth{
    month:string,
    year: number,
    incommingFromRooms: number,
    incommingFromSnecks: number,
    fitpass?: number, 
    sum:number
  }
