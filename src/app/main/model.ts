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
    amountofmoneywithcash:number,
    amountofmoneywithcard:number,
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

  // '#', 'ოთხი', 'შეკვეთის თარიღი', 'დასრულების თარიღი', 'კლიენტის სახელი', 'გადახდის მეთოდი', 'ოთახის სტატუსი'
  export interface tbodyNames{
    id:number,
    name:string,
    ordertime:any,
    endtime:any,
    clientname?:string,
    paywithcard:boolean,
    paywithcash:boolean,
    status:string
  }