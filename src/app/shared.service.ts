import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from 'src/Models/Employee';
import { EmployeeDto } from 'src/Models/EmployeeDto';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
private url = 'http://localhost:5000/api/Employee';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url);
  }

  addEmployee(employee: EmployeeDto) {
    return this.http.post(this.url, employee);
  }

  updateEmployee(employee: Employee, id: string) {
    return this.http.put(this.url + '/' + id, employee);
  }

  deleteEmployee(employee: Employee) {
    return this.http.delete(this.url + '/' + employee.id);
  }

  getDepNames(): Observable<string[]> {
    return this.http.get<string[]>(this.url + '/deps');
  }

}
