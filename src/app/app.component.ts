import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  location: any;
  resData: any;
  resGeo:any;
  eachRecord:any = [];
  firstDate: any;
  load: boolean;

  constructor(private httpClient: HttpClient,
    private datePipe: DatePipe) {
     this.load = false;
    }
  

  searchByCity(){
      this.load = true
      const locApi = `http://api.openweathermap.org/geo/1.0/direct?q=${this.location}&limit=5&appid=1635890035cbba097fd5c26c8ea672a1`;
      this.httpClient.get(locApi).subscribe((response) => {
        this.resGeo = response;
        var lat = this.resGeo[0].lat;
        var lon = this.resGeo[0].lon;
        const forecastApi = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=1635890035cbba097fd5c26c8ea672a1`;
        this.httpClient.get(forecastApi).subscribe((response) => {          
          this.resData = response;
          for(var eachItem of this.resData?.list){
             console.log("res", eachItem.dt_txt)
             this.firstDate = this.datePipe.transform(eachItem.dt_txt, "dd/MM/yyyy");
             console.log("firstDate", this.firstDate);
             if (!this.eachRecord.find((item:any) => this.datePipe.transform(item.dt_txt, "dd/MM/yyyy") == this.firstDate)) {
               this.eachRecord.push(eachItem)
              }
             console.log("this.eachRecord", this.eachRecord)
          }  
          this.load = false;     
        });
      });
  }

  getLocation(event: any){
    this.location = event.target.value
    console.log("location", this.location)
  }
}
