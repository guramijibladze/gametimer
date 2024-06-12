import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(
    private router: Router,
    private authService: AuthService
  ){}

  public computer():void{
    this.router.navigate(['main/computers']);
  }

  public statistic():void{
    this.router.navigate(['main/statistic']);
  }

  public dayOff():void{
    this.authService.logout()
    localStorage.removeItem('openDayTime');
  }
}
