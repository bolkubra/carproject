import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarAddedPipe } from './pipes/car-added.pipe';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';


import { ToastrModule } from 'ngx-toastr';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    NaviComponent,
    CarAddComponent,
    CarAddedPipe,
    CarUpdateComponent,
    CarDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ModalModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ 
      positionClass :"toast-bottom-right"}),
   
  ],
  providers: [BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
