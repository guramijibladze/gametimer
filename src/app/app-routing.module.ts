import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninuserComponent } from './signinuser/signinuser.component';

const routes: Routes = [
  { path: '', component: SigninuserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
