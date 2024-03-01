import { Component } from '@angular/core';
import { ComputerRoomsService } from '../service/computer-rooms.service';
import { tbodyNames } from '../model';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.scss'
})
export class StatisticComponent {
  private selectedRow:any
  
  public theadNames:string[] = ['#', 'ოთხი', 'ოთახის სტატუსი', 'შეკვეთის თარიღი', 'დასრულების თარიღი', 'კლიენტის სახელი', 'გადახდის მეთოდი',
  'თანხა ჯამში','შეკვეთები', '' ]
  public tbodyNames: any[] = []

  constructor(
    private computerRoomsService: ComputerRoomsService
  ){}

  ngOnInit() {
    this.getcomputerRooms()
  }

  public getcomputerRooms():void{
    this.computerRoomsService.getcomputerRooms().subscribe( response => {
      

      response.map((item:tbodyNames) => {
        this.tbodyNames.push(item)
      })

      // console.log('getcomputerRooms',this.tbodyNames)
    })
  }

  public selectedItem(item:any){
    this.selectedRow = item
    console.log('pay!!!', item)
  }

  public pay():void{
    console.log('pay!!!')
  }
}
