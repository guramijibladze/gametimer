import { Component } from '@angular/core';
import { ComputerRoomsService } from '../service/computer-rooms.service';
import { tbodyNames } from '../model';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.scss'
})
export class StatisticComponent {

  
  public theadNames:string[] = ['#', 'ოთხი', 'შეკვეთის თარიღი', 'დასრულების თარიღი', 'კლიენტის სახელი', 'გადახდის მეთოდი', 'ოთახის სტატუსი']
  public tbodyNames: any[] = []

  constructor(
    private computerRoomsService: ComputerRoomsService
  ){}

  public getcomputerRooms():void{
    this.computerRoomsService.getcomputerRooms().subscribe( response => {
      

      response.map((item:tbodyNames) => {
        this.tbodyNames.push(item)
      })

      // console.log('getcomputerRooms',this.tbodyNames)
    })
  }
}
