import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninuserComponent } from './signinuser/signinuser.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [	
    AppComponent, 
    SigninuserComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
