import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/shared/employee.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(public service: EmployeeService,private toastr:ToastrService) { }

  ngOnInit() {
    this.service.getEmployees();
  }

  populateForm(emp:Employee){
    this.service.formData = Object.assign({},emp);
  }

  deleteEmployee(id:Number){
    if(confirm("Are you sure you want to delete this record?")){
      this.service.deleteEMployee(id).subscribe(res=> {
         this.toastr.success("Employee data deleted", "Employee");
         this.service.getEmployees();
      });
    }
  }
}
