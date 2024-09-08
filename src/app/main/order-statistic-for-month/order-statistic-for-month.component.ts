import { Component, OnInit } from '@angular/core';
import { OrderStatisticService } from '../service/order-statistic.service';
import { GrowlService } from '../../service/auth/growl.service';

@Component({
  selector: 'app-order-statistic-for-month',
  templateUrl: './order-statistic-for-month.component.html',
  styleUrl: './order-statistic-for-month.component.scss'
})
export class OrderStatisticForMonthComponent implements OnInit {

  public incommintFromMonth:any[] = [];
  public icommingSum:string = '';

  constructor(
    private orderStatisticService:OrderStatisticService,
    private notificationService:GrowlService
  ){}

  ngOnInit(): void {
    this.getOrderByMonth()
  }
  
  getOrderByMonth():void{
    this.orderStatisticService.getOrderStatisticByMonth().subscribe({
      next: (res) => {
        // let arr:any = []
        // res.data.map((item:any) => {
        //   console.log(item)
        //   if(item.month == "Apr"){
        //     item.month = "აპრილი";
        //     arr = item
        //     console.log('asdasas', item)
        //   }
        // })

        // console.log( arr)
        this.incommintFromMonth = res.data;
        this.icommingSum = res.ordersSum.toFixed(1);
       
      },
      error: (e) => {
        let message = 'მონაცემების ჩატვირთვა ვერ მოხდა!!';
        this.notificationService.showErrorAnimation(message)
      },
      complete: () => {
        let successMessage = 'მონაცემები წარმატებით ჩაიტვირთა!!';
        this.notificationService.showSuccessAnimation(successMessage)
      }
    })
  }
}
