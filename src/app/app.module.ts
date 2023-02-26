import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputComponent } from './components/input/input.component';
import { RateWindowComponent } from './components/rate-window/rate-window.component';
import { RatedMoviesComponent } from './components/rated-movies/rated-movies.component';
import { ResultComponent } from './components/result/result.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BigNumberPipe } from './pipes/bigNumber.pipe';
import { HttpClientModule } from '@angular/common/http';
import { PlanMovieComponent } from './components/plan-movie/plan-movie.component';
import { CountriesPipe, PremieresPipe } from './pipes/countries.pipe';
import { RatingComponent } from './components/rating/rating.component';
import { GenresComponent } from './components/genres/genres.component';
import { MyMoviesComponent } from './components/my-movies/my-movies.component';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    RateWindowComponent,
    RatedMoviesComponent,
    ResultComponent,
    BigNumberPipe,
    PlanMovieComponent,
    CountriesPipe,
    PremieresPipe,
    RatingComponent,
    GenresComponent,
    MyMoviesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [RatingComponent, GenresComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
