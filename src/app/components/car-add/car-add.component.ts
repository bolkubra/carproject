import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
  carAddForm: FormGroup;
  selectedFile: File;

  constructor(private formBuilder: FormBuilder,
              private carService: CarService,
              private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createCarAddForm();
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      carName: ['', Validators.required],
      numberPlate: ['', Validators.required],
      modelYear: ['', Validators.required],
      inspectionDate: ['', Validators.required],
      PermitImage: ['', Validators.required],
      ImageName: [''] 
    });
  }

  onFileSelected(event: any) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      // Dosya adını imageName alanına atayabilirsiniz
      this.carAddForm.patchValue({
        imageName: this.selectedFile.name
      });
    }
  }

  /*add() {
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value);
      const formData = new FormData();
      formData.append('carModel', JSON.stringify(carModel));
      formData.append('file', this.selectedFile);
  
      // Dosya seçildiğinde otomatik olarak dosya adını alıp FormData'ya ekleyin
      formData.append('imageName', this.selectedFile.name); 
  
      this.carService.addWithImage(formData).subscribe(response => {
        console.log(response);
        this.toastrService.success('Araç Bilgileri Eklendi', 'Başarılı');
      }, error => {
        console.error(error);
        this.toastrService.error('Araç Bilgileri Eklenirken Hata Oluştu', 'Hata');
      });
    } else {
      this.toastrService.error('Form Eksik', 'Dikkat');
    }
  }
*/
  submitForm() {
    const formData = new FormData();
    formData.append('carName', this.carAddForm.value.carName);
    formData.append('numberPlate', this.carAddForm.value.numberPlate);
    formData.append('modelYear', this.carAddForm.value.modelYear);
    formData.append('inspectionDate', this.carAddForm.value.inspectionDate);
    formData.append('PermitImage', this.selectedFile); // Dosyayı FormData'ya ekle
    formData.append('ImageName', this.selectedFile.name); // Dosya adını da FormData'ya ekle
  
    // Şimdi HTTP isteğini gönder
    this.carService.addWithImage(formData).subscribe(response => {
      console.log(response);
      this.toastrService.success('Araç Bilgileri Eklendi', 'Başarılı');
    }, error => {
      console.error(error);
      this.toastrService.error('Araç Bilgileri Eklenirken Hata Oluştu', 'Hata');
    });
  } 
  
  
}
