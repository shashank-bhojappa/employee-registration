import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmployeeFormComponent } from "./employee-form/employee-form.component";
import { EmployeesComponent } from "./employees/employees.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./shared/auth.guard";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
    {path: '', component: EmployeesComponent,canActivate:[AuthGuard]},
    {path: 'form', component: EmployeeFormComponent,canActivate:[AuthGuard]},
    {path: 'home', component: HomeComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: '**', component: PageNotFoundComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}