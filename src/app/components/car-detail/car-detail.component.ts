import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit{

  carDetails: CarDetail[] = [];

  constructor(private carService: CarService,
    private activedRouter: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router){}


    ngOnInit(): void {
      this.activedRouter.params.subscribe((params) => {
        if (params['id']) {
          this.getCarDetail(params['id']);
          
        }
      });
    }

    getCarDetail(carId: number) {
      this.carService.getCarsDetailsId(carId).subscribe((response) => {
        
        this.carDetails = response.data;
        
        
        
        if (this.carDetails.length > 0) {
          const dataFromParent = {
            carId: this.carDetails[0].carId,
            carName: this.carDetails[0].carName,
            numberPlate: this.carDetails[0].numberPlate,
            modelYear: this.carDetails[0].modelYear,
            inspectionDate: this.carDetails[0].inspectionDate,
            permitImage: this.carDetails[0].permitImage // küçük harfle düzeltilmiş
          };
    
        
        }
      });
    }
    
    
  
}
