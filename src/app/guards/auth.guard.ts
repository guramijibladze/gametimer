import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
 
  let currentmenu = localStorage.getItem('token')

  if(currentmenu){
    return true
  }else{
    return false
  }

};
