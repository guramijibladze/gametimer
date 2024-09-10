import { Component, OnInit } from '@angular/core';
import { OrderStatisticService } from '../service/order-statistic.service';
import { GrowlService } from '../../service/auth/growl.service';
import { monthIncomintData } from '../model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-statistic-for-month',
  templateUrl: './order-statistic-for-month.component.html',
  styleUrl: './order-statistic-for-month.component.scss'
})
export class OrderStatisticForMonthComponent implements OnInit {

  public incommintFromMonth:any[] = [];
  public icommingSum:string = '';

  private result?:Subscription

  constructor(
    private orderStatisticService:OrderStatisticService,
    private notificationService:GrowlService
  ){}

  ngOnInit(): void {
    this.getOrderByMonth()
  }
  
  getOrderByMonth():void{
    this.result = this.orderStatisticService.getOrderStatisticByMonth().subscribe({
      next: (res) => {

        const translatedData = this.changeMonthName(res.data)
        this.incommintFromMonth = translatedData;
        this.icommingSum = res.ordersSum.toFixed(1);
        console.log(translatedData)
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

  private changeMonthName(data:monthIncomintData[]):monthIncomintData[]{

    const monthTranslator:any = {
      'Jan': 'იანვარი',
      'Feb': 'თებერვალი',
      'Mar': 'მარტი',
      'Apr': 'აპრილი',
      'May': 'მაისი',
      'Jun': 'ივნისი',
      'Jul': 'ივლისი',
      'Aug': 'აგვისტო',
      'Sep': 'სექტემბერი',
      'Oct': 'ოქტომბერი',
      'Nov': 'ნოემბერი',
      'Dec': 'დეკემბერი'
    };

    let translated = data.map((item:monthIncomintData) => ({
      ...item,
      month: monthTranslator[item.month] || item.month
    }))

    return translated
  }

  ngOnDestroy() {
    this.result ? this.result.unsubscribe() : ''
    // this.computerRoomsDeleteSubscription ? this.computerRoomsDeleteSubscription.unsubscribe() : ''
   }
}
