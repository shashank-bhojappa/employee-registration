import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from '../login-response';
import { ServereventService } from '../shared/serverevent.service';
import { UsernameService } from '../shared/username.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  username: string = '';
  password: string = '';
  firstname: string = '';
  lastname: string = '';
  role: string = 'user';
  user: string

  isLogin: boolean = true;
  errorMessage: string = '';

  constructor(private router: Router, private http: HttpClient, private _serverevent: ServereventService, private usernameService: UsernameService ){}

  ngOnInit() {
    // this._serverevent.getServerSentEvent('http://localhost:3000/progress').subscribe(data => console.log(data))
  }

  login(){
    // console.log(this.username);
    // console.log(this.password);

    let bodyData = {
      username: this.username,
      password: this.password
    };
    this.http.post<LoginResponse>("http://localhost:3000/api/employees/login",bodyData).subscribe((resultData:any)=>{
      console.log(resultData)
      if(resultData.successMsg == "User Logged in Successfully"){
        localStorage.setItem('jwtToken',resultData.token)
        localStorage.setItem('username',resultData.username)
        this.usernameService.username = resultData.username
        // this._serverevent.getServerSentEvent('http://localhost:3000/progress').subscribe(data => console.log(JSON.parse(data.data).msg))
        this.router.navigateByUrl('/');
      }
      if(resultData.failureMsg == "User Login Failed"){
        this.router.navigateByUrl('/login');
        alert("Incorrect Email or Password")
      }
    })
  }

}
