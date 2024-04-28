import { Component, OnInit, TemplateRef } from '@angular/core';
import { Car } from 'src/app/models/car';
import {HttpClient} from '@angular/common/http';
import { CarResponseModel } from 'src/app/models/carResponseModel';
import { CarService } from 'src/app/services/car.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  
  cars : Car [] = [];
  dataLoaded = false;
 

 

  carResponseModel : CarResponseModel={
    data : this.cars,
    messgae : " ",
    success : true,
  };
  constructor(private carService:CarService,
    private toastrService : ToastrService){}

  ngOnInit(): void {
   this.getCars();
  }

  getCars() {
    this.carService.getCars().subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true
      
     
      });
    }
    deleteCar() {
      var mytoastr = this.toastrService;
      const data = {
        CarId: this.carId,

      };
     
      this.carService.deleteCar(data).subscribe(
        (postresponse) => {
          this.modalRef.hide();
          mytoastr.success('veri silindi');
          this.getCars();
        },
        (error) => {
          // Hata işlemleri
          console.log(error);
          mytoastr.error(' işlem başarısız', 'Dikkat');
  
        }
      );
    }
    openDeleteModal(template1: TemplateRef<any>, id: number) {
      // Tıklanan markanın bilgilerini form alanlarına atar
      this.carId = id; // Bu, Brand ID metin alanını doldurur
      this.modalRef = this.modalService.show(template1);
    }
   
  
}
