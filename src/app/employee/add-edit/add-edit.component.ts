import { Component, Input, OnInit } from '@angular/core';
import { Employee } from 'src/Models/Employee';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

  constructor(private service: SharedService) { }

  @Input () emp?: Employee;
  id?: string;
  fullname?: string;
  salary?: number;
  birthday?: Date;
  department?: number;

  departmentList: any = [];

  

  ngOnInit(): void {
    this.loadDepartmentList();
  }

  loadDepartmentList() {
    console.log(this.emp?.birthday);
    this.service.getDepNames().subscribe((data: any) => {
      this.departmentList = data;
      this.id = this.emp?.id;
      this.fullname = this.emp?.fullName;
      this.salary = this.emp?.salary;
      this.birthday = this.emp?.birthday;
      this.department = (this.departmentList.indexOf(this.department) + 1);
    });
  }

  addEmployee() {
    var val = {
      fullname: this.fullname,
      salary: this.salary,
      birthday: this.birthday,
      department: (this.departmentList.indexOf(this.department) + 1)
    };
    console.log(val);
    this.service.addEmployee(val).subscribe(res => {
      alert('Ok');
    });
  }

  updateEmployee() {
    var val = {
      fullname: this.fullname,
      salary: this.salary,
      birthday: this.birthday,
      department: (this.departmentList.indexOf(this.department) + 1)
    };
    console.log(val);
    console.log(this.id);
    console.log(this.departmentList);
    this.service.updateEmployee(val, String(this.id)).subscribe(res => {
      alert('Ok');
    });
  }

}
