import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarResponseModel } from '../models/carResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = "https://localhost:44380/api/cars";


  constructor(private httpClient:HttpClient) { }


  getCars() : Observable<CarResponseModel> {
    return this.httpClient.get<CarResponseModel>(this.apiUrl);
    }
  deleteCar(data: any): Observable<any> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // json formatta gönderiyoruz
      return this.httpClient.post(this.apiUrl + 'cars/delete', data, { headers });
    }
  UpdateCar(data: any): Observable<any> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // json formatta gönderiyoruz
      return this.httpClient.post(this.apiUrl + 'cars/update', data, { headers });
    }
}
