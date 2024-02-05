import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellModule } from '../shell/shell.module';
import { StatisticComponent } from './statistic/statistic.component';
import { ForcomputersComponent } from './forcomputers/forcomputers.component';
import { MainComponent } from './main.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: MainComponent, 
    children:[
      { path: 'computers', component: ForcomputersComponent },
      { path: 'statistic', component: StatisticComponent }
    ]
  },
];

@NgModule({
  declarations: [
    StatisticComponent,
    MainComponent,
    ForcomputersComponent
  ],
  imports: [
    RouterModule,
    ShellModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  // exports: [
  //   MainComponent
  // ]
})
export class MainModule { 
}
