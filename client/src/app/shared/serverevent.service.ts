import { Injectable, NgZone } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { SseService } from './sse.service';

@Injectable({
  providedIn: 'root'
})
export class ServereventService {

  constructor(private _zone:NgZone, private _sseService: SseService) { }

  getServerSentEvent(url:string){
    return new Observable((observer: Observer<any>) => {
      const eventSource = this._sseService.getEventSource(url);

      eventSource.onmessage = event => {
        this._zone.run(()=>{
          observer.next(event)
        })
      };

      eventSource.onerror = error => {
        this._zone.run(()=>{
          observer.error(error)
        })
      }
  });
  }
}
