import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute } from '@angular/router'; 
import { CarDetail } from 'src/app/models/carDetail';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carUpdateForm: FormGroup;
  carId: number; 
  carDetails: any = {};
  selectedFile: File;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe
  ){}

  ngOnInit(): void {
    this.createCarUpdateForm();
    this.activatedRoute.params.subscribe((params) => {
      this.getCarDetail(parseInt(params['carId']));
    });
  }

 
  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      carId: [''],
      carName: ['', Validators.required],
      numberPlate: ['', Validators.required],
      modelYear: ['', Validators.required],
      inspectionDate: ['', Validators.required],
      permitImage: [''] // Dosya seçildiğinde dosya adını tutmak için gerek yok
    });
  }

  getCarDetail(carId: number) {
    this.carService.getCarsDetailsId(carId).subscribe((response) => {
      this.carDetails = response.data;
      
      // Tarih değerlerini biçimlendir
      const formattedDate = this.datePipe.transform(this.carDetails.inspectionDate, 'yyyy-MM-dd');
      console.log(this.carDetails.inspectionDate)
      const dataFromParent = {
        carId: this.carDetails.carId,
        carName: this.carDetails.carName,
        numberPlate: this.carDetails.numberPlate,
        modelYear: this.carDetails.modelYear,
        inspectionDate: formattedDate, // Biçimlendirilmiş tarih değeri
        permitImage: this.carDetails.permitImage // Dosya adını saklama ihtiyacı yok
      };

      // Forma verileri doldurun
      this.carUpdateForm.patchValue(dataFromParent);
    });
  }

  
  onFileSelected(event: any) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      // Dosya adını permitImage alanına atayalım
      this.carUpdateForm.patchValue({
        permitImage: this.selectedFile.name
      });
  
     
    }
  }
  
  addUpdateCar() {
    var mytoast = this.toastrService;
    if (this.carUpdateForm.valid) {
      let carId = this.carUpdateForm.value.carId; 
      // Tarih değerini formatlayalım
      const formattedDate = this.datePipe.transform(this.carUpdateForm.value.inspectionDate, 'yyyy-MM-dd');
      // Formdan alınan diğer değerlerle birlikte güncellenmiş tarih değerini de modele ekleyelim
      let carModel = Object.assign({}, this.carUpdateForm.value, { inspectionDate: formattedDate });
      
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
  
  formatDate(date: string): string {
    const parts = date.split('.');
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    return formattedDate;
  }

}
