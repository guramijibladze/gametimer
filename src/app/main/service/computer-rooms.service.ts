import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComputerRoomsService {

  baseURL: string = "http://localhost:3000/";

  constructor(
    private http: HttpClient
  ) { }

  public postTimer(object:any):Observable<any>{
    
    const headers = { 'content-type': 'application/json'}  
    const body = JSON.stringify(object);
    console.log('postTimer',body)
    return this.http.post<any>(this.baseURL + 'computerRooms', body,{'headers':headers});
  }

  public getcomputerRooms():Observable<any>{
    return this.http.get<any>(this.baseURL + 'computerRooms')
  }
}
