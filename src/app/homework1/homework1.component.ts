import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './homework1.component.html',
  styleUrls: ['./homework1.component.scss'],
})
export class Homework1Component {
  movieID: number | string | undefined;
  message(info: any) {
    this.movieID = info;
  }
}
