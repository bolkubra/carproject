import { Component, OnInit, TemplateRef } from '@angular/core';
import { Car } from 'src/app/models/car';
import {HttpClient} from '@angular/common/http';
import { CarResponseModel } from 'src/app/models/carResponseModel';
import { CarService } from 'src/app/services/car.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';




@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  
  cars : Car [] = [];
  dataLoaded = false;
  carId : number;
  modalRef : BsModalRef;
  

  carResponseModel : CarResponseModel={
    data : this.cars,
    messgae : " ",
    success : true,
  };
  constructor(private carService:CarService,
    private toastrService : ToastrService,
    private modalService : BsModalService
  ){}

  ngOnInit(): void {
   this.getCars();
  }

  getCars() {
    this.carService.getCars().subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true
      
     
      });
    }
    deleteCar(){
      var mytoastr = this.toastrService;
      /*const data = {
        carId: this.carId,
       
      };*/
      
     this.carService.deleteCar(this.carId).subscribe(
        (postresponse) => {
          this.modalRef.hide();
          mytoastr.success('Araç Bilgisi Silindi');
          this.getCars();
        },
        (error) => {
          // Hata işlemleri
          console.log(error);
          mytoastr.error(' İşlem Başarısız', 'Dikkat');
        }
      );
    }
    openDeleteModal(template1: TemplateRef<any>, id: number) {
      this.carId = id; 
  
      this.modalRef = this.modalService.show(template1);
    }
   
    
    
}