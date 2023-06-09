import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { EmployeeComponent } from './employee/employee.component';
import { MainpageComponent } from './mainpage/mainpage.component';


const routes: Routes = [
  {path: 'employee', component: EmployeeComponent},
  {path: 'main', component: MainpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
