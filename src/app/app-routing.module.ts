import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninuserComponent } from './signinuser/signinuser.component';
import { authGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: 'sign-in', component: SigninuserComponent },
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: 'sing-in'
  // },
  {
    path: 'main',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./main/main.module').then((m) => m.MainModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
