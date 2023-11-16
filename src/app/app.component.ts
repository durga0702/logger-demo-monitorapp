import { Component, OnInit } from '@angular/core';
import { SocketService } from './socketService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'APP-MONITOR';
  public userCount:any = 0;

  constructor(private socketService: SocketService){}

  ngOnInit(): void {
    // this.socketService.sendData({});
    this.socketService.receiveData();
    this.socketService.receiveData().subscribe((res:any)=>{
      this.userCount = res?.user_count;
    });
  }
}
