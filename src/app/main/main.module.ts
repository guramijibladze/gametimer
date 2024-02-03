import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellModule } from '../shell/shell.module';
import { StatisticComponent } from './statistic/statistic.component';
import { ForcomputersComponent } from './forcomputers/forcomputers.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  { path: '', component: MainComponent  },
  { path: 'computers', component: ForcomputersComponent },
  { path: 'statistic', component: StatisticComponent }
];

@NgModule({
  declarations: [
    StatisticComponent,
    MainComponent
  ],
  imports: [
    RouterModule,
    ShellModule,
    RouterModule.forChild(routes)
  ],

})
export class MainModule { 
}
