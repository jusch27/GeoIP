import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoogleAdress } from '../Models/GoogleAdress';

@Injectable({
  providedIn: 'root'
})
export class GeocodService {

  constructor(private http: HttpClient) { }

  getGoogle(latitude, longitude) {
    let params = new HttpParams()
                    .set("key", "AIzaSyAeI6XIgPH9gwYvoRj_OlPH5ppbDBicoSc")
                    .set("latlng", latitude + "," + longitude);
    
    return this.http.get("https://maps.googleapis.com/maps/api/geocode/json", {params: params})
  }

  getTomtom(latitude, longitude) {
    let params = new HttpParams()
                    .set("key", "QTmTGYWmWkuQHaAd3SAwVRQC99szfFP7");
    
    return this.http.get("https://api.tomtom.com/search/2/reverseGeocode/"+ latitude + "," + longitude, {params: params})
  }

  getNominatim(latitude, longitude) {
    let params = new HttpParams()
                    .set("key", "AIzaSyAeI6XIgPH9gwYvoRj_OlPH5ppbDBicoSc")
                    .set("lat", latitude)
                    .set("lon", longitude)
                    .set("format", "json");
    
    return this.http.get("https://nominatim.openstreetmap.org/reverse", {params: params})
  }

  getPickPoint(latitude, longitude) {
    let params = new HttpParams()
                    .set("key", "1dYMyiUuTxCLRnsubfag")
                    .set("lat", latitude)
                    .set("lon", longitude);
    
    return this.http.get("https://api.pickpoint.io/v1/reverse", {params: params})
  }
}
