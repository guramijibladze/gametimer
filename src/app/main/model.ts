export interface ComputersRooms{
    id:number,
    name:string,
    startButton:boolean,
    pausecontinuoe:boolean,
    times:Times,
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