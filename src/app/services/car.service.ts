import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarResponseModel } from '../models/carResponseModel';
import { Observable } from 'rxjs';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
 
  apiUrl = "https://localhost:44380/api/cars";
  private baseUrl: string = '/Upload/Images/';
  constructor(private httpClient:HttpClient) { }


  getCars() : Observable<CarResponseModel> {
    return this.httpClient.get<CarResponseModel>(this.apiUrl);
    }

  deleteCar(carId:number): Observable<any> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.httpClient.post(this.apiUrl + '/delete?carId='+carId, { headers });
    }
   
  UpdateCar(carModel:any): Observable<any> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // json formatta gönderiyoruz
      return this.httpClient.post(this.apiUrl + '/update' , carModel, { headers });
    }

  add(car:Car){
      return this.httpClient.post(this.apiUrl+"/insert",car)
    }

  getCarsDetailsId(carId:number):Observable<CarResponseModel>{
      let newPath =this.apiUrl+"/getbyid?id="+carId
      return this.httpClient.get<CarResponseModel>(newPath);
    }

  getCarById(carId:number): Observable<CarResponseModel> {
    let newPath = this.apiUrl+"/getbyid?id="+carId
    return this.httpClient.get<CarResponseModel>(newPath);
  }

  getCarImages(): Observable<any> {
    return this.httpClient.get<any>('https://localhost:44380/api/cars');
  }


  onFileSelected(event: any) {
    const file: File = event.target.files[0]; // Seçilen dosyayı aldım
    const formData = new FormData();
    formData.append('file', file); // FormData'ya dosyayı ekledim
  
    
    this.httpClient.post('https://localhost:44380/api/cars/insert', formData)
      .subscribe(response => {
        console.log(response); 
      });
    }

    
    addWithImage(car: FormData): Observable<any> {
      return this.httpClient.post<any>(`${this.apiUrl}/insert`, car);
    }
}
