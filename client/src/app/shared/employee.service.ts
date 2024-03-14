import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  readonly baseUrl = "http://localhost:3000/api/employees/";

  list:Employee[]=[];

    employeeForm  = this.fb.group({
      _id: [''],
      fullName: ['',Validators.required],
      position: ['',Validators.required],
      location: [''],
      salary: ['',Validators.required],
    })

  fetchEmployeeList(){
    this.http.get(this.baseUrl).pipe(catchError(this.handleError)).subscribe((data)=>{
      this.list = data as Employee[];
    })
  }

  postEmployee(){
    return this.http.post(this.baseUrl,this.employeeForm.value).pipe(catchError(this.handleError))
  }

  putEmployee(){
    return this.http.put(this.baseUrl+this.employeeForm.get('_id')?.value,this.employeeForm.value).pipe(catchError(this.handleError))
  }

  deleteEmployee(_id:string){
    return this.http.delete(this.baseUrl+_id).pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  
}
