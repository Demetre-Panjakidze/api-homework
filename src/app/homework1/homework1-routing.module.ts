import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputComponent } from './components/input/input.component';
import { ResultComponent } from './components/result/result.component';
import { Homework1Component } from './homework1.component';

const routes: Routes = [
  {
    path: '',
    component: InputComponent,
  },
  {
    path: 'result',
    component: ResultComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Homework1RoutingModule {}
