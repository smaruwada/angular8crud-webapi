import { Component, OnInit } from '@angular/core';  
import { FormBuilder, Validators } from '@angular/forms';  
import { Observable } from 'rxjs';  
import { EmployeeService } from '../employee.service';  
import { Employee } from '../employee';  
  
@Component({  
  selector: 'app-employee',  
  templateUrl: './employee.component.html',  
  styleUrls: ['./employee.component.css']  
})  
export class EmployeeComponent implements OnInit {  
  dataSaved = false;  
  employeeForm: any;  
  allEmployees: Observable<Employee[]>;  
  employeeIdUpdate = null;  
  massage = null;  
  
  constructor(private formbulider: FormBuilder, private employeeService:EmployeeService) { }  
  
  ngOnInit() {  
    this.employeeForm = this.formbulider.group({  
      FirstName: ['', [Validators.required]],  
      LastName: ['', [Validators.required]],
      DateOfBirth: ['', [Validators.required]],  
      Email: ['', [Validators.required]],  
      PhoneNumber: ['', [Validators.required]],  
      
    });  
    this.loadAllEmployees();  
  }  
  loadAllEmployees() {  
    this.allEmployees = this.employeeService.getAllEmployee();  
  }  
  onFormSubmit() {  
    this.dataSaved = false;  
    const employee = this.employeeForm.value;  
    this.CreateEmployee(employee);  
    this.employeeForm.reset();  
  }  
  loadEmployeeToEdit(employeeId: string) {  
    this.employeeService.getEmployeeById(employeeId).subscribe(employee=> {  
      this.massage = null;  
      this.dataSaved = false;  
      this.employeeIdUpdate = employee.employeeId;  
      this.employeeForm.controls['FirstName'].setValue(employee.FirstName);
      this.employeeForm.controls['LastName'].setValue(employee.LastName);  
     this.employeeForm.controls['DateOfBirth'].setValue(employee.DateOfBirth);  
      this.employeeForm.controls['Email'].setValue(employee.Email);
      this.employeeForm.controls['PhoneNumber'].setValue(employee.PhoneNumber);  
        
    });  
  
  }  
  CreateEmployee(employee: Employee) {  
    if (this.employeeIdUpdate == null) {  
      this.employeeService.createEmployee(employee).subscribe(  
        () => {  
          this.dataSaved = true;  
          this.massage = 'Record saved Successfully';  
          this.loadAllEmployees();  
          this.employeeIdUpdate = null;  
          this.employeeForm.reset();  
        }  
      );  
    } else {  
      employee.employeeId = this.employeeIdUpdate;  
      this.employeeService.updateEmployee(employee).subscribe(() => {  
        this.dataSaved = true;  
        this.massage = 'Record Updated Successfully';  
        this.loadAllEmployees();  
        this.employeeIdUpdate = null;  
        this.employeeForm.reset();  
      });  
    }  
  }   
  deleteEmployee(employeeId: number) {  
    if (confirm("Are you sure you want to delete this ?")) {   
    this.employeeService.deleteEmployeeById(employeeId).subscribe(() => {  
      this.dataSaved = true;  
      this.massage = 'Record Deleted Succefully';  
      this.loadAllEmployees();  
      this.employeeIdUpdate = null;  
      this.employeeForm.reset();  
  
    });  
  }  
}  
  resetForm() {  
    this.employeeForm.reset();  
    this.massage = null;  
    this.dataSaved = false;  
  }  
}  