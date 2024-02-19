export interface ComputersRooms{
    roomsID:number,
    clientname?:string,
    name:string,
    startButton:boolean,
    pausecontinuoe:boolean,
    ordertime:any,
    endtime:any,
    times:Times,
    ativestatus:boolean,
    paywithcard:boolean,
    paywithcash:boolean,
    status:string,
    timer:any,
    progress:any
  }
  
export interface Times{
    selectedhour:string
    currenthours:number,
    minutes:number,
    seconds: number
  }