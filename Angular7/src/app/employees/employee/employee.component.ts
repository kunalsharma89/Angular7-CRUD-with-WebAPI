import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  
  constructor(public service : EmployeeService, private toastr:ToastrService) {}

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm (form?:NgForm){
    if(form!=null)  
      form.resetForm();
      
    this.service.formData = {
        EmployeeId:null,
        EmpCode:'',
        FullName:'',
        Mobile:'',
        Position:''
    }
    
  }

  onSubmit(form:NgForm){
    if(form.value.EmployeeId == null) 
      this.insertRecord(form);
    else
      this.updateRecord(form);  
  }

  insertRecord(form:NgForm){
    this.service.postEmployee(form.value).subscribe(res=>{
      this.toastr.success("Data saved successfully.", "Registration");
      this.resetForm(form);
      this.service.getEmployees();
    });
  }

  updateRecord(form:NgForm){
    this.service.putEmployee(form.value).subscribe(res=>{
      this.toastr.warning("Data updated successfully.", "Registration");
      this.resetForm(form);
      this.service.getEmployees();
    });
  }
}
