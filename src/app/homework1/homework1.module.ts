import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Homework1Component } from './homework1.component';
import { Homework1RoutingModule } from './homework1-routing.module';
import { InputComponent } from './components/input/input.component';
import { ResultComponent } from './components/result/result.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieApiService } from './movie-api.service';
import { FormsModule } from '@angular/forms';
import { BigNumberPipe } from 'src/app/pipes/bigNumber.pipe';
import { RateWindowComponent } from './components/rate-window/rate-window.component';

@NgModule({
  declarations: [
    Homework1Component,
    InputComponent,
    ResultComponent,
    BigNumberPipe,
    RateWindowComponent,
  ],
  imports: [
    CommonModule,
    Homework1RoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [MovieApiService],
})
export class Homework1Module {}
