import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninuserComponent } from './signinuser/signinuser.component';
import { authGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: '', component: SigninuserComponent },
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
