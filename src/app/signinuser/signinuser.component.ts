import { Component } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';

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

    this.authService.login({...sendObj}).subscribe( res =>{
      console.log(res)
    })
   
  }
}
