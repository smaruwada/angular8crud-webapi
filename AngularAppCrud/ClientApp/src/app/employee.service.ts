import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  url = 'http://localhost:54965/api/'; 
  constructor(private httpclient : HttpClient) { }

  
  getAllEmployee() : Observable<Employee[]>{
    return this.httpclient.get<Employee[]>("api/employee")
  }

  getEmployeeById(employeeId: string): Observable<Employee> {  
    return this.httpclient.get<Employee>('api/employee/' + employeeId);  
  }  


  createEmployee(employee: Employee): Observable<Employee> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.httpclient.post<Employee>('api/employee',  
    employee, httpOptions);  
  }  

  updateEmployee(employee: Employee): Observable<Employee> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.httpclient.put<Employee>('api/employee',  
    employee, httpOptions);  
  }  

  deleteEmployeeById(employeeid: number): Observable<number> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.httpclient.delete<number>('api/employee/' +employeeid,  
 httpOptions);  
  }  
}
