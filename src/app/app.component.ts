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
  public userDetails:any = [];

  constructor(private socketService: SocketService){}

  ngOnInit(): void {
    // this.socketService.sendData({});
    // this.socketService.receiveData();
    this.socketService.receiveData().subscribe((res:any)=>{
      if(res.status == 'connect'){
        const index = this.userDetails.findIndex((x:any)=>x.user_id===res.user_id);
           if(index == -1){
             this.userDetails.push(res);
           }
      }else if(res.status== 'change'){
        const index = this.userDetails.findIndex((x:any)=>x.user_id===res.user_id);
           if(index !== -1){
            if(res.country){
              this.userDetails[index].user_country=res.country;
            }else if(res.route){
              this.userDetails[index].route=res.route;
            }
           }
      }else if(res.status== 'disconnect'){
        const index = this.userDetails.findIndex((x:any)=>x.user_id===res.user_id);
        if(index !== -1){
          this.userDetails.splice(index,1);
        }
      }
    });
  }
}
