import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { incommingDataByMonth } from '../model';

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

  public postAnalizedData(object:incommingDataByMonth):Observable<any>{
    return this.http.post<any>(this.baseURL + 'orderInfoByMonth', object)
  }
}
