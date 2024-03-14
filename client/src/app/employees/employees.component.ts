import { Component, OnInit } from '@angular/core';
import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsernameService } from '../shared/username.service';
import { WebSocketService } from '../shared/web-socket.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  newMessage = '';
  messageList: string[] = [];
  username: string = ''
  title = 'client ';
  userName: string;
  message: string;
  output: any[] = [];
  feedback: string;
  close: boolean;

  constructor(public service: EmployeeService,private router: Router, public usernameService: UsernameService, private webSocketService: WebSocketService){}
  ngOnInit(): void {
    this.close = true
    this.username = this.usernameService.username
    this.service.fetchEmployeeList()
    this.webSocketService.listen('typing').subscribe((data) => this.updateFeedback(data));
    this.webSocketService.listen('chat').subscribe((data) => this.updateMessage(data));
  }

  closeWindow(){
    this.close = false
  }

  openWindow(){
    this.close = true
  }

  messageTyping(): void {
    this.webSocketService.emit('typing', this.userName);    
  }

  sendMessage(): void {
    this.webSocketService.emit('chat', {
      message: this.message,
      handle: this.username
    });
    this.message = "";    
  }

  updateMessage(data:any) {
    this.feedback = '';
    if(!!!data) return;
    // console.log(`${data.handle} : ${data.message}`);
    this.output.push(data);
  }

  updateFeedback(data: any){
    this.feedback = `${this.username} is typing a message`;
  }

  populateForm(selectedRecord:Employee){
    this.router.navigateByUrl('/form');
    this.service.employeeForm.setValue({
      _id: selectedRecord._id,
      fullName: selectedRecord.fullName,
      position: selectedRecord.position,
      location: selectedRecord.location,
      salary: selectedRecord.salary
    })
  }

  onDelete(_id: string){
    if(confirm('Are you sure, you want to delete this record?')){
      this,this.service.deleteEmployee(_id).subscribe((res)=>{
        this.service.fetchEmployeeList();
      })
    }
  }

}
