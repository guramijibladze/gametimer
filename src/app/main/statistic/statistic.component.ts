import { Component } from '@angular/core';
import { ComputerRoomsService } from '../service/computer-rooms.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.scss'
})
export class StatisticComponent {

  constructor(
    private computerRoomsService: ComputerRoomsService
  ){}

  public getcomputerRooms():void{
    this.computerRoomsService.getcomputerRooms().subscribe( response => {
      console.log('getcomputerRooms',response)
    })
  }
}
