import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderStatisticService {

  private baseURL: string = "http://localhost:3500/";

  constructor(
    private http: HttpClient
  ) { }

  public getOrderStatisticByMonth():Observable<any>{
    let ordersSum = 0
    return this.http.get<any>(this.baseURL + 'orderInfoByMonth').pipe(
      map( response => {
        if(Array.isArray(response)){
          response.forEach(data => ordersSum += Number(data.sum));
        }
        return {data: response,  ordersSum};
      })
    )
  }
}
