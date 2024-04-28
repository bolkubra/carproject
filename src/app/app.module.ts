import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarAddedPipe } from './pipes/car-added.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    NaviComponent,
    CarAddComponent,
    CarAddedPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ 
      positionClass :"toast-bottom-right"})
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
