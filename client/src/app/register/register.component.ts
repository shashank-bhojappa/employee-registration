import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterResponse } from '../register-response';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstname: string = "";
  lastname: string = "";
  username: string = "";
  password: string = "";

  constructor(private http: HttpClient,private router: Router){

  }

  ngOnInit(): void {
  }

  register(){
    let bodyData = {
      "firstname": this.firstname,
      "lastname": this.lastname,
      "username": this.username,
      "password": this.password
    };
    this.http.post<RegisterResponse>("http://3.88.84.235:3000/api/employees/register",bodyData).subscribe((resultData)=>{
      console.log(resultData);
      if(resultData.successMsg === "User Registered Successfullly!!!"){
        console.log('registered')
        alert("Employee Registered Successfully")
      }else{
        alert('Registration Unsuccessfull: Either Username is already taken or some internal error happend. Try using different Username')
      }
      this.router.navigateByUrl('/');
      // alert("Employee Registered Successfully")
    })
  }

  save(){
    this.register()
  }

}
