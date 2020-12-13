import { Coord } from './Models/Coord';
import { Ipinfo } from './Models/Ipinfo';
import { IpService } from './Services/ip.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'geo-api';

  coords: Coord[] = [];

  constructor(private IpService: IpService) {
    this.getW3cPosition();
    this.getIpstack();
    this.getGeoip2();
    this.getIpinfo();
  }

  getW3cPosition() {
    navigator.geolocation.getCurrentPosition(position => {

      let coord = new Coord();
      coord.provider = "W3C";
      coord.latitude = position.coords.latitude;
      coord.longitute = position.coords.longitude;

      this.coords.push(coord);
    });
  }

  getIpstack() {
    this.IpService.getIpstack().subscribe(
      response => {
          let coord = new Coord();
          coord.provider = "IpStack";
          coord.latitude = response.latitude;
          coord.longitute = response.longitude;

          this.coords.push(coord);
      });
  }

  getGeoip2() {
    this.IpService.getGeoip2().subscribe(
      response => {
          let coord = new Coord();
          coord.provider = "GeoIP2";
          coord.latitude = response.location.latitude;
          coord.longitute = response.location.longitude;

          this.coords.push(coord);
      });
  }

  getIpinfo() {
    this.IpService.getIpInfo().subscribe(
      response => {
          let loc: string = response["loc"];
          let coords = loc.split(",");

          let coord = new Coord();
          coord.provider = "IpInfo";
          coord.latitude = +coords[0];
          coord.longitute = +coords[1];

          this.coords.push(coord);
      });
  }


  
}
