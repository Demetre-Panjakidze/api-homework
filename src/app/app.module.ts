import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputComponent } from './components/input/input.component';
import { RateWindowComponent } from './components/rate-window/rate-window.component';
import { RatedMoviesComponent } from './components/rated-movies/rated-movies.component';
import { ResultComponent } from './components/result/result.component';
import { FormsModule } from '@angular/forms';
import { BigNumberPipe } from './pipes/bigNumber.pipe';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    RateWindowComponent,
    RatedMoviesComponent,
    ResultComponent,
    BigNumberPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
