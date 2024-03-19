import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor() { } 
  socket = io('http://3.88.84.235:3000');

  listen(eventname: string) : Observable<any> {
    return new Observable((subscriber) => {
        this.socket.on(eventname, (data) => {
            subscriber.next(data);
        })
    })
}

  emit(eventname: string, data: any) {
      this.socket.emit(eventname, data);
  }

}
