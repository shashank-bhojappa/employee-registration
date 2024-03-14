import { Component } from '@angular/core';
import { Employee } from 'src/app/shared/employee.model';
import { EmployeeService } from 'src/app/shared/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styles: [
  ]
})
export class EmployeeFormComponent {
  submitted: boolean = false
  constructor(public service: EmployeeService,private router: Router){}

  onSubmit(){
    this.submitted = true
    if(this.service.employeeForm.valid){
      debugger
      if(this.service.employeeForm.get('_id')?.value == ''){
        this.service.postEmployee().subscribe(res => {
          this.service.fetchEmployeeList();
          this.resetForm();
        })
      }
      else {
        this.service.putEmployee().subscribe(res => {
          this.service.fetchEmployeeList();
          this.resetForm();
          this.router.navigateByUrl('/');
        })
      }
    }
  }

  resetForm(){
    this.service.employeeForm.reset();
    this.service.employeeForm.reset(new Employee());
    this.submitted = false
  }

}
