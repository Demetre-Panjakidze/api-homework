import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputComponent } from './components/input/input.component';
import { PlanMovieComponent } from './components/plan-movie/plan-movie.component';
import { RatedMoviesComponent } from './components/rated-movies/rated-movies.component';
import { ResultComponent } from './components/result/result.component';

const routes: Routes = [
  {
    path: '',
    component: InputComponent,
  },
  {
    path: 'result',
    component: ResultComponent,
  },
  {
    path: 'votes',
    component: RatedMoviesComponent,
  },
  {
    path: 'movie plan',
    component: PlanMovieComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
