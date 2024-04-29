/*import { Component , OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit{

  carUpdateForm: FormGroup;

  constructor( private formBuilder: FormBuilder,
    private carService: CarService,
    private toastrService: ToastrService){}

  ngOnInit(): void {
    this.createCarUpdateForm();
    
  }


  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      carName: ['', Validators.required],
      numberPlate: ['', Validators.required],
      modelYear: ['', Validators.required],
      inspectionDate: ['', Validators.required],
      PermitImage: ['', Validators.required]
    });
  }

  addUpdateCar() {
    var mytoastr = this.toastrService;
    console.log(this.carUpdateForm);
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value);
      console.log(carModel);
      this.carService.UpdateCar(carModel).subscribe(
        (response) => {
          mytoastr.success('başarılı');
        },
        (error) => {
          // Hata işlemleri
          console.log(error);
          mytoastr.error('ekleme işlemi başarısız', 'Dikkat');
        }
      );
    } else {
      mytoastr.error(' başarısız', 'Dikkat');
    }
  }
}*/
// car-update.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carUpdateForm: FormGroup;
  carId: number; 

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private toastrService: ToastrService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.createCarUpdateForm();
    //this.getCarDetails();
  }

  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      carId: [''], // Eksik olan carId alanını ekle
      carName: ['', Validators.required],
      numberPlate: ['', Validators.required],
      modelYear: ['', Validators.required],
      inspectionDate: ['', Validators.required],
      PermitImage: ['', Validators.required]
    });
  }

  /*getCarDetails() {
    this.route.paramMap.subscribe(params => {
      const carIdParam = params.get('carId');
      if (carIdParam !== null) {
        this.carId = +carIdParam;
        this.carService.getCarById(this.carId).subscribe(response => {
          this.carUpdateForm.patchValue(response);
        });
      }
    });
  }*/
  

  addUpdateCar() {
    var mytoast = this.toastrService;
    if (this.carUpdateForm.valid) {
      let carId = this.carUpdateForm.value.carId; // carId değerini al
      let carModel = Object.assign({}, this.carUpdateForm.value);
  console.log(carModel);
  console.log(carId);
      this.carService.UpdateCar(carModel).subscribe( // carId parametresini burada geçir
        (response) => {
          mytoast.success('Güncelleme başarılı');
        },
        (error) => {
          console.log(error);
          mytoast.error('Güncelleme işlemi başarısız', 'Dikkat');
        }
      );
    } else {
      mytoast.error('Form geçersiz', 'Dikkat');
    }
  }
  
  

}
