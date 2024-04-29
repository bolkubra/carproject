import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute } from '@angular/router'; 
import { CarDetail } from 'src/app/models/carDetail';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carUpdateForm: FormGroup;
  carId: number; 
  carDetails: any = {};
  

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.createCarUpdateForm();
    this.activatedRoute.params.subscribe((params) => {
     
      this.getCarDetail(parseInt(params['carId']));
      console.log(params)
    });
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

  getCarDetail(carId: number) {
    this.carService.getCarsDetailsId(carId).subscribe((response) => {
      
        console.log(response.data);
        this.carDetails = response.data;
        console.log(this.carDetails)
        
        const dataFromParent = {
          carId: this.carDetails.carId,
          carName: this.carDetails.carName,
          numberPlate: this.carDetails.numberPlate,
          modelYear: this.carDetails.modelYear,
          inspectionDate: this.carDetails.inspectionDate,
          PermitImage: this.carDetails.PermitImage
        };
  
        // Forma verileri doldurun
        this.carUpdateForm.patchValue(dataFromParent);
      
    });
  }
  
  
  

  addUpdateCar() {
    var mytoast = this.toastrService;
    if (this.carUpdateForm.valid) {
      let carId = this.carUpdateForm.value.carId; 
      let carModel = Object.assign({}, this.carUpdateForm.value);
  console.log(carModel);
  console.log(carId);
      this.carService.UpdateCar(carModel).subscribe( 
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