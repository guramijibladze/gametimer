import { Component } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-signinuser',
  templateUrl: './signinuser.component.html',
  styleUrl: './signinuser.component.scss'
})
export class SigninuserComponent {
  userName:string = ''
  lastName:string = ''

  constructor(
    private authService:AuthService
  ){}

  login():void{

    let sendObj ={
      userName: this.userName,
      lastName: this.lastName,
    }

    let openDateTime = this.getCurrentDate()

    this.authService.login({...sendObj}).subscribe( res =>{
      if( res == 'you are sign in!') localStorage.setItem('openDayTime', openDateTime)
    })
   
  }

  private getCurrentDate():any{
    let parseDate:any
    let pipe = new DatePipe('en-US');
    let today = new Date();
    let ChangedFormat = pipe.transform(today, 'MMM d, y');
    parseDate = ChangedFormat
    
    return parseDate
  }
}
