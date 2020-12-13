import { Ipinfo } from './../Models/Ipinfo';
import { Ipstack } from './../Models/Ipstack';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geoip2 } from '../Models/Geoip2';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IpService {

  constructor(private http: HttpClient) { }

  getIpstack() {
    let params = new HttpParams()
                    .set("access_key", "37c3df1a350a135131c6d2b54e2922ce");
    
    return this.http.get<Ipstack>("http://api.ipstack.com/check", {params: params})
  }

  getGeoip2() {
    let header = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('447386:lbH06Nt1RtoMfp84')
    });

    return this.http.get<Geoip2>("https://geoip.maxmind.com/geoip/v2.1/insights/me", )
  }

  getIpInfo() {

    let info = new Ipinfo();

    let params = new HttpParams()
                    .set("token", "54657e897d7b6a");
    
    return this.http.get<Ipinfo>("https://ipinfo.io", {params: params});
    
  }

}
