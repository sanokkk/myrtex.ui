import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/Models/Employee';
import { SharedService } from 'src/app/shared.service';
import { Moment } from 'moment';
import * as moment from 'moment';



@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor(private service: SharedService) { }

  EmployeeList: Employee[] = [];
  ModalTitle?: string;
  ActivateAddEditEmpComp: boolean = false;
  emp?: Employee;

  FullNameFilter:string = "";
  SalaryFilter?: string = "";
  BirthDayFilter: string = "";
  JobStartFilter?: string = "";
  DepartmnentFilter?: string = "";
  EmployeeListWithoutFilter: any = [];
  DepartmentList: any = [];

  ngOnInit(): void {
    this.refreshDepNames();
    this.refreshEmpList();
    
  }

  refreshEmpList() {
    this.service.getEmployees().subscribe(data => {
      for (let employee of data) {
        employee['birthday'] = this.getDate(employee['birthday']);
        employee['jobStart'] = this.getDate(employee['jobStart']);
        employee['departmentName'] = this.DepartmentList[Number(employee['department']) - 1];
      }
      this.EmployeeList = data;
      this.EmployeeListWithoutFilter = data;
      
    });
    
  }

  refreshDepNames() {
    this.service.getDepNames().subscribe((data: any) => {
      this.DepartmentList = data;
    });
  }

  addClick() {
    this.emp = {
    
      fullName : "",
      salary: 30000
    };
    this.ModalTitle = "Add Employee";
    this.ActivateAddEditEmpComp = true;
  }

  closeClick() {
    this.ActivateAddEditEmpComp = false;
    this.refreshEmpList();
  }

  editClick(emp: Employee) {
    this.emp = emp;
    this.ModalTitle = "Edit Employee";
    this.ActivateAddEditEmpComp = true;
  }

  deleteClick(emp: Employee) {
    if (confirm('Вы уверены?')){
      this.service.deleteEmployee(emp).subscribe(date => {
        alert('Ok');
        this.refreshEmpList();
      });
    }
  }

  FilterFunction() {
    var FullNameFilter = this.FullNameFilter;
    var SalaryFilter = this.SalaryFilter;
    var DepartmentFilter = this.DepartmnentFilter;
    var BirthDayFilter = this.BirthDayFilter;
    var JobStartFilter = this.JobStartFilter;
    if (SalaryFilter === null) SalaryFilter = '';
    if (!BirthDayFilter) BirthDayFilter = '';
    if (!JobStartFilter) JobStartFilter = '';

    this.EmployeeList = this.EmployeeListWithoutFilter.filter((el: any) => {
      console.log(DepartmentFilter);
      return el.departmentName.toString().toLowerCase().includes(
            DepartmentFilter?.toString().trim().toLowerCase()
        ) && 
        el.fullName.toString().toLowerCase().includes(
            FullNameFilter.toString().trim().toLowerCase()
          ) &&
          el.salary.toString().toLowerCase().includes(
            SalaryFilter?.toString().trim().toLowerCase()
          )
    });
    
    
    
  }

  getDate(date: Date) {
    const currDate = moment(date);
    return currDate.format('DD.MM.YYYY') ;
  }

  isValidDate(d: string): boolean {
    var date = new Date(d);
    return date instanceof Date && isNaN(Date.parse(d));
    }

    sortResult(prop: any, asc: boolean) {
      return this.EmployeeListWithoutFilter.sort(function(a: any,b: any){
        if (asc) {
          return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);
        }
        else {
          return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
        }
      });
    }

  
  }
  


