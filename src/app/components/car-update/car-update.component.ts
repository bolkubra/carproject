import { Component , OnInit} from '@angular/core';
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
}
