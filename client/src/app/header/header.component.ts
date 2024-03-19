import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { LogoutResponse } from "../logout-response";
import { AuthService } from "../shared/auth.service";
import { Clear } from "../clear";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    constructor(private http: HttpClient,private router: Router,public authService:AuthService){

    }

    logout(){
        this.http.get<LogoutResponse>("http://3.88.84.235:3000/logout").subscribe((resultData:any)=>{
            console.log(resultData)
            if(resultData.successMsg == "User Logged out Successfully"){
                localStorage.clear();
                // this.http.get<Clear>("http://3.88.84.235:3000/clear").subscribe((resData:any)=>{
                //     console.log(resData)
                // })
                this.router.navigateByUrl('/home');
            }
        })
    }
}