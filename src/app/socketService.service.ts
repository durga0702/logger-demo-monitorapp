import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Socket, io } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})

export class SocketService {
   public socket:Socket;
   public socketData$: BehaviorSubject<string> = new BehaviorSubject('');
   public URL = 'http://localhost:3000';
  constructor(
    // private http:HttpClient,
  ) {
     this.socket = io(this.URL, { forceNew: true, reconnectionDelay: 2000, timeout: 100000, query:{"from_type":"monitor-app"} }).connect()
     console.log('socket page')
    }
//   socket = io('http://localhost:3000');

//   public sendData(data: any) {
//     console.log('data: ', data)
//     this.socket.emit('data', data);
//   }

  public receiveData = () => {
    this.socket.on('userdetails', (data) =>{
      console.log(data)
      this.socketData$.next(data);
    });

    return this.socketData$.asObservable();
  };

}