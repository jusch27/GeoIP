import { Coord } from './Models/Coord';
import { Ipinfo } from './Models/Ipinfo';
import { IpService } from './Services/ip.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Address } from './Models/Address';
import { GeocodService } from './Services/geocod.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'geo-api';

  coords: Coord[] = [];
  addresses: Address[] = [];

  latitude;
  longitude;

  constructor(private IpService: IpService, private CodService: GeocodService) {
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
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      coord.longitute = position.coords.longitude;
      coord.city = "-";

      this.coords.push(coord);
      this.getGoogleAddress();
      this.getNominatimAddress();
      this.getTomtomAdress();
      this.getPickPoint();
    });
  }

  getIpstack() {
    this.IpService.getIpstack().subscribe(
      response => {
          let coord = new Coord();
          coord.provider = "IpStack";
          coord.latitude = response.latitude;
          coord.longitute = response.longitude;
          coord.city = response.city;

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
          coord.city = response.city.names.en;

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
          coord.city = response["city"];

          this.coords.push(coord);
      });
  }

  getGoogleAddress() {
    this.CodService.getGoogle(this.latitude, this.longitude).subscribe(
      response => {
        let add = new Address();
        add.address = response["results"][0]["formatted_address"];
        add.provider = "Google Geocoding";
        this.addresses.push(add);
      }
    );
  }

  getNominatimAddress() {
    this.CodService.getNominatim(this.latitude, this.longitude).subscribe(
      response => {
        let add = new Address();
        add.address = response["display_name"];
        add.provider = "OpenStreetMap Geocoding";
        this.addresses.push(add);
      }
    );
  }

    getTomtomAdress() {
      this.CodService.getTomtom(this.latitude, this.longitude).subscribe(
        response => {
          let add = new Address();
          add.address = response["addresses"][0]["address"]["freeformAddress"];
          add.provider = "Tomtom Geocoding";
          this.addresses.push(add);
        }
      );
    }

    getPickPoint() {
      this.CodService.getPickPoint(this.latitude, this.longitude).subscribe(
        response => {
          let add = new Address();
          add.address = response["display_name"];
          add.provider = "PickPoint Geocoding";
          this.addresses.push(add);
        }
      );
    }
  
}
